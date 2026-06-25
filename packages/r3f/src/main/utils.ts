import {editorStore} from './store'
import type {ISheetObject} from '@encorejs/core'

export const refreshSnapshot = editorStore.getState().createSnapshot

export const makeStoreKey = (sheetObjectAddress: ISheetObject['address']) =>
  `${sheetObjectAddress.sheetId}:${sheetObjectAddress.sheetInstanceId}:${sheetObjectAddress.objectKey}`
