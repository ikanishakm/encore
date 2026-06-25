import type {SequenceEditorPanelLayout} from '@encore/studio/panels/SequenceEditorPanel/layout/layout'
import type {SequenceEditorTree_PrimitiveProp} from '@encore/studio/panels/SequenceEditorPanel/layout/tree'
import getStudio from '@encore/studio/getStudio'
import {usePrism} from '@encore/react'
import type {Pointer} from '@encore/dataverse'
import {val} from '@encore/dataverse'
import React from 'react'
import RightRow from './Row'
import BasicKeyframedTrack from './BasicKeyframedTrack/BasicKeyframedTrack'
import {useLogger} from '@encore/studio/uiComponents/useLogger'

const PrimitivePropRow: React.FC<{
  leaf: SequenceEditorTree_PrimitiveProp
  layoutP: Pointer<SequenceEditorPanelLayout>
}> = ({leaf, layoutP}) => {
  const logger = useLogger('PrimitivePropRow', leaf.pathToProp.join())
  return usePrism(() => {
    const {sheetObject} = leaf
    const {trackId} = leaf

    const trackData = val(
      getStudio()!.atomP.historic.coreByProject[sheetObject.address.projectId]
        .sheetsById[sheetObject.address.sheetId].sequence.tracksByObject[
        sheetObject.address.objectKey
      ].trackData[trackId],
    )

    if (trackData?.type !== 'BasicKeyframedTrack') {
      logger.errorDev(
        `trackData type ${trackData?.type} is not yet supported on the sequence editor`,
      )
      return (
        <RightRow leaf={leaf} isCollapsed={false} node={<div />}></RightRow>
      )
    } else {
      const node = (
        <BasicKeyframedTrack
          layoutP={layoutP}
          trackData={trackData}
          leaf={leaf}
        />
      )

      return <RightRow leaf={leaf} isCollapsed={false} node={node}></RightRow>
    }
  }, [leaf, layoutP])
}

export default PrimitivePropRow
