import {css} from 'styled-components'
import styled, {createGlobalStyle, StyleSheetManager} from 'styled-components'
import React, {useLayoutEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import type {$IntentionalAny} from '@theatre/core/types/public'
import {PortalContext} from 'reakit'
import useRefAndState from './utils/useRefAndState'

/**
 * This CSS string is used to correctly set pointer-events on an element
 * when the pointer is dragging something.
 * Naming explanation: "NormalMode" as opposed to dragging mode.
 *
 * @see PointerEventsHandler - the place that sets `.normal` on #pointer-root
 */
export const pointerEventsAutoInNormalMode = css`
  #pointer-root & {
    pointer-events: none;
  }
  #pointer-root.normal & {
    pointer-events: auto;
  }
`

export const theme = {
  panel: {
    bg: `var(--tt-panel)`,
    head: {
      title: {
        color: `var(--tt-fg-2)`,
      },
      punctuation: {
        color: `var(--tt-fg-muted)`,
      },
    },
    body: {
      compoudThing: {
        label: {
          color: `var(--tt-fg-2)`,
        },
      },
    },
  },
}

export const panelUtils = {
  panelBorder: `1px solid var(--tt-border)`,
}

/**
 * shadcn-inspired design tokens, exposed as CSS custom properties on the
 * studio's shadow-DOM `:host`. The dark palette is the default; the light
 * palette is applied when the host element carries `data-theme="light"`
 * (see {@link applyTheme} / the theme toggle). Because these are pure CSS
 * variables, switching themes is a zero-rerender, zero-cost attribute flip.
 */
export const themeTokens = css`
  :host {
    /* surfaces */
    --tt-bg: #1c1e22;
    --tt-panel: #25282d;
    --tt-panel-2: #2c3036;
    --tt-input: #191b1f;
    --tt-elevated: #2a2e34;
    /* text */
    --tt-fg: #e7e8ea;
    --tt-fg-2: #b7babf;
    --tt-fg-muted: #82868d;
    /* lines */
    --tt-border: #34383f;
    --tt-border-strong: #424751;
    /* accent (Theatre teal) */
    --tt-primary: #3eaaa4;
    --tt-primary-hover: #49bdb6;
    --tt-primary-fg: #06201f;
    /* semantic */
    --tt-warning: #f2c95c;
    --tt-danger: #ef4444;
    /* overlays */
    --tt-hover: rgba(255, 255, 255, 0.06);
    --tt-active: rgba(255, 255, 255, 0.1);
    --tt-selected: rgba(62, 170, 164, 0.2);
    --tt-ring: rgba(62, 170, 164, 0.55);
    /* depth */
    --tt-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.6),
      0 2px 6px -2px rgba(0, 0, 0, 0.42);
    /* radii */
    --tt-radius: 8px;
    --tt-radius-sm: 6px;
    --tt-radius-lg: 12px;
    /* invert amount for white-on-dark raster assets (e.g. the logo) */
    --tt-logo-invert: 0;
  }

  :host([data-theme='light']) {
    --tt-bg: #f4f4f5;
    --tt-panel: #ffffff;
    --tt-panel-2: #f4f4f5;
    --tt-input: #ffffff;
    --tt-elevated: #ffffff;
    --tt-fg: #1b1b1f;
    --tt-fg-2: #46474d;
    --tt-fg-muted: #74757c;
    --tt-border: #e4e4e7;
    --tt-border-strong: #d2d3d8;
    --tt-primary: #0d9488;
    --tt-primary-hover: #0f766e;
    --tt-primary-fg: #ffffff;
    --tt-warning: #c2830a;
    --tt-danger: #dc2626;
    --tt-hover: rgba(0, 0, 0, 0.045);
    --tt-active: rgba(0, 0, 0, 0.075);
    --tt-selected: rgba(13, 148, 136, 0.14);
    --tt-ring: rgba(13, 148, 136, 0.5);
    --tt-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.18),
      0 2px 6px -2px rgba(0, 0, 0, 0.1);
    --tt-logo-invert: 1;
  }
`

const GlobalStyle =
  typeof window !== 'undefined'
    ? createGlobalStyle`
        ${themeTokens}
        :host {
          all: initial;
          color: var(--tt-fg);
          font:
            11px -apple-system,
            BlinkMacSystemFont,
            Segoe WPC,
            Segoe Editor,
            HelveticaNeue-Light,
            Ubuntu,
            Droid Sans,
            sans-serif;

          // external links
          a[href^='http'] {
            text-decoration: none;
            text-decoration-line: underline;
            text-decoration-color: #888;
            position: relative;
            display: inline-block;
            margin-left: 0.4em;

            &:hover,
            &:active {
              text-decoration-color: #ccc;
            }
          }

          // from tailwind
          .text-xs {
            font-size: 0.75rem; /* 12px */
            line-height: 1rem; /* 16px */
          }
          .text-sm {
            font-size: 0.875rem; /* 14px */
            line-height: 1.25rem; /* 20px */
          }
          .text-base {
            font-size: 1rem; /* 16px */
            line-height: 1.5rem; /* 24px */
          }
          .text-lg {
            font-size: 1.125rem; /* 18px */
            line-height: 1.75rem; /* 28px */
          }
          .text-xl {
            font-size: 1.25rem; /* 20px */
            line-height: 1.75rem; /* 28px */
          }
          .text-2xl {
            font-size: 1.5rem; /* 24px */
            line-height: 2rem; /* 32px */
          }
          .text-3xl {
            font-size: 1.875rem; /* 30px */
            line-height: 2.25rem; /* 36px */
          }
          .text-4xl {
            font-size: 2.25rem; /* 36px */
            line-height: 2.5rem; /* 40px */
          }
          .text-5xl {
            font-size: 3rem; /* 48px */
            line-height: 1;
          }
          .text-6xl {
            font-size: 3.75rem; /* 60px */
            line-height: 1;
          }
          .text-7xl {
            font-size: 4.5rem; /* 72px */
            line-height: 1;
          }
          .text-8xl {
            font-size: 6rem; /* 96px */
            line-height: 1;
          }
          .text-9xl {
            font-size: 8rem; /* 128px */
            line-height: 1;
          }

          .font-thin {
            font-weight: 100;
          }
          .font-extralight {
            font-weight: 200;
          }
          .font-light {
            font-weight: 300;
          }
          .font-normal {
            font-weight: 400;
          }
          .font-medium {
            font-weight: 500;
          }
          .font-semibold {
            font-weight: 600;
          }
          .font-bold {
            font-weight: 700;
          }
          .font-extrabold {
            font-weight: 800;
          }
          .font-black {
            font-weight: 900;
          }

          .text-left {
            text-align: left;
          }
          .text-center {
            text-align: center;
          }
          .text-right {
            text-align: right;
          }

          .text-color-pale {
            color: #CCC;
          }
        }

        * {
          padding: 0;
          margin: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
          list-style: none;
        }
      `
    : ({} as ReturnType<typeof createGlobalStyle>)

export const PortalLayer = styled.div`
  z-index: 51;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  pointer-events: none;
`

export const ProvideStyles: React.FC<{
  target: undefined | HTMLElement
  children: React.ReactNode
}> = (props) => {
  return (
    <StyleSheetManager target={props.target}>
      <>
        <GlobalStyle />
        {props.children}
      </>
    </StyleSheetManager>
  )
}

export function withStyledShadow<Props extends {}>(
  Comp: React.ComponentType<Props>,
): React.ComponentType<Props> {
  return (props) => (
    <ProvideStyledShadow>
      <Comp {...props} />
    </ProvideStyledShadow>
  )
}

const ProvideStyledShadow: React.FC<{
  children: React.ReactNode
}> = (props) => {
  const [template, ref] = useState<null | HTMLTemplateElement>(null)
  const [shadowRoot, setShadowRoot] = useState<null | ShadowRoot>(null)

  useLayoutEffect(() => {
    if (!template) return
    const {parentNode} = template
    if (!parentNode) return

    const hadShadowRoot =
      // @ts-ignore
      !!parentNode.shadowRoot

    const shadowRoot = hadShadowRoot
      ? // @ts-ignore
        parent.shadowRoot
      : (parentNode as HTMLElement).attachShadow({
          mode: 'open',
        })

    setShadowRoot(shadowRoot)

    // no need to cleanup. The parent will be removed anyway if cleanup
    // is needed.
  }, [template])

  const [portalLayerRef, portalLayer] = useRefAndState<HTMLDivElement>(
    undefined as $IntentionalAny,
  )

  if (!shadowRoot) {
    return (
      <template ref={ref} shadow-root={'open'}>
        {props.children}
      </template>
    )
  }

  return ReactDOM.createPortal(
    <ProvideStyles target={shadowRoot as $IntentionalAny as HTMLElement}>
      <>
        <PortalLayer ref={portalLayerRef} />
        <PortalContext.Provider value={portalLayer}>
          {props.children}
        </PortalContext.Provider>
      </>
    </ProvideStyles>,
    shadowRoot as $IntentionalAny as HTMLElement,
  )
}
