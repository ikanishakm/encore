import type {TrackData} from '@encore/core/types/private/core'
import type SheetObject from '@encore/core/sheetObjects/SheetObject'
import type {SequenceEditorPanelLayout} from '@encore/studio/panels/SequenceEditorPanel/layout/layout'
import type {BasicKeyframe, SequenceTrackId} from '@encore/core/types/public'
import type {Pointer} from '@encore/dataverse'
import React from 'react'
import styled from 'styled-components'
import type {ExtremumSpace} from '@encore/studio/panels/SequenceEditorPanel/GraphEditor/BasicKeyframedTrack/BasicKeyframedTrack'
import Curve from './Curve'
import CurveHandle from './CurveHandle'
import GraphEditorDotScalar from './GraphEditorDotScalar'
import GraphEditorDotNonScalar from './GraphEditorDotNonScalar'
import GraphEditorNonScalarDash from './GraphEditorNonScalarDash'
import type {PropTypeConfig_AllSimples} from '@encore/core/types/public'
import type {PathToProp} from '@encore/utils/pathToProp'
import type {
  GraphEditorColors,
  StudioSheetItemKey,
} from '@encore/core/types/private'
import {__private} from '@encore/core'

const {keyframeUtils} = __private

const Container = styled.g`
  /* position: absolute; */
`

const noConnector = <></>

type IKeyframeEditorProps = {
  index: number
  keyframe: BasicKeyframe
  trackData: TrackData
  itemKey: StudioSheetItemKey
  layoutP: Pointer<SequenceEditorPanelLayout>
  trackId: SequenceTrackId
  sheetObject: SheetObject
  pathToProp: PathToProp
  extremumSpace: ExtremumSpace
  isScalar: boolean
  color: keyof GraphEditorColors
  propConfig: PropTypeConfig_AllSimples
}

const KeyframeEditor: React.FC<IKeyframeEditorProps> = (props) => {
  const {index, trackData, isScalar} = props
  const sortedKeyframes = keyframeUtils.getSortedKeyframesCached(
    trackData.keyframes,
  )
  const cur = sortedKeyframes[index]
  const next = sortedKeyframes[index + 1]

  const connected = cur.connectedRight && !!next
  const shouldShowCurve = connected && next.value !== cur.value

  return (
    <Container>
      {shouldShowCurve ? (
        <>
          <Curve {...props} />
          {!cur.type ||
            (cur.type === 'bezier' && (
              <>
                <CurveHandle {...props} which="left" />
                <CurveHandle {...props} which="right" />
              </>
            ))}
        </>
      ) : (
        noConnector
      )}
      {isScalar ? (
        <GraphEditorDotScalar {...props} />
      ) : (
        <>
          <GraphEditorDotNonScalar {...props} which="left" />
          <GraphEditorDotNonScalar {...props} which="right" />
          <GraphEditorNonScalarDash {...props} />
        </>
      )}
    </Container>
  )
}

export default KeyframeEditor
