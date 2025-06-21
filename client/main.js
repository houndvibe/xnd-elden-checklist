import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win = null;

function createWindow() {
  win = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, "dist", "index.html"));
}

app.whenReady().then(() => {
  createWindow();

  // Регистрация клавиши ESC для переключения fullscreen/оконный
  globalShortcut.register("Escape", () => {
    if (win?.isFullScreen()) {
      win.setFullScreen(false);
    } else {
      win?.setFullScreen(true);
    }
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
