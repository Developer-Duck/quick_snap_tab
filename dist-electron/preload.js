import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("api", {
    loadWorkspaces: () => ipcRenderer.invoke("load-workspaces"),
    saveWorkspaces: (data) => ipcRenderer.invoke("save-workspaces", data),
});
