import React, {useCallback, useLayoutEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {FiMoon, FiSun} from 'react-icons/fi'

const STORAGE_KEY = 'theatre-studio-theme'
type ThemeName = 'dark' | 'light'

/**
 * Find the shadow host element that this control lives under, so we can flip
 * its `data-theme` attribute. The studio renders inside a shadow root, so
 * `getRootNode()` resolves to that ShadowRoot and `.host` is the element our
 * `:host([data-theme='light'])` CSS targets.
 */
const getThemeRoot = (node: Element | null): HTMLElement | null => {
  if (!node) return null
  const root = node.getRootNode()
  if (typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot) {
    return root.host as HTMLElement
  }
  return document.documentElement
}

const readStoredTheme = (): ThemeName => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch (e) {
    return 'dark'
  }
}

/** Apply a theme to a host element (dark = no attribute, the CSS default). */
export const applyTheme = (
  host: HTMLElement | null,
  theme: ThemeName,
): void => {
  if (!host) return
  if (theme === 'light') host.setAttribute('data-theme', 'light')
  else host.removeAttribute('data-theme')
}

const Button = styled.button`
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  color: var(--tt-fg-2);
  background: var(--tt-elevated);
  border: 1px solid var(--tt-border);
  border-radius: var(--tt-radius);
  box-shadow: var(--tt-shadow);
  cursor: pointer;
  transition:
    color 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease;

  & > svg {
    width: 15px;
    height: 15px;
    stroke-width: 2.25;
  }

  &:hover {
    color: var(--tt-fg);
    background: var(--tt-panel-2);
    border-color: var(--tt-border-strong);
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      var(--tt-shadow),
      0 0 0 2px var(--tt-ring);
  }
`

const ThemeToggle: React.FC<{}> = () => {
  const ref = useRef<HTMLButtonElement>(null)
  const [theme, setTheme] = useState<ThemeName>(readStoredTheme)

  useLayoutEffect(() => {
    applyTheme(getThemeRoot(ref.current), theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch (e) {}
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <Button
      ref={ref}
      onClick={toggle}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      aria-label="Toggle light/dark theme"
    >
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </Button>
  )
}

export default ThemeToggle
