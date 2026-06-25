import React from 'react'
import styled from 'styled-components'
import ThemeToggle from './ThemeToggle'

const Container = styled.div`
  margin-right: 12px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: nowrap;
`

const RightStrip: React.FC<{}> = (props) => {
  return (
    <Container>
      <ThemeToggle />
    </Container>
  )
}

export default RightStrip
