import theatre from '@encore/core'
import {getProject} from '@encore/core'

void theatre.init({studio: true, usePersistentStorage: false})

const project = getProject('sample project')
const sheet = project.sheet('sample sheet')
const obj = sheet.object('sample object', {
  position: {
    x: 0,
    y: 0,
  },
})
