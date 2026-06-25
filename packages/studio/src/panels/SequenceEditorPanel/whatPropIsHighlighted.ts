import type {Prism} from '@encorejs/dataverse'
import {val} from '@encorejs/dataverse'
import {Atom} from '@encorejs/dataverse'
import {prism} from '@encorejs/dataverse'
import type {
  PropAddress,
  WithoutSheetInstance,
} from '@encorejs/core/types/public'

import pointerDeep from '@encorejs/utils/pointerDeep'
import type {$IntentionalAny, VoidFn} from '@encorejs/core/types/public'
import lodashSet from 'lodash-es/set'

/** constant global manager */
export const whatPropIsHighlighted = createWhatPropIsHighlightedState()

export type PropHighlighted = 'self' | 'descendent' | null

/** Only used in prop highlighting with boolean. */
type PathToPropAsDeepObject<T extends boolean | number | string> = {
  [key in string]: T | PathToPropAsDeepObject<T>
}

function createWhatPropIsHighlightedState() {
  let lastLockId = 0
  const whatIsHighlighted = new Atom<
    | {hasLock: false; deepPath?: undefined}
    | {
        hasLock: true
        lockId: number
        cleanup: () => void
        deepPath: PathToPropAsDeepObject<boolean>
      }
  >({hasLock: false})

  return {
    replaceLock(address: WithoutSheetInstance<PropAddress>, cleanup: VoidFn) {
      const lockId = lastLockId++

      const existingState = whatIsHighlighted.get()
      if (existingState.hasLock) existingState.cleanup()

      whatIsHighlighted.set({
        hasLock: true,
        lockId,
        cleanup,
        deepPath: arrayToDeepObject(addressToArray(address)),
      })

      return function unlock() {
        const curr = whatIsHighlighted.get()
        if (curr.hasLock && curr.lockId === lockId) {
          curr.cleanup()
          whatIsHighlighted.set({hasLock: false})
        }
      }
    },
    getIsPropHighlightedD(
      address: WithoutSheetInstance<PropAddress>,
    ): Prism<PropHighlighted> {
      const highlightedP = pointerDeep(
        whatIsHighlighted.pointer.deepPath,
        addressToArray(address),
      )
      return prism(() => {
        const value = val(highlightedP)
        return value === true
          ? 'self'
          : // obj continues deep path prop from here
            value
            ? 'descendent'
            : // some other prop or no lock
              null
      })
    },
  }
}

function addressToArray(
  address: WithoutSheetInstance<PropAddress>,
): Array<string | number> {
  return [
    address.projectId,
    address.sheetId,
    address.objectKey,
    ...address.pathToProp,
  ]
}

function arrayToDeepObject(
  arr: Array<string | number>,
): PathToPropAsDeepObject<boolean> {
  const obj = {}
  lodashSet(obj, arr, true)
  return obj as $IntentionalAny
}
