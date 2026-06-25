import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theatre from '@encorejs/core'
// Side-effect import: registers the studio bundle on window so that
// `theatre.getStudio()` resolves and the editor UI mounts.
import '@encorejs/studio'
import extension from '@encorejs/r3f/dist/extension'

void theatre.getStudio().then((studio) => studio.extend(extension))
void theatre.init({studio: true})

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
