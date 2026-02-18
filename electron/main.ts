// npx tsc -p tsconfig.electron.json

import { app, BrowserWindow, Menu, screen, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";

// ES Module 환경에서 __dirname 정의
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(app.getPath("userData"), "workspaces.json");

function ensureFile() {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([]));
  }
}

function readWorkspaces() {
  ensureFile();
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

function writeWorkspaces(data: any) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}


function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // ✅ Windows 호환: new URL().pathname 대신 path.join 사용
  const preloadPath = path.join(__dirname, 'preload.js');

  const win = new BrowserWindow({
    width,
    height,
    frame: true,
    fullscreenable: true,
    resizable: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true,
      preload: preloadPath,
    }
  });

  win.setBounds({ x: 0, y: 0, width, height });
  Menu.setApplicationMenu(null);
  win.loadURL('http://localhost:3000');
  win.webContents.openDevTools();

  ipcMain.on('window-close', () => win.close());
  ipcMain.on('window-minimize', () => win.minimize());

  win.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11') {
      win.setFullScreen(!win.isFullScreen());
      event.preventDefault();
    }
    if (input.key === 'Escape' && win.isFullScreen()) {
      win.setFullScreen(false);
      event.preventDefault();
    }
  });
}

ipcMain.handle("load-workspaces", () => {
  return readWorkspaces();
});
ipcMain.handle("save-workspaces", (_event, data: unknown) => {
  writeWorkspaces(data);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});