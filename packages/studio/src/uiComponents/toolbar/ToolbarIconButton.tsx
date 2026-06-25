import styled from 'styled-components'
import {pointerEventsAutoInNormalMode} from '@encorejs/studio/css'
import React from 'react'
import type {$FixMe, $IntentionalAny} from '@encorejs/core/types/public'
import {mergeRefs} from 'react-merge-refs'
import ToolbarSwitchSelectContainer from './ToolbarSwitchSelectContainer'
import useChordial from '@encorejs/studio/uiComponents/chordial/useChodrial'

export const Container = styled.button`
  ${pointerEventsAutoInNormalMode};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  width: 32px;
  height: 32px;
  outline: none;

  color: var(--tt-fg-2);

  background: var(--tt-elevated);
  backdrop-filter: blur(14px);
  border: none;
  border-bottom: 1px solid var(--tt-border);
  border-radius: var(--tt-radius-sm);

  svg {
    display: block;
  }

  &:hover {
    background: var(--tt-panel-2);
  }

  &:active {
    background: var(--tt-active);
  }

  &.selected {
    color: var(--tt-fg);
    border-bottom: 1px solid var(--tt-border-strong);
  }

  // Don't blur if in a button group, because it already blurs. We need to blur
  // on the group-level, otherwise we get seams.
  ${ToolbarSwitchSelectContainer} > & {
    backdrop-filter: none;
    filter: none;
    border-radius: 0;

    &:first-child {
      border-top-left-radius: var(--tt-radius-sm);
      border-bottom-left-radius: var(--tt-radius-sm);
    }

    &:last-child {
      border-bottom-right-radius: var(--tt-radius-sm);
      border-top-right-radius: var(--tt-radius-sm);
    }
  }

  @supports not (backdrop-filter: blur()) {
    background: var(--tt-elevated);
  }
`

const ToolbarIconButton: typeof Container = React.forwardRef(
  ({title, ...props}: $FixMe, ref: $FixMe) => {
    const c = useChordial(() => {
      return {
        title,
        items: [],
      }
    })

    return (
      <>
        <Container ref={mergeRefs([c.targetRef, ref])} {...props} />{' '}
      </>
    )
  },
) as $IntentionalAny

export default ToolbarIconButton
