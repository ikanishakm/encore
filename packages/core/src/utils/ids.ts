import type {KeyframeId, SequenceTrackId} from '@encorejs/core/types/public'

export function asKeyframeId(s: string): KeyframeId {
  return s as KeyframeId
}

export function asSequenceTrackId(s: string): SequenceTrackId {
  return s as SequenceTrackId
}
