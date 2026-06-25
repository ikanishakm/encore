import {editable as e, RafDriverProvider, SheetProvider} from '@encorejs/r3f'
import type {IRafDriver} from '@encorejs/core'
import {getProject} from '@encorejs/core'
import React from 'react'
import {Canvas} from '@react-three/fiber'

const EditablePoints = e('points', 'mesh')

function App(props: {rafDriver: IRafDriver}) {
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <Canvas
        dpr={[1.5, 2]}
        linear
        gl={{preserveDrawingBuffer: true}}
        frameloop="demand"
      >
        <SheetProvider sheet={getProject('Space').sheet('Scene')}>
          <RafDriverProvider driver={props.rafDriver}>
            <ambientLight intensity={0.75} />
            <EditablePoints theatreKey="points">
              <torusKnotGeometry args={[1, 0.3, 128, 64]} />
              <meshNormalMaterial />
            </EditablePoints>
          </RafDriverProvider>
        </SheetProvider>
      </Canvas>
    </div>
  )
}

export default App
