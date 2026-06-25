import styled from 'styled-components'
import BasicTooltip from './BasicTooltip'

const ErrorTooltip = styled(BasicTooltip)`
  --popover-outer-stroke: var(--tt-danger);
  --popover-inner-stroke: var(--tt-danger);
  --popover-bg: var(--tt-elevated);
  pointer-events: none !important;
`

export default ErrorTooltip
