import React from 'react'
import ReactDOM from 'react-dom'
import studio from '@encore/studio'
import {getProject} from '@encore/core'
import {Scene} from './App/Scene'

studio.initialize()

ReactDOM.render(
  <Scene project={getProject('Sample project')} />,
  document.getElementById('root')!,
)
