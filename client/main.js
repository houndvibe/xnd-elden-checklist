import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win = null;
let zoomFactor = 1.0; // начальный zoom

function createWindow() {
  win = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "dist", "index.html"));
  /*   win.webContents.openDevTools(); */
}

app.whenReady().then(() => {
  createWindow();

  // ESC: toggle fullscreen
  globalShortcut.register("Escape", () => {
    if (win?.isFullScreen()) {
      win.setFullScreen(false);
    } else {
      win?.setFullScreen(true);
    }
  });

  // Обработка зума от renderer-процесса
  ipcMain.on("zoom-change", (_, direction) => {
    if (direction === 0) {
      zoomFactor = 1.0;
    } else {
      const step = 0.1;
      zoomFactor += direction * step;
      zoomFactor = Math.min(3, Math.max(0.3, zoomFactor)); // ограничение от 30% до 300%
    }
    win?.webContents.setZoomFactor(zoomFactor);
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
