import styled from 'styled-components'
import {pointerEventsAutoInNormalMode} from '@encore/studio/css'
import React from 'react'
import type {$IntentionalAny} from '@encore/core/types/public'

const Container = styled.div`
  position: absolute;

  color: var(--tt-fg);
  padding: 0;
  margin: 0;
  cursor: default;
  ${pointerEventsAutoInNormalMode};

  color: var(--tt-fg);
  box-sizing: border-box;

  border-radius: var(--tt-radius);
  box-shadow: var(--tt-shadow);
  backdrop-filter: blur(8px) saturate(300%) contrast(65%) brightness(55%);
  background-color: var(--tt-elevated);
  border: 1px solid var(--tt-border);
  z-index: 10000;
  padding: 8px 8px;
  font-size: 10px;

  z-index: 10000;

  & a {
    color: inherit;
  }

  max-width: 240px;
  padding: 8px;
  pointer-events: none !important;
`

const BasicTooltip = React.forwardRef(
  (
    {
      children,
      className,
    }: {
      className?: string
      showPopoverEdgeTriangle?: boolean
      children: React.ReactNode
    },
    ref,
  ) => {
    return (
      <Container className={className} ref={ref as $IntentionalAny}>
        {children}
      </Container>
    )
  },
)

export default BasicTooltip
