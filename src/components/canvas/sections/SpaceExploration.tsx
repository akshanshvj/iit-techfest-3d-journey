import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SpaceExploration({ position }: { position: [number, number, number] }) {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const satellitesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (planetRef.current) planetRef.current.rotation.y = time * 0.1;
    if (ringRef.current) ringRef.current.rotation.z = time * 0.05;
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y = -time * 0.2;
      satellitesRef.current.rotation.z = Math.sin(time * 0.1) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial 
          color="#1a237e" 
          emissive="#000022"
          roughness={0.7}
          metalness={0.2}
          wireframe={true}
        />
      </mesh>

      {/* Planetary Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[4, 5, 64]} />
        <meshStandardMaterial color="#00d2ff" side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>

      {/* Satellites */}
      <group ref={satellitesRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.cos(i * Math.PI * 0.6) * 6, Math.sin(i * Math.PI * 0.6) * 6, 0]}>
            <boxGeometry args={[0.5, 0.2, 0.5]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
