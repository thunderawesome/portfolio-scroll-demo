import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
import { AmbientLight } from 'three'

export default function App() {
  return (
    <Canvas gl={{ antialias: false }} frameloop="demand">
      <Suspense fallback={null}>
        <AmbientLight />
        <Scene />
      </Suspense>
    </Canvas>
  )
}
