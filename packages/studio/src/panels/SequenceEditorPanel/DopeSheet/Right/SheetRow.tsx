import type {SequenceEditorPanelLayout} from '@encorejs/studio/panels/SequenceEditorPanel/layout/layout'
import type {SequenceEditorTree_Sheet} from '@encorejs/studio/panels/SequenceEditorPanel/layout/tree'
import {usePrism} from '@encorejs/react'
import type {Pointer} from '@encorejs/dataverse'
import React from 'react'
import RightSheetObjectRow from './SheetObjectRow'
import RightRow from './Row'
import {collectAggregateKeyframesInPrism} from './collectAggregateKeyframes'
import AggregatedKeyframeTrack from './AggregatedKeyframeTrack/AggregatedKeyframeTrack'

const SheetRow: React.FC<{
  leaf: SequenceEditorTree_Sheet
  layoutP: Pointer<SequenceEditorPanelLayout>
}> = ({leaf, layoutP}) => {
  return usePrism(() => {
    const aggregatedKeyframes = collectAggregateKeyframesInPrism(leaf)

    const node = (
      <AggregatedKeyframeTrack
        layoutP={layoutP}
        aggregatedKeyframes={aggregatedKeyframes}
        viewModel={leaf}
      />
    )

    return (
      <RightRow leaf={leaf} node={node} isCollapsed={leaf.isCollapsed}>
        {leaf.children.map((sheetObjectLeaf) => (
          <RightSheetObjectRow
            layoutP={layoutP}
            key={'sheetObject-' + sheetObjectLeaf.sheetObject.address.objectKey}
            leaf={sheetObjectLeaf}
          />
        ))}
      </RightRow>
    )
  }, [leaf, layoutP])
}

export default SheetRow
