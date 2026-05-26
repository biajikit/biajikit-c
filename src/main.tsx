import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import '@/assets/css/globals.css'
import '@/assets/css/base.css'
import '@/assets/iconfont/iconfont.css'

// 自动获取代理前缀 /sandboxID/port
const getBasename = () => {
  const parts = window.location.pathname.split('/').filter(Boolean)
  if (parts.length >= 2) {
    return `/${parts[0]}/${parts[1]}`
  }
  return ''
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
