import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function InnovationCity({ position }: { position: [number, number, number] }) {
  const cityGroup = useRef<THREE.Group>(null);
  const vehiclesRef = useRef<THREE.Points>(null);

  // Generate buildings
  const buildings = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      const height = 1 + Math.random() * 4;
      arr.push({
        position: [
          (Math.random() - 0.5) * 15,
          height / 2 - 2, // align bottom
          (Math.random() - 0.5) * 15
        ],
        scale: [0.5 + Math.random(), height, 0.5 + Math.random()]
      });
    }
    return arr;
  }, []);

  // Generate flying vehicles
  const vehiclesCount = 100;
  const vPositions = useMemo(() => {
    const pos = new Float32Array(vehiclesCount * 3);
    for (let i = 0; i < vehiclesCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (cityGroup.current) {
      cityGroup.current.rotation.y = Math.sin(time * 0.05) * 0.2;
    }
    
    if (vehiclesRef.current) {
      const positions = vehiclesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < vehiclesCount; i++) {
        // Move vehicles along X axis
        positions[i * 3] += 0.1;
        if (positions[i * 3] > 10) {
          positions[i * 3] = -10;
        }
      }
      vehiclesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={position} ref={cityGroup}>
      {/* Buildings */}
      {buildings.map((b, i) => (
        <mesh key={i} position={b.position as [number, number, number]} scale={b.scale as [number, number, number]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="#001133" 
            emissive={Math.random() > 0.8 ? "#00d2ff" : "#000000"} 
            emissiveIntensity={Math.random() * 2}
            wireframe={Math.random() > 0.5}
          />
        </mesh>
      ))}

      {/* Grid Floor */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30, 15, 15]} />
        <meshStandardMaterial color="#00d2ff" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Vehicles */}
      <points ref={vehiclesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[vPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#ff007f" transparent opacity={0.8} />
      </points>
    </group>
  );
}
