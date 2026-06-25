import React from 'react'
import ReactDOM from 'react-dom/client'
import theatre from '@encore/core'
import {getProject} from '@encore/core'
import {Scene} from './Scene'
/**
 * This is a basic example of using Encore for manipulating the DOM.
 */

void theatre.init({studio: true})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Scene project={getProject('Sample project')} />,
)
