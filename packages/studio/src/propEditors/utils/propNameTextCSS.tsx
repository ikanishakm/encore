import type {PropHighlighted} from '@encorejs/studio/panels/SequenceEditorPanel/whatPropIsHighlighted'
import {css} from 'styled-components'

export const propNameTextCSS = css<{isHighlighted?: PropHighlighted}>`
  font-weight: 300;
  font-size: 11px;
  color: ${(props) =>
    props.isHighlighted === 'self' ? 'var(--tt-fg-2)' : 'var(--tt-fg-muted)'};
  text-shadow: 0.5px 0.5px 2px rgba(0, 0, 0, 0.3);
`
