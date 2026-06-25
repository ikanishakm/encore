import noop from '@encorejs/utils/noop'
import type {ElementType} from 'react'
import React from 'react'
import styled from 'styled-components'

export const height = 30

const ItemContainer = styled.li<{enabled: boolean}>`
  height: ${height}px;
  padding: 0 12px;
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: 400;
  position: relative;
  color: ${(props) => (props.enabled ? 'var(--tt-fg)' : 'var(--tt-fg-muted)')};
  cursor: ${(props) => (props.enabled ? 'default' : 'not-allowed')};

  &:after {
    position: absolute;
    inset: 2px;
    display: block;
    content: ' ';
    pointer-events: none;
    z-index: -1;
    border-radius: var(--tt-radius-sm);
  }

  &:hover:after {
    background-color: ${(props) =>
      props.enabled ? 'var(--tt-hover)' : 'initial'};
  }
`

const ItemLabel = styled.span``

const Item: React.FC<{
  label: string | ElementType
  onClick: (e: React.MouseEvent) => void
  enabled: boolean
}> = (props) => {
  return (
    <ItemContainer
      onClick={props.enabled ? props.onClick : noop}
      enabled={props.enabled}
      title={props.enabled ? undefined : 'Disabled'}
    >
      <ItemLabel>
        <>{props.label}</>
      </ItemLabel>
    </ItemContainer>
  )
}

export default Item
