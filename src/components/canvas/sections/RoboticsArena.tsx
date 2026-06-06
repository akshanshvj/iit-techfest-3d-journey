import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function RoboticsArena({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const gear1Ref = useRef<THREE.Mesh>(null);
  const gear2Ref = useRef<THREE.Mesh>(null);
  const gear3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (gear1Ref.current) gear1Ref.current.rotation.z = time * 0.5;
    if (gear2Ref.current) gear2Ref.current.rotation.z = -time * 0.8;
    if (gear3Ref.current) gear3Ref.current.rotation.z = time * 0.3;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.5;
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.5;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      <mesh ref={gear1Ref} position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.5, 12, 1, false, 0, Math.PI * 2]} />
        <meshStandardMaterial color="#ff4500" metalness={0.8} roughness={0.2} wireframe />
      </mesh>
      
      <mesh ref={gear2Ref} position={[2.5, 1, -1]} rotation={[Math.PI/4, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.5, 8, 1, false, 0, Math.PI * 2]} />
        <meshStandardMaterial color="#ff007f" metalness={0.9} roughness={0.1} emissive="#ff007f" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh ref={gear3Ref} position={[-2, -1.5, 1]} rotation={[-Math.PI/6, 0, 0]}>
        <torusGeometry args={[1.5, 0.3, 8, 24]} />
        <meshStandardMaterial color="#00d2ff" metalness={0.5} roughness={0.5} emissive="#00d2ff" emissiveIntensity={1} />
      </mesh>

      {/* Core glowing orb */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
      </mesh>
    </group>
  );
}
