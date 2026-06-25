import type {PropTypeConfig_Boolean} from '@encorejs/core/types/public'
import React, {useCallback} from 'react'
import styled from 'styled-components'
import BasicCheckbox from '@encorejs/studio/uiComponents/form/BasicCheckbox'
import type {ISimplePropEditorReactProps} from './ISimplePropEditorReactProps'

const Input = styled(BasicCheckbox)`
  margin-left: 6px;

  :focus {
    outline: 1px solid var(--tt-ring);
  }
`

function BooleanPropEditor({
  propConfig,
  editingTools,
  value,
  autoFocus,
}: ISimplePropEditorReactProps<PropTypeConfig_Boolean>) {
  const onChange = useCallback(
    (el: React.ChangeEvent<HTMLInputElement>) => {
      editingTools.permanentlySetValue(Boolean(el.target.checked))
    },
    [propConfig, editingTools],
  )

  return <Input checked={value} onChange={onChange} autoFocus={autoFocus} />
}

export default BooleanPropEditor
