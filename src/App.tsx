import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 后续加页面，直接在这里写 Route 就行 */}
        </Routes>
      </Router>
  )
}

export default App