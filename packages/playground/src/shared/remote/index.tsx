import React from 'react'
import ReactDOM from 'react-dom/client'
import theatre from '@encorejs/core'
import {getProject} from '@encorejs/core'
import {Scene} from './Scene'
import RemoteController from './RemoteController'

const project = getProject('Sample project')
void theatre.init({studio: true})
RemoteController(project)

ReactDOM.createRoot(document.getElementById('root')!).render(<Scene />)
