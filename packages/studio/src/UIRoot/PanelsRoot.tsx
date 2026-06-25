import OutlinePanel from '@encorejs/studio/panels/OutlinePanel/OutlinePanel'
import DetailPanel from '@encorejs/studio/panels/DetailPanel/DetailPanel'
import React from 'react'
import getStudio from '@encorejs/studio/getStudio'
import {useVal} from '@encorejs/react'
import ExtensionPaneWrapper from '@encorejs/studio/panels/BasePanel/ExtensionPaneWrapper'
import SequenceEditorPanel from '@encorejs/studio/panels/SequenceEditorPanel/SequenceEditorPanel'

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
