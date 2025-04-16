import { app, BrowserWindow } from "electron";
import path from "path";
import { spawn, ChildProcess } from "child_process";
import fs from "fs";

let win: BrowserWindow | null = null;
let nextServer: ChildProcess | null = null;

const logFile = path.join(app.getPath("userData"), "next-server.log");
const logStream = fs.createWriteStream(logFile, { flags: "a" });

function getCwdForNextServer(): string {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "external");
  } else {
    return process.cwd();
  }
}

function getPreloadPath(): string {
  if (app.isPackaged) {
    return path.join(app.getAppPath(), ".electron", "preload.js");
  } else {
    return path.join(path.resolve(), "preload.js");
  }
}

async function startNextServer(isDev: boolean) {
  try {
    const script = isDev ? "dev:next" : "start:next";
    const cwd = getCwdForNextServer();
    const nodePath = path.join(process.resourcesPath, 'external', 'node');
    const npmPath = path.join(cwd, "node_modules", ".bin", "npm");

    nextServer = spawn(nodePath, [npmPath, "run", script], {
      cwd,
      shell: true,
      stdio: ["ignore", "pipe", "pipe"],
      env: {
        ...process.env,
        PATH: `${process.env.PATH}:${path.join(process.resourcesPath, 'external')}`
      },
    });

    nextServer.stdout?.on("data", (data) => {
      console.log(`Next.js stdout: ${data}`);
      logStream.write(data);
    });

    nextServer.stderr?.on("data", (data) => {
      console.error(`Next.js stderr: ${data}`);
      logStream.write(data);
    });

    nextServer.on("error", (err) => {
      console.error("Failed to start Next.js server:", err);
      logStream.write(`Error: ${err}\n`);
    });

    nextServer.on("exit", (code, signal) => {
      if (code !== 0) {
        console.error(
          `Next.js server exited with code ${code} and signal ${signal}`
        );
        logStream.write(`Exit code: ${code}, Signal: ${signal}\n`);
      } else {
        console.log("Next.js server exited successfully");
        logStream.write("Server exited successfully\n");
      }
      logStream.end();
    });
  } catch (err) {
    console.error("Error getting npm path:", err);
    logStream.write(`Error: ${err}\n`);
    logStream.end();
  }
}

async function createWindow() {
  try {
    win = new BrowserWindow({
      width: 1280,
      height: 800,
      webPreferences: {
        contextIsolation: false,
        preload: getPreloadPath(),
      },
    });

    win.loadURL("http://localhost:3000");

    win.on("closed", () => {
      win = null;
    });
  } catch (error) {
    console.error("Error during window creation:", error);
    logStream.write(`Error during window creation: ${error}\n`);
    logStream.end();
  }
}

function shutdownNextServer() {
  if (nextServer) {
    nextServer.kill();
    nextServer = null;
    console.log("Next.js server process terminated.");
  }
}

app.whenReady().then(() => {
  const isDev = process.argv.includes("dev");
  startNextServer(isDev);

  setTimeout(async () => {
    await createWindow();
  }, 3000);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    shutdownNextServer();
    app.quit();
  }
});

app.on("quit", () => {
  shutdownNextServer();
});
