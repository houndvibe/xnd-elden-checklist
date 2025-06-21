import { app, BrowserWindow, globalShortcut, ipcMain, shell } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win = null;
let zoomFactor = 1.0;

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  win.loadFile(path.join(__dirname, "dist", "index.html"));
  win.maximize();

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith("file://")) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register("Escape", () => {
    if (win?.isFullScreen()) {
      win.setFullScreen(false);
    } else {
      win?.setFullScreen(true);
    }
  });

  ipcMain.on("zoom-change", (_, direction) => {
    if (direction === 0) {
      zoomFactor = 1.0;
    } else {
      const step = 0.1;
      zoomFactor += direction * step;
      zoomFactor = Math.min(3, Math.max(0.3, zoomFactor));
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
