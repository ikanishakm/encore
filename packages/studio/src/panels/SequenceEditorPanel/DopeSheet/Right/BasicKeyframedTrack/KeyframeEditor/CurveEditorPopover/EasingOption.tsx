import useTooltip from '@encorejs/studio/uiComponents/Popover/useTooltip'
import React from 'react'
import styled, {css} from 'styled-components'
import {handlesFromCssCubicBezierArgs} from './shared'
import SVGCurveSegment from './SVGCurveSegment'
import {mergeRefs} from 'react-merge-refs'
import {COLOR_BASE} from './colors'
import BasicPopover from '@encorejs/studio/uiComponents/Popover/BasicPopover'

const Wrapper = styled.div<{isSelected: boolean}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  aspect-ratio: 1;

  transition: background-color 0.15s;
  background-color: ${COLOR_BASE};
  border-radius: var(--tt-radius-sm);
  cursor: pointer;
  outline: none;

  ${({isSelected}) =>
    isSelected &&
    css`
      background-color: var(--tt-elevated);
    `}

  &:hover {
    background-color: var(--tt-panel-2);
  }

  &:focus {
    background-color: var(--tt-elevated);
  }
`

const EasingTooltip = styled(BasicPopover)`
  padding: 0.5em;
  color: var(--tt-fg);
  max-width: 240px;
  pointer-events: none !important;
  --popover-bg: var(--tt-elevated);
  --popover-outer-stroke: transparent;
  --popover-inner-stroke: transparent;
  box-shadow: none;
`

type IProps = {
  easing: {
    label: string
    value: string
  }
  tooltipPlacement: 'top' | 'bottom'
  isSelected: boolean
} & Parameters<typeof Wrapper>[0]

const EasingOption: React.FC<IProps> = React.forwardRef((props, ref) => {
  const [tooltip, tooltipHostRef] = useTooltip(
    {enabled: true, verticalPlacement: props.tooltipPlacement, verticalGap: 0},
    () => (
      <EasingTooltip showPopoverEdgeTriangle={false}>
        {props.easing.label}
      </EasingTooltip>
    ),
  )

  return (
    <Wrapper ref={mergeRefs([tooltipHostRef, ref])} {...props}>
      {tooltip}
      <SVGCurveSegment
        easing={handlesFromCssCubicBezierArgs(props.easing.value)}
        isSelected={props.isSelected}
      />
      {/* In the past we used `dangerouslySetInnerHTML={{ _html: fuzzySort.highlight(presetSearchResults[index])}}` 
          to display the name of the easing option, including an underline for the parts of it matching the search
          query. */}
    </Wrapper>
  )
})

export default EasingOption
