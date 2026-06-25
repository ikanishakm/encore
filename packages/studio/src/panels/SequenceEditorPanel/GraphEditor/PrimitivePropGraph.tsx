import type SheetObject from '@encorejs/core/sheetObjects/SheetObject'
import getStudio from '@encorejs/studio/getStudio'
import type {PathToProp} from '@encorejs/utils/pathToProp'
import type {SequenceTrackId} from '@encorejs/core/types/public'
import {usePrism} from '@encorejs/react'
import type {Pointer} from '@encorejs/dataverse'
import {val} from '@encorejs/dataverse'
import React from 'react'
import type {SequenceEditorPanelLayout} from '@encorejs/studio/panels/SequenceEditorPanel/layout/layout'
import BasicKeyframedTrack from './BasicKeyframedTrack/BasicKeyframedTrack'
import type {GraphEditorColors} from '@encorejs/core/types/private'

const PrimitivePropGraph: React.FC<{
  layoutP: Pointer<SequenceEditorPanelLayout>
  sheetObject: SheetObject
  pathToProp: PathToProp
  trackId: SequenceTrackId
  color: keyof GraphEditorColors
}> = (props) => {
  return usePrism(() => {
    const {sheetObject, trackId} = props
    const trackData = val(
      getStudio()!.atomP.historic.coreByProject[sheetObject.address.projectId]
        .sheetsById[sheetObject.address.sheetId].sequence.tracksByObject[
        sheetObject.address.objectKey
      ].trackData[trackId],
    )

    if (trackData?.type !== 'BasicKeyframedTrack') {
      console.error(
        `trackData type ${trackData?.type} is not yet supported on the graph editor`,
      )
      return <></>
    } else {
      return <BasicKeyframedTrack {...props} trackData={trackData} />
    }
  }, [props.trackId, props.layoutP])
}

export default PrimitivePropGraph
