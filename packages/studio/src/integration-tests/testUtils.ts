/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
import '@encorejs/studio'
import type {SheetId} from '@encorejs/core'
import {getProject} from '@encorejs/core'
import {privateAPI} from '@encorejs/core/privateAPIs'
import type {ProjectState_Historic} from '@encorejs/core/types/private/core'
import type {SheetState_Historic} from '@encorejs/core/types/private/core'
import * as t from '@encorejs/core/propTypes'
import getStudio from '@encorejs/studio/getStudio'
import {getCoreTicker} from '@encorejs/core/coreTicker'
import {globals} from '@encorejs/core/globals'
import theatre from '@encorejs/core'

const defaultProps = {
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  color: t.rgba(),
  deeply: {
    nested: {
      checkbox: true,
    },
  },
}

let lastProjectN = 0

const studio = getStudio()!
void theatre.init({studio: true, usePersistentStorage: false})

export async function setupTestSheet(sheetState: SheetState_Historic) {
  const projectState: ProjectState_Historic = {
    definitionVersion: globals.currentProjectStateDefinitionVersion,
    sheetsById: {
      ['Sheet' as SheetId]: sheetState,
    },
    revisionHistory: [],
  }
  const project = getProject('Test Project ' + lastProjectN++, {
    state: projectState,
  })

  const ticker = getCoreTicker()

  ticker.tick()
  await project.ready
  const sheetPublicAPI = project.sheet('Sheet')
  const objPublicAPI = sheetPublicAPI.object('obj', defaultProps)

  const obj = privateAPI(objPublicAPI)

  return {
    obj,
    objPublicAPI,
    sheet: privateAPI(sheetPublicAPI),
    project,
    ticker,
    studio,
  }
}
