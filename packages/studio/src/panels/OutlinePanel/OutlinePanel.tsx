import React, {useEffect, useLayoutEffect} from 'react'
import styled from 'styled-components'
import {panelZIndexes} from '@encore/studio/panels/BasePanel/common'
import ProjectsList from './ProjectsList/ProjectsList'
import {useVal} from '@encore/react'
import getStudio from '@encore/studio/getStudio'
import useHotspot from '@encore/studio/uiComponents/useHotspot'
import {Atom, prism, val} from '@encore/dataverse'
import {pointerEventsAutoInNormalMode} from '@encore/studio/css'

const headerHeight = `44px`

/**
 * A solid, docked left sidebar (à la Figma/Framer) rather than a stack of
 * floating translucent pills. Because the panel is opaque, the per-row
 * hover/selected overlays layer over a solid surface and stay readable.
 */
const Container = styled.div<{pin: boolean}>`
  ${pointerEventsAutoInNormalMode};
  position: absolute;
  left: 0;
  top: 58px;
  bottom: 8px;
  width: 230px;
  z-index: ${panelZIndexes.outlinePanel};

  background: var(--tt-panel);
  border-right: 1px solid var(--tt-border);
  border-top-right-radius: var(--tt-radius);
  border-bottom-right-radius: var(--tt-radius);
  box-shadow: 6px 0 24px -14px rgba(0, 0, 0, 0.45);

  overflow-y: auto;
  overflow-x: hidden;
  padding: 6px 0;
  user-select: none;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--tt-border-strong);
    border-radius: 4px;
  }
  scrollbar-width: thin;
  scrollbar-color: var(--tt-border-strong) transparent;

  display: ${({pin}) => (pin ? 'block' : 'none')};

  &:hover {
    display: block;
  }

  // Create a small buffer on the bottom to aid selecting the bottom item in a long, scrolling list
  &::after {
    content: '';
    display: block;
    height: 12px;
  }
`

const OutlinePanel: React.FC<{}> = () => {
  const pin = useVal(getStudio().atomP.ahistoric.pinOutline) ?? true
  const show = useVal(shouldShowOutlineD)
  const active = useHotspot('left')

  useLayoutEffect(() => {
    isOutlinePanelHotspotActiveB.set(active)
  }, [active])

  // cleanup
  useEffect(() => {
    return () => {
      isOutlinePanelHoveredB.set(false)
      isOutlinePanelHotspotActiveB.set(false)
    }
  }, [])

  return (
    <Container
      pin={pin || show}
      onMouseEnter={() => {
        isOutlinePanelHoveredB.set(true)
      }}
      onMouseLeave={() => {
        isOutlinePanelHoveredB.set(false)
      }}
    >
      <ProjectsList />
    </Container>
  )
}

export default OutlinePanel

const isOutlinePanelHotspotActiveB = new Atom<boolean>(false)
const isOutlinePanelHoveredB = new Atom<boolean>(false)

export const shouldShowOutlineD = prism<boolean>(() => {
  const isHovered = val(isOutlinePanelHoveredB.prism)
  const isHotspotActive = val(isOutlinePanelHotspotActiveB.prism)

  return isHovered || isHotspotActive
})
