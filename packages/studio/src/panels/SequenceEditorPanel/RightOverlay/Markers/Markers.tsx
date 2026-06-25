import type {Pointer} from '@encorejs/dataverse'
import {useVal} from '@encorejs/react'
import getStudio from '@encorejs/studio/getStudio'
import React from 'react'
import type {SequenceEditorPanelLayout} from '@encorejs/studio/panels/SequenceEditorPanel/layout/layout'
import MarkerDot from './MarkerDot'

const Markers: React.FC<{layoutP: Pointer<SequenceEditorPanelLayout>}> = ({
  layoutP,
}) => {
  const sheetAddress = useVal(layoutP.sheet.address)
  const markerSetP =
    getStudio().atomP.historic.projects.stateByProjectId[sheetAddress.projectId]
      .stateBySheetId[sheetAddress.sheetId].sequenceEditor.markerSet
  const markerAllIds = useVal(markerSetP.allIds)

  return (
    <>
      {markerAllIds &&
        Object.keys(markerAllIds).map((markerId) => (
          <MarkerDot key={markerId} layoutP={layoutP} markerId={markerId} />
        ))}
    </>
  )
}

export default Markers
