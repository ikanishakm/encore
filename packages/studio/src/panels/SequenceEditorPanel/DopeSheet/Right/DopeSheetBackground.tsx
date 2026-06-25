import type {SequenceEditorPanelLayout} from '@encorejs/studio/panels/SequenceEditorPanel/layout/layout'
import {zIndexes} from '@encorejs/studio/panels/SequenceEditorPanel/SequenceEditorPanel'
import {useVal} from '@encorejs/react'
import type {Pointer} from '@encorejs/dataverse'
import React from 'react'
import styled from 'styled-components'
import FrameGrid from '@encorejs/studio/panels/SequenceEditorPanel/FrameGrid/FrameGrid'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: ${() => zIndexes.rightBackground};
  overflow: hidden;
  background: var(--tt-bg);
  pointer-events: none;
`

const DopeSheetBackground: React.FC<{
  layoutP: Pointer<SequenceEditorPanelLayout>
}> = ({layoutP}) => {
  const width = useVal(layoutP.rightDims.width)
  const height = useVal(layoutP.panelDims.height)

  return (
    <Container style={{width: width + 'px'}}>
      <FrameGrid width={width} height={height} layoutP={layoutP} />
    </Container>
  )
}

export default DopeSheetBackground
