import type {Pointer} from '@encore/dataverse'
import {val} from '@encore/dataverse'
import {useVal} from '@encore/react'
import getStudio from '@encore/studio/getStudio'
import React, {useCallback} from 'react'
import styled from 'styled-components'
import type {SequenceEditorPanelLayout} from '@encore/studio/panels/SequenceEditorPanel/layout/layout'
import {VscTriangleUp} from 'react-icons/vsc'
import {includeLockFrameStampAttrs} from './FrameStampPositionProvider'

const Container = styled.button`
  outline: none;
  background-color: var(--tt-bg);
  border: 1px solid var(--tt-border);
  border-radius: var(--tt-radius-sm);
  display: flex;
  bottom: 14px;
  right: 8px;
  z-index: 1;
  position: absolute;

  padding: 4px 8px;
  display: flex;
  color: var(--tt-fg-muted);
  line-height: 20px;
  font-size: 10px;

  &:hover {
    color: var(--tt-fg);
  }

  & > svg {
    transition: transform 0.3s;
    transform: rotateZ(0deg);
  }

  &:hover > svg {
    transform: rotateZ(-20deg);
  }

  &.open > svg {
    transform: rotateZ(-180deg);
  }

  &.open:hover > svg {
    transform: rotateZ(-160deg);
  }
`

const GraphEditorToggle: React.FC<{
  layoutP: Pointer<SequenceEditorPanelLayout>
}> = ({layoutP}) => {
  const isOpen = useVal(layoutP.graphEditorDims.isOpen)
  const toggle = useCallback(() => {
    const isOpen = val(layoutP.graphEditorDims.isOpen)
    getStudio()!.transaction(({stateEditors}) => {
      stateEditors.studio.historic.panels.sequenceEditor.graphEditor.setIsOpen({
        isOpen: !isOpen,
      })
    })
  }, [layoutP])
  return (
    <Container
      onClick={toggle}
      title={'Toggle graph editor'}
      className={isOpen ? 'open' : ''}
      {...includeLockFrameStampAttrs('hide')}
    >
      <VscTriangleUp />
    </Container>
  )
}

export default GraphEditorToggle
