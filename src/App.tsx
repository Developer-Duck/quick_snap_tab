import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom"
import Main from "./pages/main"
import Home from "./pages/home"

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/test" element={<Main />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
