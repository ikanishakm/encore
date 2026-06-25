import type {SequenceEditorPanelLayout} from '@encorejs/studio/panels/SequenceEditorPanel/layout/layout'
import {zIndexes} from '@encorejs/studio/panels/SequenceEditorPanel/SequenceEditorPanel'
import {usePrism} from '@encorejs/react'
import type {Pointer} from '@encorejs/dataverse'
import {val} from '@encorejs/dataverse'
import React from 'react'
import styled from 'styled-components'
import LengthIndicator from '@encorejs/studio/panels/SequenceEditorPanel/DopeSheet/Right/LengthIndicator/LengthIndicator'
import FrameStamp from './FrameStamp'
import HorizontalScrollbar from './HorizontalScrollbar'
import Playhead from './Playhead'
import TopStrip from './TopStrip'
import FocusRangeCurtains from '@encorejs/studio/panels/SequenceEditorPanel/DopeSheet/Right/FocusRangeCurtains'
import Markers from './Markers/Markers'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: ${() => zIndexes.rightOverlay};
  overflow: visible;
  pointer-events: none;
`

const RightOverlay: React.FC<{
  layoutP: Pointer<SequenceEditorPanelLayout>
}> = ({layoutP}) => {
  return usePrism(() => {
    const width = val(layoutP.rightDims.width)

    return (
      <Container style={{width: width + 'px'}}>
        <Playhead layoutP={layoutP} />
        <HorizontalScrollbar layoutP={layoutP} />
        <FrameStamp layoutP={layoutP} />
        <TopStrip layoutP={layoutP} />
        <Markers layoutP={layoutP} />
        <LengthIndicator layoutP={layoutP} />
        <FocusRangeCurtains layoutP={layoutP} />
      </Container>
    )
  }, [layoutP])
}

export default RightOverlay
