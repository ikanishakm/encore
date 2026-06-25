import getStudio from '@encorejs/studio/getStudio'
import {usePrism, useVal} from '@encorejs/react'
import {val} from '@encorejs/dataverse'
import React, {useEffect} from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import PanelsRoot from './PanelsRoot'
import GlobalToolbar from '@encorejs/studio/toolbars/GlobalToolbar/GlobalToolbar'
import useRefAndState from '@encorejs/studio/utils/useRefAndState'
import {PortalContext} from 'reakit'
import type {$IntentionalAny} from '@encorejs/core/types/public'
import useKeyboardShortcuts from './useKeyboardShortcuts'
import PointerEventsHandler from '@encorejs/studio/uiComponents/PointerEventsHandler'
import {MountAll} from '@encorejs/studio/utils/renderInPortalInContext'
import {PortalLayer, ProvideStyles} from '@encorejs/studio/css'
import {
  createTheatreInternalLogger,
  TheatreLoggerLevel,
} from '@encorejs/utils/logger'
import {ProvideLogger} from '@encorejs/studio/uiComponents/useLogger'
import {Notifier} from '@encorejs/studio/notify'
import {useChordialCaptureEvents} from '@encorejs/studio/uiComponents/chordial/useChodrial'
import {ChordialOverlay} from '@encorejs/studio/uiComponents/chordial/ChordialOverlay'

const MakeRootHostContainStatic =
  typeof window !== 'undefined'
    ? createGlobalStyle`
  :host {
    contain: strict;
  }
`
    : ({} as ReturnType<typeof createGlobalStyle>)

const Container = styled(PointerEventsHandler)`
  z-index: 50;
  position: fixed;
  inset: 0;

  &.invisible {
    pointer-events: none !important;
    opacity: 0;
    transform: translateX(1000000px);
  }
`

const INTERNAL_LOGGING = /Playground.+Theatre\.js/.test(
  (typeof document !== 'undefined' ? document?.title : null) ?? '',
)

export default function UIRoot(props: {
  containerShadow: ShadowRoot & HTMLElement
}) {
  const studio = getStudio()
  const [portalLayerRef, portalLayer] = useRefAndState<HTMLDivElement>(
    undefined as $IntentionalAny,
  )

  const uiRootLogger = createTheatreInternalLogger()
  uiRootLogger.configureLogging({
    min: TheatreLoggerLevel.DEBUG,
    dev: INTERNAL_LOGGING,
    internal: INTERNAL_LOGGING,
  })
  const logger = uiRootLogger.getLogger().named('Encore UIRoot')

  useKeyboardShortcuts()

  const visiblityState = useVal(studio.atomP.ahistoric.visibilityState)
  useEffect(() => {
    if (visiblityState === 'everythingIsHidden') {
      console.warn(
        `Encore Studio is hidden. Use the keyboard shortcut 'alt + \\' to restore the studio, or call studio.ui.restore().`,
      )
    }
    return () => {}
  }, [visiblityState])

  const chordialRootRef = useChordialCaptureEvents()

  const inside = usePrism(() => {
    const visiblityState = val(studio.atomP.ahistoric.visibilityState)

    const initialised = val(studio.initializedP)

    return !initialised ? null : (
      <ProvideLogger logger={logger}>
        <MountExtensionComponents />
        <PortalContext.Provider value={portalLayer}>
          <ProvideStyles
            target={
              window.__IS_VISUAL_REGRESSION_TESTING === true
                ? undefined
                : props.containerShadow
            }
          >
            <>
              <MakeRootHostContainStatic />
              <Container
                className={
                  visiblityState === 'everythingIsHidden' ? 'invisible' : ''
                }
                // @ts-ignore
                ref={chordialRootRef}
              >
                <PortalLayer ref={portalLayerRef} />
                <ChordialOverlay />
                <GlobalToolbar />
                <PanelsRoot />
                <Notifier />
              </Container>
            </>
          </ProvideStyles>
        </PortalContext.Provider>
      </ProvideLogger>
    )
  }, [studio, portalLayerRef, portalLayer])

  return inside
}

const MountExtensionComponents: React.FC<{}> = () => {
  return <MountAll />
}
