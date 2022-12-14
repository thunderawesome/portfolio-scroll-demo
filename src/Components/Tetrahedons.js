/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import niceColors from 'nice-color-palettes'
import { useFrame, useThree } from '@react-three/fiber'

const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const count = 1000
const data = Array.from({ length: count }, () => ({
  color: niceColors[17][Math.floor(Math.random() * 5)],
  scale: 1
}))

function Tetrahedrons({ material }) {
  const { height } = useThree((state) => state.viewport)
  const meshRef = useRef()
  const colorArray = useMemo(() => Float32Array.from(new Array(count).fill().flatMap((_, i) => tempColor.set(data[i].color).toArray())), [])
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time / 4)
    meshRef.current.rotation.y = Math.sin(time / 2)
    meshRef.current.position.y = -height * 5
    meshRef.current.position.z = -10
    let i = 0
    for (let x = 0; x < 10; x++)
      for (let y = 0; y < 10; y++)
        for (let z = 0; z < 10; z++) {
          const id = i++
          tempObject.position.set(5 - x, y, 5 - z)
          tempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
          tempObject.rotation.z = tempObject.rotation.y * 2
          tempColor.set(data[id].color).toArray(colorArray, id * 3)
          meshRef.current.geometry.attributes.color.needsUpdate = true

          tempObject.updateMatrix()
          meshRef.current.setMatrixAt(id, tempObject.matrix)
        }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, material, count]}>
      <tetrahedronBufferGeometry args={[0.5, 1]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </tetrahedronBufferGeometry>
    </instancedMesh>
  )
}

export { Tetrahedrons }
