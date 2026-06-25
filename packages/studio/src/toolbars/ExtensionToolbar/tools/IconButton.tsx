import React from 'react'
import ToolbarIconButton from '@encorejs/studio/uiComponents/toolbar/ToolbarIconButton'
import styled from 'styled-components'
import {pointerEventsAutoInNormalMode} from '@encorejs/studio/css'
import type {ToolConfigIcon} from '@encorejs/core/types/public'

const Container = styled(ToolbarIconButton)`
  ${pointerEventsAutoInNormalMode};
  & > svg {
    width: 1em;
    height: 1em;
    pointer-events: none;
  }
`

const IconButton: React.FC<{
  config: ToolConfigIcon
  testId?: string
}> = ({config, testId}) => {
  return (
    <Container
      onClick={config.onClick}
      data-testid={testId}
      title={config.title}
      dangerouslySetInnerHTML={{__html: config['svgSource'] ?? ''}}
    />
  )
}

export default IconButton
