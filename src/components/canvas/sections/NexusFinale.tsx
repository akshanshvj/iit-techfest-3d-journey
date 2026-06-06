import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export default function NexusFinale({ position }: { position: [number, number, number] }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Swarm particles
  const particlesCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      const r = 5 + Math.random() * 5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      pos[i] = r * Math.sin(phi) * Math.cos(theta);
      pos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.5;
      coreRef.current.rotation.y = time * 0.5;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.1;
      particlesRef.current.rotation.z = time * 0.05;
      
      // Pulse effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      particlesRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={position}>
      {/* Massive Energy Core */}
      <mesh ref={coreRef}>
        <torusKnotGeometry args={[2, 0.5, 100, 16]} />
        <meshStandardMaterial 
          color="#00d2ff" 
          emissive="#00d2ff" 
          emissiveIntensity={2} 
          wireframe
        />
      </mesh>

      {/* 3D Text hidden inside / behind */}
      <Text
        position={[0, 0, -2]}
        fontSize={2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#00d2ff"
      >
        NEXUS
      </Text>

      {/* Swarm Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.05} 
          color="#ff007f" 
          transparent 
          opacity={0.8} 
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
