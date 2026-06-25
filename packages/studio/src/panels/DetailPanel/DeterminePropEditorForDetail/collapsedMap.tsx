import type {Atom, Pointer} from '@encorejs/dataverse'

export const collapsedMap = new WeakMap<Pointer<{}>, Atom<boolean>>()
