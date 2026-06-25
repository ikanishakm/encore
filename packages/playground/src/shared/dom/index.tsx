import React from 'react'
import ReactDOM from 'react-dom/client'
import theatre from '@encorejs/core'
import {getProject} from '@encorejs/core'
import {Scene} from './Scene'

/**
 * This is a basic example of using Encore for manipulating the DOM.
 *
 * It also uses {@link IStudio.selection | studio.selection} to customize
 * the selection behavior.
 */

void theatre.init({studio: true})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Scene
    project={getProject('Sample project', {
      // experiments: {
      //   logging: {
      //     internal: true,
      //     dev: true,
      //     min: TheatreLoggerLevel.TRACE,
      //   },
      // },
    })}
  />,
)
