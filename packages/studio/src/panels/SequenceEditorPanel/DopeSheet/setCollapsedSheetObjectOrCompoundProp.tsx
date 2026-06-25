import getStudio from '@encorejs/studio/getStudio'
import type {
  SheetAddress,
  WithoutSheetInstance,
} from '@encorejs/core/types/public'
import type {StudioSheetItemKey} from '@encorejs/core/types/private'

export function setCollapsedSheetItem(
  isCollapsed: boolean,
  toCollapse: {
    sheetAddress: WithoutSheetInstance<SheetAddress>
    sheetItemKey: StudioSheetItemKey
  },
) {
  getStudio().transaction(({stateEditors}) => {
    stateEditors.studio.ahistoric.projects.stateByProjectId.stateBySheetId.sequence.sequenceEditorCollapsableItems.set(
      {
        ...toCollapse.sheetAddress,
        studioSheetItemKey: toCollapse.sheetItemKey,
        isCollapsed,
      },
    )
  })
}
