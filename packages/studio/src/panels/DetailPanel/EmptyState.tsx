import type {FC} from 'react'
import React from 'react'
import styled from 'styled-components'
import {Outline} from '@theatre/studio/uiComponents/icons'

const Container = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  color: var(--tt-fg);
`

const Icon = styled.div`
  color: var(--tt-fg-muted);
`

const LinkToDoc = styled.a`
  color: var(--tt-fg-muted);
  font-size: 10px;
  text-decoration-color: var(--tt-border);
  text-underline-offset: 3px;
`

const EmptyState: FC = () => {
  return (
    <Container>
      <Message>
        <Icon>
          <Outline />
        </Icon>
        <div>
          Please select an object from the <u>Outline Menu</u> to see its
          properties.
        </div>
      </Message>
      {/* Links like this should probably be managed centrally so that we can
      have a process for updating them when the docs change. */}
      <LinkToDoc
        href="https://www.theatrejs.com/docs/latest/manual/objects"
        target="_blank"
      >
        Learn more about Objects
      </LinkToDoc>
    </Container>
  )
}

export default EmptyState
