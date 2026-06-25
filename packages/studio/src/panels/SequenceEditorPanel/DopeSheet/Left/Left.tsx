import type {SequenceEditorPanelLayout} from '@encorejs/studio/panels/SequenceEditorPanel/layout/layout'
import {usePrism} from '@encorejs/react'
import type {Pointer} from '@encorejs/dataverse'
import {val} from '@encorejs/dataverse'
import React from 'react'
import styled from 'styled-components'
import SheetRow from './SheetRow'

const Container = styled.div`
  position: absolute;
  left: 0;
  overflow-x: visible;
`

const ListContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const Left: React.FC<{
  layoutP: Pointer<SequenceEditorPanelLayout>
}> = ({layoutP}) => {
  return usePrism(() => {
    const tree = val(layoutP.tree)
    const width = val(layoutP.leftDims.width)

    return (
      <Container style={{width: width + 'px', top: tree.top + 'px'}}>
        <ListContainer>
          <SheetRow leaf={tree} />
        </ListContainer>
      </Container>
    )
  }, [layoutP])
}

export default Left
