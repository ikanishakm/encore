import {nanoid as generateNonSecure} from 'nanoid/non-secure'
import type {SequenceMarkerId} from '@encorejs/core/types/public'

export function generateSequenceMarkerId(): SequenceMarkerId {
  return generateNonSecure(10) as SequenceMarkerId
}
