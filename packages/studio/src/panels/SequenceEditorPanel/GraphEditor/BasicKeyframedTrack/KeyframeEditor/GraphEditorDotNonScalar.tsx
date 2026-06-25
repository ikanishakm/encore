import getStudio from '@encorejs/studio/getStudio'
import type {CommitOrDiscardOrRecapture} from '@encorejs/studio/StudioStore/StudioStore'
import useContextMenu from '@encorejs/studio/uiComponents/simpleContextMenu/useContextMenu'
import useDrag from '@encorejs/studio/uiComponents/useDrag'
import useRefAndState from '@encorejs/studio/utils/useRefAndState'
import {val} from '@encorejs/dataverse'
import React, {useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import type KeyframeEditor from './KeyframeEditor'
import type {BasicKeyframe} from '@encorejs/core/types/public'
import {useLockFrameStampPosition} from '@encorejs/studio/panels/SequenceEditorPanel/FrameStampPositionProvider'
import {includeLockFrameStampAttrs} from '@encorejs/studio/panels/SequenceEditorPanel/FrameStampPositionProvider'
import {pointerEventsAutoInNormalMode} from '@encorejs/studio/css'
import {
  lockedCursorCssVarName,
  useCssCursorLock,
} from '@encorejs/studio/uiComponents/PointerEventsHandler'
import DopeSnap from '@encorejs/studio/panels/SequenceEditorPanel/RightOverlay/DopeSnap'
import {useKeyframeInlineEditorPopover} from '@encorejs/studio/panels/SequenceEditorPanel/DopeSheet/Right/BasicKeyframedTrack/KeyframeEditor/useSingleKeyframeInlineEditorPopover'
import usePresence, {
  PresenceFlag,
} from '@encorejs/studio/uiComponents/usePresence'
import {__private} from '@encorejs/core'

const {keyframeUtils} = __private

export const dotSize = 6

const Circle = styled.circle`
  fill: var(--main-color);
  stroke-width: 1px;
  vector-effect: non-scaling-stroke;

  r: 2px;
`

const HitZone = styled.circle`
  stroke-width: 6px;
  vector-effect: non-scaling-stroke;
  r: 6px;
  fill: transparent;
  ${pointerEventsAutoInNormalMode};

  &:hover + ${Circle} {
    r: 6px;
  }

  #pointer-root.normal & {
    cursor: ew-resize;
  }

  #pointer-root.draggingPositionInSequenceEditor & {
    pointer-events: auto;
    cursor: var(${lockedCursorCssVarName});
  }

  &.beingDragged {
    pointer-events: none !important;
  }
`

type IProps = Parameters<typeof KeyframeEditor>[0] & {which: 'left' | 'right'}

const GraphEditorDotNonScalar: React.FC<IProps> = (props) => {
  const [ref, node] = useRefAndState<SVGCircleElement | null>(null)

  const {index, trackData, itemKey} = props
  const sortedKeyframes = keyframeUtils.getSortedKeyframesCached(
    trackData.keyframes,
  )
  const cur = sortedKeyframes[index]

  const [contextMenu] = useKeyframeContextMenu(node, props)

  const presence = usePresence(itemKey)

  const curValue = props.which === 'left' ? 0 : 1

  const inlineEditorPopover = useKeyframeInlineEditorPopover([
    {
      type: 'primitiveProp',
      keyframe: props.keyframe,
      pathToProp: props.pathToProp,
      propConfig: props.propConfig,
      sheetObject: props.sheetObject,
      trackId: props.trackId,
    },
  ])

  const isDragging = useDragKeyframe({
    node,
    props,
    // dragging does not work with also having a click listener
    onDetectedClick: (event) =>
      inlineEditorPopover.toggle(
        event,
        event.target instanceof Element ? event.target : node!,
      ),
  })

  const cyInExtremumSpace = props.extremumSpace.fromValueSpace(curValue)

  return (
    <>
      <HitZone
        ref={ref}
        style={{
          // @ts-ignore
          cx: `calc(var(--unitSpaceToScaledSpaceMultiplier) * ${cur.position} * 1px)`,
          cy: `calc((var(--graphEditorVerticalSpace) - var(--graphEditorVerticalSpace) * ${cyInExtremumSpace}) * 1px)`,
        }}
        {...presence.attrs}
        {...includeLockFrameStampAttrs(cur.position)}
        {...DopeSnap.includePositionSnapAttrs(cur.position)}
        className={isDragging ? 'beingDragged' : ''}
      />
      <Circle
        style={{
          // @ts-ignore
          cx: `calc(var(--unitSpaceToScaledSpaceMultiplier) * ${cur.position} * 1px)`,
          cy: `calc((var(--graphEditorVerticalSpace) - var(--graphEditorVerticalSpace) * ${cyInExtremumSpace}) * 1px)`,
          fill: presence.flag === PresenceFlag.Primary ? 'white' : undefined,
        }}
      />
      {inlineEditorPopover.node}
      {contextMenu}
    </>
  )
}

export default GraphEditorDotNonScalar

function useDragKeyframe(options: {
  node: SVGCircleElement | null
  props: IProps
  onDetectedClick: (event: MouseEvent) => void
}): boolean {
  const [isDragging, setIsDragging] = useState(false)
  useLockFrameStampPosition(isDragging, options.props.keyframe.position)
  const propsRef = useRef(options.props)
  propsRef.current = options.props

  const gestureHandlers = useMemo<Parameters<typeof useDrag>[1]>(() => {
    return {
      debugName: 'GraphEditorDotNonScalar/useDragKeyframe',
      lockCSSCursorTo: 'ew-resize',
      onDragStart(event) {
        setIsDragging(true)
        const propsAtStartOfDrag = propsRef.current

        const toUnitSpace = val(
          propsAtStartOfDrag.layoutP.scaledSpace.toUnitSpace,
        )

        const unlockExtremums = propsAtStartOfDrag.extremumSpace.lock()
        let tempTransaction: CommitOrDiscardOrRecapture | undefined

        return {
          onDrag(dx, dy) {
            const sortedKeyframes = keyframeUtils.getSortedKeyframesCached(
              propsAtStartOfDrag.trackData.keyframes,
            )
            const original = sortedKeyframes[propsAtStartOfDrag.index]

            const deltaPos = toUnitSpace(dx)

            const updatedKeyframes: BasicKeyframe[] = []

            const cur: BasicKeyframe = {
              ...original,
              position: original.position + deltaPos,
              value: original.value,
              handles: [...original.handles],
            }

            updatedKeyframes.push(cur)

            tempTransaction?.discard()
            tempTransaction = getStudio()!.tempTransaction(({stateEditors}) => {
              stateEditors.coreByProject.historic.sheetsById.sequence.replaceKeyframes(
                {
                  ...propsAtStartOfDrag.sheetObject.address,
                  trackId: propsAtStartOfDrag.trackId,
                  keyframes: updatedKeyframes,
                  snappingFunction: val(
                    propsAtStartOfDrag.layoutP.sheet,
                  ).getSequence().closestGridPosition,
                },
              )
            })
          },
          onDragEnd(dragHappened) {
            setIsDragging(false)
            unlockExtremums()
            if (dragHappened) {
              tempTransaction?.commit()
            } else {
              tempTransaction?.discard()
              options.onDetectedClick(event)
            }
          },
        }
      },
    }
  }, [])

  useDrag(options.node, gestureHandlers)
  useCssCursorLock(isDragging, 'draggingPositionInSequenceEditor', 'ew-resize')
  return isDragging
}

function useKeyframeContextMenu(node: SVGCircleElement | null, props: IProps) {
  return useContextMenu(node, {
    items: () => {
      return [
        {
          type: 'normal',
          label: 'Delete',
          callback: () => {
            getStudio()!.transaction(({stateEditors}) => {
              stateEditors.coreByProject.historic.sheetsById.sequence.deleteKeyframes(
                {
                  ...props.sheetObject.address,
                  keyframeIds: [props.keyframe.id],
                  trackId: props.trackId,
                },
              )
            })
          },
        },
      ]
    },
  })
}
