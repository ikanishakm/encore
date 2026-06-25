import type {
  IBasePropType,
  PropTypeConfig_AllSimples,
} from '@encorejs/core/types/public'
import React, {useMemo} from 'react'
import {useEditingToolsForSimplePropInDetailsPanel} from '@encorejs/studio/propEditors/useEditingToolsForSimpleProp'
import {SingleRowPropEditor} from '@encorejs/studio/panels/DetailPanel/DeterminePropEditorForDetail/SingleRowPropEditor'
import type {Pointer} from '@encorejs/dataverse'
import {getPointerParts} from '@encorejs/dataverse'
import type SheetObject from '@encorejs/core/sheetObjects/SheetObject'
import type {ISimplePropEditorReactProps} from '@encorejs/studio/propEditors/simpleEditors/ISimplePropEditorReactProps'
import {whatPropIsHighlighted} from '@encorejs/studio/panels/SequenceEditorPanel/whatPropIsHighlighted'

export type IDetailSimplePropEditorProps<
  TPropTypeConfig extends IBasePropType<string, any>,
> = {
  propConfig: TPropTypeConfig
  pointerToProp: Pointer<TPropTypeConfig['valueType']>
  obj: SheetObject
  visualIndentation: number
  SimpleEditorComponent: React.FC<ISimplePropEditorReactProps<TPropTypeConfig>>
}

/**
 * Shown in the Object details panel, changes to this editor are usually reflected at either
 * the playhead position (the `sequence.position`) or if static, the static override value.
 */
function DetailSimplePropEditor<
  TPropTypeConfig extends PropTypeConfig_AllSimples,
>({
  propConfig,
  pointerToProp,
  obj,
  SimpleEditorComponent: EditorComponent,
}: IDetailSimplePropEditorProps<TPropTypeConfig>) {
  const editingTools = useEditingToolsForSimplePropInDetailsPanel(
    pointerToProp,
    obj,
    propConfig,
  )

  const isPropHighlightedD = useMemo(
    () =>
      whatPropIsHighlighted.getIsPropHighlightedD({
        ...obj.address,
        pathToProp: getPointerParts(pointerToProp).path,
      }),
    [pointerToProp],
  )

  return (
    <SingleRowPropEditor
      {...{
        editingTools: editingTools,
        propConfig,
        pointerToProp,
        isPropHighlightedD,
      }}
    >
      <EditorComponent
        editingTools={editingTools}
        propConfig={propConfig}
        value={editingTools.value}
      />
    </SingleRowPropEditor>
  )
}

export default React.memo(DetailSimplePropEditor)
