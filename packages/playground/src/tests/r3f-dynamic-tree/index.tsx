import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theatre from '@encore/core'
import extension from '@encore/r3f/dist/extension'

void theatre.getStudio().then((studio) => studio.extend(extension))
void theatre.init({studio: true, usePersistentStorage: false})

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
