import React from 'react'
import ReactDOM from 'react-dom/client'
import theatre from '@encorejs/core'
import {getProject} from '@encorejs/core'
import ThreeScene from './ThreeScene'

void theatre.init({studio: true})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThreeScene project={getProject('Three Basic')} />,
)
