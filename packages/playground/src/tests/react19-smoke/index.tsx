import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theatre from '@encore/core'
// Side-effect import: registers the studio bundle on window so that
// `theatre.getStudio()` resolves and the editor UI mounts.
import '@encore/studio'
import extension from '@encore/r3f/dist/extension'

void theatre.getStudio().then((studio) => studio.extend(extension))
void theatre.init({studio: true})

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
