import type {$FixMe, VoidFn} from '@encorejs/core/types/public'
import React from 'react'
import styled, {css} from 'styled-components'
import noop from '@encorejs/utils/noop'
import {pointerEventsAutoInNormalMode} from '@encorejs/studio/css'
import {ChevronDown, Package} from '@encorejs/studio/uiComponents/icons'

export const Container = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
`

export const BaseHeader = styled.div``

const Header = styled(BaseHeader)`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  /* Full-width rows (Figma/Framer style); indent the contents by depth so the
     hover/selected highlight always spans the whole row. */
  padding-left: calc(10px + var(--depth) * 14px);
  padding-right: 8px;
  gap: 6px;
  height: 26px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  pointer-events: none;
  white-space: nowrap;

  color: var(--tt-fg-2);
  background: transparent;
  transition:
    background 0.12s ease,
    color 0.12s ease;

  &.descendant-is-selected {
    color: var(--tt-fg);
    background: var(--tt-hover);
  }

  ${pointerEventsAutoInNormalMode};
  &:not(.not-selectable):not(.selected):hover {
    background: var(--tt-hover);
    color: var(--tt-fg);
  }

  &:not(.not-selectable):not(.selected):active {
    background: var(--tt-active);
    color: var(--tt-fg);
  }

  &.selected {
    background: var(--tt-selected);
    color: var(--tt-fg);
    box-shadow: inset 2px 0 0 var(--tt-primary);
  }
`

export const outlineItemFont = css`
  font-weight: 500;
  font-size: 11px;
  & {
  }
`

const Head_Label = styled.span`
  ${outlineItemFont};

  ${pointerEventsAutoInNormalMode};
  position: relative;
  // Compensate for border bottom
  top: 0.5px;
  display: flex;
  height: 20px;
  align-items: center;
  box-sizing: border-box;
`

const Head_IconContainer = styled.div`
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  opacity: 0.99;
`

const Head_Icon_WithDescendants = styled.span`
  font-size: 9px;
  position: relative;
  display: block;
  transition: transform 0.1s ease-out;

  &:hover {
    transform: rotate(-20deg);
  }

  ${Container}.collapsed & {
    transform: rotate(-90deg);

    &:hover {
      transform: rotate(-70deg);
    }
  }
`

const ChildrenContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  ${Container}.collapsed & {
    display: none;
  }
`

type SelectionStatus =
  | 'not-selectable'
  | 'not-selected'
  | 'selected'
  | 'descendant-is-selected'

const BaseItem: React.FC<{
  label: React.ReactNode
  select?: VoidFn
  depth: number
  selectionStatus: SelectionStatus
  labelDecoration?: React.ReactNode
  children?: React.ReactNode | undefined
  collapsed?: boolean
  setIsCollapsed?: (v: boolean) => void
  headerRef?: React.MutableRefObject<$FixMe>
}> = ({
  label,
  children,
  depth,
  select,
  selectionStatus,
  labelDecoration,
  collapsed = false,
  setIsCollapsed,
  headerRef,
}) => {
  const canContainChildren = children !== undefined

  return (
    <Container
      style={
        /* @ts-ignore */
        {'--depth': depth}
      }
      className={collapsed ? 'collapsed' : ''}
    >
      <Header
        className={selectionStatus}
        onClick={select ?? noop}
        data-header
        ref={headerRef}
      >
        <Head_IconContainer>
          {canContainChildren ? (
            <Head_Icon_WithDescendants
              onClick={(evt) => {
                evt.stopPropagation()
                evt.preventDefault()
                setIsCollapsed?.(!collapsed)
              }}
            >
              <ChevronDown />
            </Head_Icon_WithDescendants>
          ) : (
            <Package />
          )}
        </Head_IconContainer>

        <Head_Label>
          <span>{label}</span>
        </Head_Label>
        {labelDecoration}
      </Header>
      {canContainChildren && <ChildrenContainer>{children}</ChildrenContainer>}
    </Container>
  )
}

export default BaseItem
