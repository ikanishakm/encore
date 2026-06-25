import type {TrackData} from '@encore/core/types/private/core'
import type SheetObject from '@encore/core/sheetObjects/SheetObject'
import {createStudioSheetItemKey} from '@encore/studio/utils/createStudioSheetItemKey'
import type {
  KeyframeWithTrack,
  TrackWithId,
} from '@encore/studio/panels/SequenceEditorPanel/DopeSheet/Right/collectAggregateKeyframes'
import {__private} from '@encore/core'

const {keyframeUtils} = __private

const cache = new WeakMap<
  TrackData,
  [seqPosition: number, nearbyKeyframes: NearbyKeyframes]
>()

const noKeyframes: NearbyKeyframes = {}

export function getNearbyKeyframesOfTrack(
  obj: SheetObject,
  track: TrackWithId | undefined,
  sequencePosition: number,
): NearbyKeyframes {
  if (
    !track ||
    keyframeUtils.getSortedKeyframesCached(track.data.keyframes).length === 0
  )
    return noKeyframes

  const cachedItem = cache.get(track.data)
  if (cachedItem && cachedItem[0] === sequencePosition) {
    return cachedItem[1]
  }

  const sorted = keyframeUtils.getSortedKeyframesCached(track.data.keyframes)

  function getKeyframeWithTrackId(idx: number): KeyframeWithTrack | undefined {
    if (!track) return
    const found = sorted[idx]
    return (
      found && {
        kf: found,
        track,
        itemKey: createStudioSheetItemKey.forTrackKeyframe(
          obj,
          track.id,
          found.id,
        ),
      }
    )
  }

  const calculate = (): NearbyKeyframes => {
    const nextOrCurIdx = sorted.findIndex(
      (kf) => kf.position >= sequencePosition,
    )

    if (nextOrCurIdx === -1) {
      return {
        prev: getKeyframeWithTrackId(sorted.length - 1),
      }
    }

    const nextOrCur = getKeyframeWithTrackId(nextOrCurIdx)!
    if (nextOrCur.kf.position === sequencePosition) {
      return {
        prev: getKeyframeWithTrackId(nextOrCurIdx - 1),
        cur: nextOrCur,
        next: getKeyframeWithTrackId(nextOrCurIdx + 1),
      }
    } else {
      return {
        next: nextOrCur,
        prev: getKeyframeWithTrackId(nextOrCurIdx - 1),
      }
    }
  }

  const result = calculate()
  cache.set(track.data, [sequencePosition, result])

  return result
}

export type NearbyKeyframes = {
  prev?: KeyframeWithTrack
  cur?: KeyframeWithTrack
  next?: KeyframeWithTrack
}
