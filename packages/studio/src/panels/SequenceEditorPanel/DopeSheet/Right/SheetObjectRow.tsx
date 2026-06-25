import type {SequenceEditorPanelLayout} from '@encorejs/studio/panels/SequenceEditorPanel/layout/layout'
import type {SequenceEditorTree_SheetObject} from '@encorejs/studio/panels/SequenceEditorPanel/layout/tree'
import {usePrism} from '@encorejs/react'
import type {Pointer} from '@encorejs/dataverse'
import React from 'react'
import {decideRowByPropType} from './PropWithChildrenRow'
import RightRow from './Row'
import {collectAggregateKeyframesInPrism} from './collectAggregateKeyframes'
import AggregatedKeyframeTrack from './AggregatedKeyframeTrack/AggregatedKeyframeTrack'

const RightSheetObjectRow: React.FC<{
  leaf: SequenceEditorTree_SheetObject
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
        {leaf.children.map((leaf) => decideRowByPropType(leaf, layoutP))}
      </RightRow>
    )
  }, [leaf, layoutP])
}

export default RightSheetObjectRow
