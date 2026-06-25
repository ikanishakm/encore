import React from 'react'
import styled from 'styled-components'
import AppButton from './AppButton/AppButton'
import WorkspaceButton from './WorkspaceButton/WorkspaceButton'

const Container = styled.div`
  height: 28px;
  flex-shrink: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 13px;

  border-radius: var(--tt-radius);
  background: var(--tt-panel);
  border: 1px solid var(--tt-border);
  box-shadow: var(--tt-shadow);
  backdrop-filter: blur(10px);
`

const Separator = styled.div`
  background: var(--tt-border);
  width: 1px;
  height: 100%;
`

const LeftStrip: React.FC<{}> = (props) => {
  return (
    <Container>
      <AppButton />
      <Separator />
      <WorkspaceButton />
    </Container>
  )
}

export default LeftStrip
