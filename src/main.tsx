import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import '@/assets/css/globals.css'
import '@/assets/css/base.css'
import '@/assets/iconfont/iconfont.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)