import {useVal} from '@encore/react'
import getStudio from '@encore/studio/getStudio'
import React from 'react'
import styled from 'styled-components'
import {generateDiskStateRevision} from '@encore/studio/StudioStore/generateDiskStateRevision'
import type {ProjectEphemeralState} from '@encore/core/types/private/core'
import useTooltip from '@encore/studio/uiComponents/Popover/useTooltip'
import BasicTooltip from '@encore/studio/uiComponents/Popover/BasicTooltip'
import type {$FixMe} from '@encore/core/types/public'
import DetailPanelButton from '@encore/studio/uiComponents/DetailPanelButton'
import type {ProjectId} from '@encore/core/types/public'

const a = 'hi'

const Container = styled.div`
  padding: 8px 10px;
  position: relative;
  background-color: var(--tt-hover);
  &:before {
    position: absolute;
    content: ' ';
    display: block;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: var(--tt-danger);
  }
`

const Message = styled.div`
  margin-bottom: 1em;
  & a {
    color: inherit;
  }
`

const ChooseStateRow = styled.div`
  display: flex;
  gap: 8px;
`

const StateConflictRow: React.FC<{projectId: ProjectId}> = ({projectId}) => {
  const loadingState = useVal(
    getStudio().ephemeralAtom.pointer.coreByProject[projectId].loadingState,
  )

  if (!loadingState) return null

  if (loadingState.type === 'browserStateIsNotBasedOnDiskState') {
    return <InConflict loadingState={loadingState} projectId={projectId} />
  } else {
    return null
  }
}

const InConflict: React.FC<{
  projectId: ProjectId
  loadingState: Extract<
    ProjectEphemeralState['loadingState'],
    {type: 'browserStateIsNotBasedOnDiskState'}
  >
}> = ({projectId, loadingState}) => {
  /**
   * This stuff is not undo-safe, but once we switch to the new persistence
   * scheme, these will be unnecessary anyway.
   */
  const useBrowserState = () => {
    getStudio().transaction(({stateEditors}) => {
      stateEditors.coreByProject.historic.revisionHistory.add({
        projectId,
        revision: loadingState.onDiskState.revisionHistory[0],
      })

      stateEditors.coreByProject.historic.revisionHistory.add({
        projectId,
        revision: generateDiskStateRevision(),
      })
    })
    getStudio().ephemeralAtom.setByPointer(
      (p) => p.coreByProject[projectId]!.loadingState,
      {
        type: 'loaded',
      },
    )
  }

  const useOnDiskState = () => {
    getStudio().transaction(({stateEditors}) => {
      stateEditors.coreByProject.historic.setProjectState({
        projectId,
        state: loadingState.onDiskState,
      })
      // drafts.historic.coreByProject[projectId] = loadingState.onDiskState
    })
    getStudio().ephemeralAtom.setByPointer(
      (p) => p.coreByProject[projectId]!.loadingState,
      {
        type: 'loaded',
      },
    )
  }

  const [browserStateNode, browserStateRef] = useTooltip({}, () => (
    <BasicTooltip>
      The browser's state will override the disk state.
    </BasicTooltip>
  ))

  const [diskStateNode, diskStateRef] = useTooltip({}, () => (
    <BasicTooltip>
      The disk's state will override the browser's state.
    </BasicTooltip>
  ))

  return (
    <Container>
      <Message>
        Browser state is not based on disk state.{' '}
        <a
          href="https://www.theatrejs.com/docs/latest/manual/projects#state"
          target="_blank"
        >
          Learn more.
        </a>
      </Message>
      <ChooseStateRow>
        {browserStateNode}
        <DetailPanelButton
          onClick={useBrowserState}
          ref={browserStateRef as $FixMe}
        >
          Use browser's state
        </DetailPanelButton>
        {diskStateNode}
        <DetailPanelButton
          onClick={useOnDiskState}
          ref={diskStateRef as $FixMe}
        >
          Use disk state
        </DetailPanelButton>
      </ChooseStateRow>
    </Container>
  )
}

export default StateConflictRow
