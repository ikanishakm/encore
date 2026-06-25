import {editable as e, SheetProvider, PerspectiveCamera} from '@theatre/r3f'
import {getProject} from '@theatre/core'
import React, {useMemo} from 'react'
import {Canvas} from '@react-three/fiber'
import {Grid, Line} from '@react-three/drei'

/**
 * A flowing 3D path of glowing waypoints. The camera (an editable
 * `<PerspectiveCamera>`) can be keyframed in Theatre to fly along / follow it.
 * The waypoints themselves are plain (non-editable) meshes so they don't
 * clutter the outline — only the Camera, the lights and the Cube are editable.
 */
const WAYPOINTS = 28

function useTrail() {
  return useMemo(() => {
    const points: Array<[number, number, number]> = []
    const colors: string[] = []
    for (let i = 0; i < WAYPOINTS; i++) {
      const t = i / (WAYPOINTS - 1)
      const x = Math.sin(t * Math.PI * 3) * 7
      const y = Math.sin(t * Math.PI * 2) * 3.5 + 1
      const z = -t * 70
      points.push([x, y, z])
      // teal -> magenta gradient along the trail
      colors.push(`hsl(${Math.round(170 + t * 170)}, 90%, 60%)`)
    }
    return {points, colors}
  }, [])
}

function Trail() {
  const {points, colors} = useTrail()
  return (
    <group>
      {/* a soft glowing line threaded through every waypoint */}
      <Line
        points={points}
        color="#3eaaa4"
        lineWidth={1.5}
        transparent
        opacity={0.45}
      />
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.32, 24, 24]} />
          <meshStandardMaterial
            color={colors[i]}
            emissive={colors[i]}
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function App() {
  return (
    <div style={{height: '100vh', background: '#000'}}>
      <Canvas gl={{preserveDrawingBuffer: true}}>
        {/* black scene background */}
        <color attach="background" args={['#000000']} />

        <SheetProvider sheet={getProject('React 19 Smoke').sheet('Scene')}>
          {/* Animatable camera — select "Camera" in the outline, then keyframe
              its position/rotation in the sequence editor to follow the trail. */}
          <PerspectiveCamera
            theatreKey="Camera"
            makeDefault
            position={[0, 3, 12]}
            fov={55}
            near={0.1}
            far={500}
          />

          <ambientLight intensity={0.35} />
          <e.pointLight
            theatreKey="Key Light"
            position={[6, 8, 6]}
            intensity={90}
            color="#9d7bff"
          />

          {/* the trail of elements to follow */}
          <Trail />

          {/* an editable hero object near the start of the trail */}
          <e.mesh
            theatreKey="Cube"
            position={[0, 1, 0]}
            scale={[1.4, 1.4, 1.4]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#ff7849"
              emissive="#ff3d00"
              emissiveIntensity={0.35}
              metalness={0.3}
              roughness={0.4}
            />
          </e.mesh>

          {/* floor grid for spatial orientation while animating the camera */}
          <Grid
            position={[0, -3.5, -30]}
            args={[140, 140]}
            cellSize={2}
            cellThickness={0.6}
            cellColor="#1f2937"
            sectionSize={10}
            sectionThickness={1}
            sectionColor="#3eaaa4"
            fadeDistance={130}
            fadeStrength={1.5}
            infiniteGrid
          />
        </SheetProvider>
      </Canvas>
    </div>
  )
}

export default App
