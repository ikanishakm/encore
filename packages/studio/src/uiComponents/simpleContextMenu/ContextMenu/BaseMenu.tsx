import type {ElementType} from 'react'
import React from 'react'
import Item from './Item'
import type {$FixMe} from '@encorejs/core/types/public'
import styled from 'styled-components'
import {pointerEventsAutoInNormalMode} from '@encorejs/studio/css'

const minWidth = 190

const SHOW_OPTIONAL_MENU_TITLE = true

const MenuContainer = styled.ul`
  position: absolute;
  min-width: ${minWidth}px;
  z-index: 10000;
  background: var(--tt-elevated);
  backdrop-filter: blur(8px) brightness(70%);
  color: var(--tt-fg);
  border: 1px solid var(--tt-border);
  box-sizing: border-box;
  box-shadow: var(--tt-shadow);
  list-style-type: none;
  padding: 0;
  margin: 0;
  cursor: default;
  ${pointerEventsAutoInNormalMode};
  border-radius: var(--tt-radius);
`

const MenuTitle = styled.div`
  padding: 8px 10px 6px;
  position: relative;

  color: var(--tt-fg-2);
  font-size: 10px;
  font-weight: 500;

  /* &:after {
    // a horizontal line, taking up no space, with 4px padding on each side
    content: '';
    display: block;
    height: 1px;
    background: #6262622c;
    position: absolute;
    left: 4px;
    right: 4px;
    bottom: 0px;
  } */
`

type MenuItem =
  | {
      type?: 'normal'
      label: string | ElementType
      callback?: (e: React.MouseEvent) => void
      enabled?: boolean
      // subs?: Item[]
    }
  | {type: 'separator'}

const BaseMenu: React.FC<{
  items: MenuItem[]
  ref?: $FixMe
  displayName?: React.ReactNode
  onRequestClose: () => void
}> = React.forwardRef((props, ref: $FixMe) => {
  return (
    <MenuContainer ref={ref}>
      {SHOW_OPTIONAL_MENU_TITLE && props.displayName ? (
        <MenuTitle>{props.displayName}</MenuTitle>
      ) : null}
      {props.items.map((item, i) =>
        item.type === 'separator' ? (
          <Separator key={`item-${i}`} />
        ) : (
          <Item
            key={`item-${i}`}
            label={item.label}
            enabled={item.enabled === false ? false : true}
            onClick={(e) => {
              if (item.callback) {
                item.callback(e)
              }
              props.onRequestClose()
            }}
          />
        ),
      )}
    </MenuContainer>
  )
})

const Separator = styled.div`
  height: 1px;
  margin: 2px 8px;
  background: var(--tt-border);
`

export default BaseMenu
