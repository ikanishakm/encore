import type {Pointer} from '@encorejs/dataverse'
import React, {useLayoutEffect, useMemo, useRef} from 'react'
import styled from 'styled-components'
import type {SequenceEditorPanelLayout} from '@encorejs/studio/panels/SequenceEditorPanel/layout/layout'
import {useVal} from '@encorejs/react'
import getStudio from '@encorejs/studio/getStudio'
import type {BasicNumberInputNudgeFn} from '@encorejs/studio/uiComponents/form/BasicNumberInput'
import type {CommitOrDiscardOrRecapture} from '@encorejs/studio/StudioStore/StudioStore'
import {propNameTextCSS} from '@encorejs/studio/propEditors/utils/propNameTextCSS'
import type {StudioHistoricStateSequenceEditorMarker} from '@encorejs/core/types/private'
import BasicStringInput from '@encorejs/studio/uiComponents/form/BasicStringInput'

const Container = styled.div`
  display: flex;
  gap: 8px;
  height: 28px;
  align-items: center;
`

const Label = styled.div`
  ${propNameTextCSS};
  white-space: nowrap;
`

const nudge: BasicNumberInputNudgeFn = ({deltaX}) => deltaX * 0.25

const MarkerEditorPopover: React.FC<{
  layoutP: Pointer<SequenceEditorPanelLayout>
  marker: StudioHistoricStateSequenceEditorMarker
  /**
   * Called when user hits enter/escape
   */
  onRequestClose: (reason: string) => void
}> = ({layoutP, marker}) => {
  const sheet = useVal(layoutP.sheet)

  const fns = useMemo(() => {
    let tempTransaction: CommitOrDiscardOrRecapture | undefined

    return {
      temporarilySetValue(newLabel: string): void {
        if (tempTransaction) {
          tempTransaction.discard()
          tempTransaction = undefined
        }
        tempTransaction = getStudio()!.tempTransaction(({stateEditors}) => {
          stateEditors.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateMarker(
            {
              sheetAddress: sheet.address,
              markerId: marker.id,
              label: newLabel,
            },
          )
        })
      },
      discardTemporaryValue(): void {
        if (tempTransaction) {
          tempTransaction.discard()
          tempTransaction = undefined
        }
      },
      permanentlySetValue(newLabel: string): void {
        if (tempTransaction) {
          tempTransaction.discard()
          tempTransaction = undefined
        }
        getStudio()!.transaction(({stateEditors}) => {
          stateEditors.studio.historic.projects.stateByProjectId.stateBySheetId.sequenceEditor.updateMarker(
            {
              sheetAddress: sheet.address,
              markerId: marker.id,
              label: newLabel,
            },
          )
        })
      },
    }
  }, [layoutP, sheet])

  const inputRef = useRef<HTMLInputElement>(null)
  useLayoutEffect(() => {
    inputRef.current!.focus()
  }, [])

  return (
    <Container>
      <Label>Marker</Label>
      <BasicStringInput
        value={marker.label ?? ''}
        {...fns}
        isValid={() => true}
        inputRef={inputRef}
      />
    </Container>
  )
}

export default MarkerEditorPopover
