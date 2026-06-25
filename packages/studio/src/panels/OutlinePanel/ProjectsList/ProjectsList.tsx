import {val} from '@encorejs/dataverse'
import {usePrism} from '@encorejs/react'
import getStudio from '@encorejs/studio/getStudio'
import React from 'react'
import styled from 'styled-components'
import ProjectListItem from './ProjectListItem'

const Container = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-right: 4px;
`

const ProjectsList: React.FC<{}> = (props) => {
  return usePrism(() => {
    const projects = val(getStudio().projectsP)

    return (
      <Container>
        {Object.keys(projects).map((projectId) => {
          const project = projects[projectId]
          return (
            <ProjectListItem
              depth={0}
              project={project}
              key={`projectListItem-${projectId}`}
            />
          )
        })}
      </Container>
    )
  }, [])
}

export default ProjectsList
