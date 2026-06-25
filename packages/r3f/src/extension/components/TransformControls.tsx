import type {Object3D, Event, EventDispatcher} from 'three'
import React, {forwardRef, useLayoutEffect, useEffect, useMemo} from 'react'
import type {ReactThreeFiber, ThreeElement} from '@react-three/fiber'
import {useThree} from '@react-three/fiber'
import {TransformControls as TransformControlsImpl} from 'three-stdlib'
import type {OrbitControlsImpl} from './OrbitControls'

// R3F v9 removed `ReactThreeFiber.Overwrite` and `ReactThreeFiber.Object3DNode`;
// inline the same semantics and use the v9 `ThreeElement` generic instead.
type Overwrite<P, O> = Omit<P, keyof O> & O

// `args` (constructor args) is required by ThreeElement, but this wrapper
// constructs the impl itself.
type R3fTransformControls = Omit<
  Overwrite<
    ThreeElement<typeof TransformControlsImpl>,
    {target?: ReactThreeFiber.Vector3}
  >,
  'args'
>

// three-stdlib's TransformControls dispatches these events at runtime, but
// three 0.184's typed `Object3DEventMap` doesn't declare them. View the controls
// as a dispatcher that knows about them when (de)registering listeners.
type TransformControlsEventMap = {
  change: {}
  objectChange: {}
  'dragging-changed': {value: boolean}
}

const asDispatcher = (controls: TransformControlsImpl) =>
  controls as unknown as EventDispatcher<TransformControlsEventMap>

export interface TransformControlsProps extends R3fTransformControls {
  object: Object3D
  orbitControlsRef?: React.MutableRefObject<OrbitControlsImpl | null>
  onObjectChange?: (event: Event) => void
  onDraggingChange?: (event: Event & {value: boolean}) => void
  children?: React.ReactNode

  // not a complete list of props that transform controls can take
  mode: 'translate' | 'rotate' | 'scale'
  space: 'world' | 'local'
}

const TransformControls = forwardRef(
  (
    {
      children,
      object,
      orbitControlsRef,
      onObjectChange,
      onDraggingChange,
      ...props
    }: TransformControlsProps,
    ref,
  ) => {
    const {camera, gl, invalidate} = useThree()
    const controls = useMemo(
      () => new TransformControlsImpl(camera, gl.domElement),
      [camera, gl.domElement],
    )

    useLayoutEffect(() => {
      controls.attach(object)

      return () => void controls.detach()
    }, [object, controls])

    useEffect(() => {
      // Use a stable handler so the cleanup actually removes the listener
      // (the previous code passed a fresh arrow to removeEventListener).
      const onChange = () => invalidate()
      const dispatcher = asDispatcher(controls)
      dispatcher.addEventListener('change', onChange)
      return () => dispatcher.removeEventListener('change', onChange)
    }, [controls, invalidate])

    useEffect(() => {
      const callback = (event: Event & {value: boolean}) => {
        if (orbitControlsRef && orbitControlsRef.current) {
          orbitControlsRef.current.enabled = !event.value
        }
      }

      const dispatcher = asDispatcher(controls)
      dispatcher.addEventListener('dragging-changed', callback)

      return () => {
        dispatcher.removeEventListener('dragging-changed', callback)
      }
    }, [controls, orbitControlsRef])

    useEffect(() => {
      if (!onObjectChange) return
      const dispatcher = asDispatcher(controls)
      dispatcher.addEventListener('objectChange', onObjectChange)

      return () => {
        dispatcher.removeEventListener('objectChange', onObjectChange)
      }
    }, [onObjectChange, controls])

    useEffect(() => {
      if (!onDraggingChange) return
      const dispatcher = asDispatcher(controls)
      dispatcher.addEventListener('dragging-changed', onDraggingChange)

      return () => {
        dispatcher.removeEventListener('dragging-changed', onDraggingChange)
      }
    }, [controls, onDraggingChange])

    return <primitive dispose={null} object={controls} ref={ref} {...props} />
  },
)

export default TransformControls
