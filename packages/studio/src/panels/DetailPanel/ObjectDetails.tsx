import React from 'react'
import type SheetObject from '@encore/core/sheetObjects/SheetObject'
import type {Pointer} from '@encore/dataverse'
import type {$FixMe} from '@encore/core/types/public'
import DeterminePropEditorForDetail from './DeterminePropEditorForDetail'
import {useVal} from '@encore/react'
import uniqueKeyForAnyObject from '@encore/utils/uniqueKeyForAnyObject'
import styled from 'styled-components'

const ActionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border-radius: var(--tt-radius-sm);

  color: var(--tt-fg-2);
  background: var(--tt-hover);

  border: none;
  height: 28px;

  &:hover {
    background: var(--tt-active);
  }

  &:active {
    background: var(--tt-active);
  }
`

const ObjectDetails: React.FC<{
  /** TODO: add support for multiple objects (it would show their common props) */
  objects: [SheetObject]
}> = ({objects}) => {
  const obj = objects[0]
  const config = useVal(obj.template.configPointer)
  const actions = useVal(obj.template._temp_actionsPointer)

  return (
    <>
      <DeterminePropEditorForDetail
        // we don't use the object's address as the key because if a user calls `sheet.detachObject(key)` and later
        // calls `sheet.object(key)` with the same key, we want to re-render the object details panel.
        key={uniqueKeyForAnyObject(obj)}
        obj={obj}
        pointerToProp={obj.propsP as Pointer<$FixMe>}
        propConfig={config}
        visualIndentation={1}
      />
      <ActionButtonContainer>
        {actions &&
          Object.entries(actions).map(([actionName, action]) => {
            return (
              <ActionButton
                key={actionName}
                onClick={() => {
                  action(obj.publicApi)
                }}
              >
                {actionName}
              </ActionButton>
            )
          })}
      </ActionButtonContainer>
    </>
  )
}

export default ObjectDetails
