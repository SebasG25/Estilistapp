import React from 'react'
import ReactDOM from 'react-dom'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { App } from './App'

ReactDOM.render(
  <React.StrictMode>
    <div className='app__background'>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)
