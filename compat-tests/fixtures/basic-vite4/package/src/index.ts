import {getProject} from '@encore/core'

const project = getProject('Sample project')
const sheet = project.sheet('Scene')

if (import.meta.env.MODE === 'development') {
  const {default: studio} = await import('@encore/studio')
  studio.initialize()
}
