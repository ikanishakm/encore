import type {SequenceEditorTree_SheetObject} from '@encorejs/studio/panels/SequenceEditorPanel/layout/tree'
import React from 'react'
import AnyCompositeRow from './AnyCompositeRow'
import {decideRowByPropType} from './PropWithChildrenRow'
import {setCollapsedSheetItem} from '@encorejs/studio/panels/SequenceEditorPanel/DopeSheet/setCollapsedSheetObjectOrCompoundProp'
import getStudio from '@encorejs/studio/getStudio'

const LeftSheetObjectRow: React.FC<{
  leaf: SequenceEditorTree_SheetObject
}> = ({leaf}) => {
  return (
    <AnyCompositeRow
      leaf={leaf}
      label={leaf.sheetObject.address.objectKey}
      isCollapsed={leaf.isCollapsed}
      toggleSelect={() => {
        // set selection to this sheet object on click
        getStudio().transaction(({stateEditors}) => {
          stateEditors.studio.historic.panels.outline.selection.set([
            {type: 'SheetObject', ...leaf.sheetObject.address},
          ])
        })
      }}
      toggleCollapsed={() =>
        setCollapsedSheetItem(!leaf.isCollapsed, {
          sheetAddress: leaf.sheetObject.address,
          sheetItemKey: leaf.sheetItemKey,
        })
      }
    >
      {leaf.children.map((leaf) => decideRowByPropType(leaf))}
    </AnyCompositeRow>
  )
}

export default LeftSheetObjectRow
