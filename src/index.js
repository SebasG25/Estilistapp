import React from 'react'
import ReactDOM from 'react-dom'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { App } from './App'

ReactDOM.render(
  <React.StrictMode>
    <div style={{background: 'url("https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")', height: '100vh'}}>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)
