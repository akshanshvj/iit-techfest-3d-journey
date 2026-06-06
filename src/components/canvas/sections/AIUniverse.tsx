import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export default function AIUniverse({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create nodes
  const nodesCount = 50;
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < nodesCount; i++) {
      arr.push(new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      ));
    }
    return arr;
  }, []);

  // Create connections
  const lines = useMemo(() => {
    const arr = [];
    for (let i = 0; i < nodesCount; i++) {
      for (let j = i + 1; j < nodesCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 4) {
          arr.push([nodes[i], nodes[j]]);
        }
      }
    }
    return arr;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={`node-${i}`} position={pos}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
        </mesh>
      ))}
      
      {/* Connections */}
      {lines.map((pts, i) => (
        <Line 
          key={`line-${i}`}
          points={pts.map(p => [p.x, p.y, p.z]) as [number, number, number][]}
          color="#00ffff"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
}
