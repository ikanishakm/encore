import type {$IntentionalAny} from '@encorejs/core/types/public'
import {pointerEventsAutoInNormalMode} from '@encorejs/studio/css'
import React from 'react'
import styled from 'styled-components'
import PopoverArrow from './PopoverArrow'

export const popoverBackgroundColor = `var(--tt-elevated)`

const Container = styled.div`
  position: absolute;
  --popover-bg: ${popoverBackgroundColor};
  --popover-inner-stroke: var(--tt-border);
  --popover-outer-stroke: var(--tt-border);

  border-radius: var(--tt-radius);
  box-shadow: var(--tt-shadow);
  backdrop-filter: blur(8px) saturate(300%) contrast(65%) brightness(55%);
  /* background-color: rgb(45 46 66 / 50%); */
  border: 1px solid var(--popover-outer-stroke);

  background: var(--popover-bg);
  /* border: 1px solid var(--popover-inner-stroke); */

  color: var(--tt-fg);
  padding: 1px 2px 1px 10px;
  margin: 0;
  cursor: default;
  ${pointerEventsAutoInNormalMode};
  z-index: 10000;

  & a {
    color: inherit;
  }
`

const BasicPopover: React.FC<{
  className?: string
  showPopoverEdgeTriangle?: boolean
  children: React.ReactNode
  ref?: React.Ref<HTMLDivElement>
}> = React.forwardRef(
  (
    {
      children,
      className,
      showPopoverEdgeTriangle: showPopoverEdgeTriangle = false,
    },
    ref,
  ) => {
    return (
      <Container className={className} ref={ref as $IntentionalAny}>
        {showPopoverEdgeTriangle ? <PopoverArrow /> : undefined}
        {children}
      </Container>
    )
  },
)

export default BasicPopover
