import styled from 'styled-components'
import {Group} from 'reakit'

const Container = styled(Group)`
  display: flex;
  height: fit-content;
  backdrop-filter: blur(14px);
  border-radius: var(--tt-radius-sm);
`

export default Container
