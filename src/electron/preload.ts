import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  saveCsv: (filename: string, rows: string[][]) =>
    ipcRenderer.invoke('save-csv', filename, rows),
});
