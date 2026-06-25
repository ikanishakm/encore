import type Project from '@encore/core/projects/Project'
import React, {useCallback} from 'react'
import BaseItem from '@encore/studio/panels/OutlinePanel/BaseItem'
import SheetsList from '@encore/studio/panels/OutlinePanel/SheetsList/SheetsList'
import getStudio from '@encore/studio/getStudio'
import {usePrism, useVal} from '@encore/react'
import {outlineSelection} from '@encore/studio/selectors'
import {val} from '@encore/dataverse'
import styled from 'styled-components'
import {useCollapseStateInOutlinePanel} from '@encore/studio/panels/OutlinePanel/outlinePanelUtils'
import useChordial from '@encore/studio/uiComponents/chordial/useChodrial'

const ConflictNotice = styled.div`
  color: var(--tt-fg);
  margin-left: 11px;
  background: var(--tt-danger);
  padding: 2px 8px;
  border-radius: var(--tt-radius-sm);
  font-size: 10px;
  box-shadow: var(--tt-shadow);
`

const ProjectListItem: React.FC<{
  depth: number
  project: Project
}> = ({depth, project}) => {
  const selection = useVal(outlineSelection)

  const hasConflict = usePrism(() => {
    const projectId = project.address.projectId
    const loadingState = val(
      getStudio().ephemeralAtom.pointer.coreByProject[projectId].loadingState,
    )
    return loadingState?.type === 'browserStateIsNotBasedOnDiskState'
  }, [project])

  const select = useCallback(() => {
    getStudio().transaction(({stateEditors}) => {
      stateEditors.studio.historic.panels.outline.selection.set([
        {...project.address, type: 'Project'},
      ])
    })
  }, [project])

  const {collapsed, setCollapsed} = useCollapseStateInOutlinePanel(project)

  const {targetRef} = useChordial(() => {
    return {
      title: `Project: ${project.address.projectId}`,
      items: [],
    }
  })

  return (
    <BaseItem
      depth={depth}
      label={project.address.projectId}
      setIsCollapsed={setCollapsed}
      collapsed={collapsed}
      headerRef={targetRef}
      labelDecoration={
        hasConflict ? <ConflictNotice>Has Conflicts</ConflictNotice> : null
      }
      children={<SheetsList project={project} depth={depth + 1} />}
      selectionStatus={
        selection.includes(project)
          ? 'selected'
          : selection.some(
                (s) => s.address.projectId === project.address.projectId,
              )
            ? 'descendant-is-selected'
            : 'not-selected'
      }
      select={select}
    />
  )
}

export default ProjectListItem
