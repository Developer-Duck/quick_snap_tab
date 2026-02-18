import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"

import Main from "./pages/main"
import Home from "./pages/home"

export type Workspace = {
  id: string;
  title: string;
  description?: string;
  windows: any[];
  createdAt: number;
  synced: boolean;
};

// Electron 환경 여부 확인 헬퍼
const isElectron = () => typeof window !== "undefined" && typeof window.api !== "undefined";

function App() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  // 앱 시작 시 불러오기
  useEffect(() => {
    async function load() {
      if (isElectron()) {
        // Electron: IPC를 통해 파일에서 로드
        const saved = await window.api.loadWorkspaces();
        if (saved && saved.length > 0) {
          setWorkspaces(saved);
        }
      } else {
        // 브라우저 fallback: localStorage에서 로드
        const saved = localStorage.getItem("workspaces");
        if (saved) {
          setWorkspaces(JSON.parse(saved));
        }
      }
    }

    load();
  }, []);

  // workspaces 변경될 때마다 저장 (초기 빈 배열 저장 방지)
  useEffect(() => {
    if (workspaces.length === 0) return;

    if (isElectron()) {
      window.api.saveWorkspaces(workspaces);
    } else {
      localStorage.setItem("workspaces", JSON.stringify(workspaces));
    }
  }, [workspaces]);

  return (
    <HashRouter>
      <div className="App">
        <Routes>

          {/* 홈 */}
          <Route
            path="/"
            element={
              <Home
                workspaces={workspaces}
                setWorkspaces={setWorkspaces}
              />
            }
          />

          {/* 워크스페이스 내부 */}
          <Route
            path="/workspace/:id"
            element={
              <Main
                workspaces={workspaces}
                setWorkspaces={setWorkspaces}
              />
            }
          />

        </Routes>
      </div>
    </HashRouter>
  )
}

export default App