import type {Atom, Pointer} from '@encore/dataverse'

export const collapsedMap = new WeakMap<Pointer<{}>, Atom<boolean>>()
