import type {IBasePropType} from '@encorejs/core/types/public'
import type {IEditingTools} from '@encorejs/studio/propEditors/utils/IEditingTools'

/** Helper for defining consistent prop editor components */
export type ISimplePropEditorReactProps<
  TPropTypeConfig extends IBasePropType<string, any>,
> = {
  propConfig: TPropTypeConfig
  editingTools: IEditingTools<TPropTypeConfig['valueType']>
  value: TPropTypeConfig['valueType']
  autoFocus?: boolean
}
