import type {PropHighlighted} from '@theatre/studio/panels/SequenceEditorPanel/whatPropIsHighlighted'

export function getDetailRowHighlightBackground({
  isHighlighted,
}: {
  isHighlighted: PropHighlighted
}): string {
  return isHighlighted === 'self'
    ? 'var(--tt-selected)'
    : isHighlighted === 'descendent'
      ? 'var(--tt-hover)'
      : 'initial'
}
