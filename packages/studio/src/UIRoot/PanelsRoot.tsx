import OutlinePanel from '@encore/studio/panels/OutlinePanel/OutlinePanel'
import DetailPanel from '@encore/studio/panels/DetailPanel/DetailPanel'
import React from 'react'
import getStudio from '@encore/studio/getStudio'
import {useVal} from '@encore/react'
import ExtensionPaneWrapper from '@encore/studio/panels/BasePanel/ExtensionPaneWrapper'
import SequenceEditorPanel from '@encore/studio/panels/SequenceEditorPanel/SequenceEditorPanel'

const PanelsRoot: React.FC = () => {
  const panes = useVal(getStudio().paneManager.allPanesD)
  const paneEls = Object.entries(panes).map(([instanceId, paneInstance]) => {
    return (
      <ExtensionPaneWrapper
        key={`pane-${instanceId}`}
        paneInstance={paneInstance!}
      />
    )
  })

  return (
    <>
      {paneEls}
      <OutlinePanel />
      <DetailPanel />
      <SequenceEditorPanel />
    </>
  )
}

export default PanelsRoot
