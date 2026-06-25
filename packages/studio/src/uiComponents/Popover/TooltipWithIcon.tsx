import styled from 'styled-components'
import React from 'react'
import type {$IntentionalAny} from '@theatre/core/types/public'
import BasicTooltip from './BasicTooltip'

const Container = styled(BasicTooltip)`
  display: flex;
  align-items: center;
  height: 30px;
  position: relative;
`

const Title = styled.div`
  text-wrap: nowrap;
`

const IconContainer = styled.div`
  background: var(--tt-active);
  border-radius: var(--tt-radius-sm);
  border: 1px solid var(--tt-border);
  color: var(--tt-fg);
  padding: 4px;
  font-size: 10px;
  /* margin: 0; */
  margin-left: 12px;
  box-shadow: var(--tt-shadow);
  flex-wrap: nowrap;
`

const TooltipWithIcon: React.FC<{
  className?: string
  children: React.ReactNode
  icon: React.ReactNode
}> = React.forwardRef(({children, icon, className}, ref) => {
  return (
    <Container className={className} ref={ref as $IntentionalAny}>
      <Title>{children}</Title>
      <IconContainer>{icon}</IconContainer>
    </Container>
  )
})

export default TooltipWithIcon
