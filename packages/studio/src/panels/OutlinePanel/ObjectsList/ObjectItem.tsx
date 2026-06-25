import type SheetObject from '@encorejs/core/sheetObjects/SheetObject'
import getStudio from '@encorejs/studio/getStudio'
import React from 'react'
import BaseItem from '@encorejs/studio/panels/OutlinePanel/BaseItem'
import {useVal} from '@encorejs/react'
import {outlineSelection} from '@encorejs/studio/selectors'
import useChordial from '@encorejs/studio/uiComponents/chordial/useChodrial'

export const ObjectItem: React.FC<{
  sheetObject: SheetObject
  depth: number
  overrideLabel?: string
}> = ({sheetObject, depth, overrideLabel}) => {
  const select = () => {
    getStudio()!.transaction(({stateEditors}) => {
      stateEditors.studio.historic.panels.outline.selection.set([
        {...sheetObject.address, type: 'SheetObject'},
      ])
    })
  }

  const selection = useVal(outlineSelection)

  const {targetRef} = useChordial(() => {
    return {
      title: `Object: ${sheetObject.address.objectKey}`,
      items: [],
    }
  })

  return (
    <BaseItem
      select={select}
      label={overrideLabel ?? sheetObject.address.objectKey}
      depth={depth}
      headerRef={targetRef}
      selectionStatus={
        selection.includes(sheetObject) ? 'selected' : 'not-selected'
      }
    />
  )
}
