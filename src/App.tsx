import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom"
import Main from "./pages/main"

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
