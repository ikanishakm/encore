import React from 'react'
import styled from 'styled-components'
import getStudio from '@encorejs/studio/getStudio'
import type {PathToProp} from '@encorejs/utils/pathToProp'
import type SheetObject from '@encorejs/core/sheetObjects/SheetObject'
import type {PropTypeConfig} from '@encorejs/core/types/public'
import {__private} from '@encorejs/core'
const {isPropConfigComposite, iteratePropType} = __private.propTypeUtils

const theme = {
  defaultState: {
    color: `var(--tt-fg-muted)`,
    hoverColor: `var(--tt-warning)`,
  },
  withStaticOverride: {
    color: `var(--tt-fg-muted)`,
    hoverColor: `var(--tt-warning)`,
  },
}

const Container = styled.div<{
  hasStaticOverride: boolean
}>`
  width: 16px;
  margin: 0 0px 0 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  color: ${(props) =>
    props.hasStaticOverride
      ? theme.withStaticOverride.color
      : theme.defaultState.color};

  &:hover {
    color: ${(props) =>
      props.hasStaticOverride
        ? theme.withStaticOverride.hoverColor
        : theme.defaultState.hoverColor};
  }
`

const DefaultIcon = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 1px;
  transform: rotate(45deg);
  /* border: 1px solid currentColor; */
  background-color: currentColor;
`

const FilledIcon = styled.div`
  width: 5px;
  height: 5px;
  background-color: currentColor;
  border-radius: 1px;
  transform: rotate(45deg);
`

const DefaultOrStaticValueIndicator: React.FC<{
  hasStaticOverride: boolean
  pathToProp: PathToProp
  obj: SheetObject
  propConfig: PropTypeConfig
}> = (props) => {
  const {hasStaticOverride, obj, propConfig, pathToProp} = props
  const sequenceCb = () => {
    getStudio()!.transaction(({stateEditors}) => {
      for (const {path, conf} of iteratePropType(propConfig, pathToProp)) {
        if (isPropConfigComposite(conf)) continue
        const propAddress = {...obj.address, pathToProp: path}

        stateEditors.coreByProject.historic.sheetsById.sequence.setPrimitivePropAsSequenced(
          propAddress,
        )
      }
    })
  }
  return (
    <Container
      hasStaticOverride={hasStaticOverride}
      onClick={sequenceCb}
      title="Sequence this prop"
    >
      {hasStaticOverride ? (
        <FilledIcon title="The default value is overridden" />
      ) : (
        <DefaultIcon title="This is the default value for this prop" />
      )}
    </Container>
  )
}

export default DefaultOrStaticValueIndicator
