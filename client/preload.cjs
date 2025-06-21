
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  zoom: (direction) => ipcRenderer.send("zoom-change", direction),
});