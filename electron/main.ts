import { app, BrowserWindow } from 'electron'
import path from 'path'

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true
    }
  })

  win.loadURL('http://localhost:3000')
}

app.whenReady().then(createWindow)
