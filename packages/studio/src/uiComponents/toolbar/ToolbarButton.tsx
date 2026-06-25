import styled from 'styled-components'
import {pointerEventsAutoInNormalMode} from '@encorejs/studio/css'
import React from 'react'

export const Container = styled.button<{disabled?: boolean; primary?: boolean}>`
  ${pointerEventsAutoInNormalMode};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  height: 32px;
  outline: none;
  padding: 0 8px;

  color: ${({disabled, primary}) =>
    disabled === true
      ? 'var(--tt-fg-muted)'
      : primary === true
        ? 'var(--tt-primary-fg)'
        : 'var(--tt-fg-2)'};

  background: ${({disabled, primary}) =>
    disabled === true
      ? 'var(--tt-elevated)'
      : primary === true
        ? 'var(--tt-primary)'
        : 'var(--tt-elevated)'};

  backdrop-filter: blur(14px);
  border: none;
  border-bottom: 1px solid var(--tt-border);
  border-radius: var(--tt-radius-sm);
  box-shadow: var(--tt-shadow);

  svg {
    display: block;
  }

  &:hover {
    background: ${({disabled, primary}) =>
      disabled === true
        ? 'var(--tt-elevated)'
        : primary === true
          ? 'var(--tt-primary-hover)'
          : 'var(--tt-panel-2)'};
  }

  &:active {
    background: var(--tt-active);
  }
`

const ToolbarButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Container>
>((props, ref) => {
  return <Container ref={ref} {...props} />
})

export default ToolbarButton
