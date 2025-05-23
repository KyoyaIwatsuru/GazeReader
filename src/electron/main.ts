import { app, BrowserWindow, ipcMain, screen } from "electron";
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
    return path.join(process.cwd(), ".electron", "preload.js");
  }
}

async function startNextServer(isDev: boolean) {
  try {
    const script = isDev ? "dev:next" : "start:next";
    const cwd = getCwdForNextServer();
    const baseEnv = { ...process.env };
    let execPath: string;
    let args: string[];
    let env: NodeJS.ProcessEnv;

    if (app.isPackaged) {
      execPath = path.join(process.resourcesPath, "external", "node");
      const bundledNpm = path.join(cwd, "node_modules", ".bin", "npm");
      args = [bundledNpm, "run", script];
      env = {
        ...baseEnv,
        PATH: `${baseEnv.PATH}:${path.join(process.resourcesPath, "external")}`,
      };
    } else {
      execPath = "npm";
      args = ["run", script];
      env = baseEnv;
    }

    nextServer = spawn(execPath, args, {
      cwd,
      shell: !!app.isPackaged,
      stdio: ["ignore", "pipe", "pipe"],
      env,
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
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    win = new BrowserWindow({
      width,
      height,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: getPreloadPath(),
      },
      kiosk: true,
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

ipcMain.handle('save-csv', async (_, filename: string, rows: string[][]) => {
  try {
    const filePath = path.join(app.getPath('documents'), filename);

    const csvText = rows.map(r => r.map(v => `"${v.replace(/"/g,'""')}"`).join(',')).join('\n') + '\n';

    if (!fs.existsSync(filePath)) {
      await fs.promises.writeFile(filePath, csvText, 'utf8');
    } else {
      await fs.promises.appendFile(filePath, csvText, 'utf8');
    }

    return { success: true, filePath };
  } catch (err) {
    console.error('CSV save error:', err);
    return { success: false, error: (err as Error).message };
  }
});
