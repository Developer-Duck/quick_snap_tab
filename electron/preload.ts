import { contextBridge, ipcRenderer } from "electron";

type Workspace = {
  id: string;
  name: string;
};

contextBridge.exposeInMainWorld("api", {
  loadWorkspaces: (): Promise<Workspace[]> =>
    ipcRenderer.invoke("load-workspaces"),

  saveWorkspaces: (data: Workspace[]): Promise<void> =>
    ipcRenderer.invoke("save-workspaces", data),
});
