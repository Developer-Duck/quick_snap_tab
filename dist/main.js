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
function writeWorkspaces(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}
function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
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
            preload: new URL('./preload.js', import.meta.url).pathname
        }
    });
    // 창 초기 위치 및 크기
    win.setBounds({ x: 0, y: 0, width, height });
    Menu.setApplicationMenu(null);
    win.loadURL('http://localhost:3000');
    // IPC 예제
    ipcMain.on('window-close', () => win.close());
    ipcMain.on('window-minimize', () => win.minimize());
    // F11 전체 화면 토글 + ESC 빠져나오기
    win.webContents.on('before-input-event', (event, input) => {
        // F11 눌렀을 때
        if (input.key === 'F11') {
            win.setFullScreen(!win.isFullScreen());
            event.preventDefault();
        }
        // ESC 눌렀을 때 전체 화면이면 빠져나오기
        if (input.key === 'Escape' && win.isFullScreen()) {
            win.setFullScreen(false);
            event.preventDefault();
        }
    });
}
ipcMain.handle("load-workspaces", () => {
    return readWorkspaces();
});
ipcMain.handle("save-workspaces", (_event, data) => {
    writeWorkspaces(data);
});
// 앱 준비되면 창 생성
app.whenReady().then(createWindow);
// 모든 창 닫으면 종료 (macOS 제외)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});
// macOS에서 앱 아이콘 클릭 시 창 재생성
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
        createWindow();
});
