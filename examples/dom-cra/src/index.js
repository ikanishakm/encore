import {createRoot} from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import studio from '@encore/studio'
import {getProject} from '@encore/core'
import React from 'react'
import App from './App'

studio.initialize()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App project={getProject('CRA project')} />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
