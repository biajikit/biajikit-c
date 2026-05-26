import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

// 自动获取代理前缀 /sandboxID/port
const getBasename = () => {
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (parts.length >= 2) {
    return `/${parts[0]}/${parts[1]}`;
  }
  return "";
};

function App() {
  return (
    <Router basename={getBasename()}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 后续加页面，直接在这里写 Route 就行 */}
      </Routes>
    </Router>
  )
}

export default App
