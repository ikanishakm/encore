import type {Atom, Pointer} from '@encorejs/dataverse'
import {prism, val} from '@encorejs/dataverse'
import debounce from 'lodash-es/debounce'

const lastStateByStore = new WeakMap<Atom<{}>, {}>()

export type AtomPersistor = {
  refresh: () => void
  flush: () => void
  dispose: () => void
}

export const persistAtom = (
  atom: Atom<{}>,
  pointer: Pointer<{}>,
  onInitialize: () => void,
  storageKey: string,
): AtomPersistor => {
  const loadState = (s: {}) => {
    atom.setByPointer(pointer, s)
  }

  const getState = () => atom.getByPointer(pointer)

  loadFromPersistentStorage()

  const persist = () => {
    const newState = getState()
    const lastState = lastStateByStore.get(atom)
    if (newState === lastState) return
    lastStateByStore.set(atom, newState)
    localStorage.setItem(storageKey, JSON.stringify(newState))
  }
  const p = prism(() => val(pointer))

  const schedulePersist = debounce(persist, 1000)

  const unsubFromStale = p.onStale(() => {
    p.getValue()
    schedulePersist()
  })

  const onBeforeUnload = () => schedulePersist.flush()
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', onBeforeUnload)
  }

  return {
    refresh: () => {
      schedulePersist.flush()
      loadFromPersistentStorage()
    },
    flush: () => {
      schedulePersist.flush()
    },
    dispose: () => {
      schedulePersist.flush()
      schedulePersist.cancel()
      unsubFromStale()
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', onBeforeUnload)
      }
    },
  }

  function loadFromPersistentStorage() {
    const persistedS = localStorage.getItem(storageKey)
    if (persistedS) {
      let persistedObj
      let errored = true
      try {
        persistedObj = JSON.parse(persistedS)
        errored = false
      } catch (e) {
        console.warn(
          `Could not parse the Atom's persisted state. This must be a bug. Please report it.`,
          e,
        )
      } finally {
        if (!errored) {
          loadState(persistedObj)
        }
        onInitialize()
      }
    } else {
      onInitialize()
    }
  }
}
