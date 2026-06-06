import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero({ position }: { position: [number, number, number] }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate random particles
  const particlesCount = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.2;
      coreRef.current.rotation.y = time * 0.3;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.5;
      ring1Ref.current.rotation.y = time * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 0.3;
      ring2Ref.current.rotation.y = time * 0.4;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        {/* Core Sphere */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial 
            color="#00d2ff" 
            wireframe 
            emissive="#00d2ff"
            emissiveIntensity={2}
          />
        </mesh>
        
        {/* Inner solid sphere */}
        <mesh>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshStandardMaterial 
            color="#0a0a0f" 
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Energy Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[3, 0.05, 16, 100]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={1.5} />
        </mesh>
        
        <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4, 0.02, 16, 100]} />
          <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={1} />
        </mesh>
      </Float>

      {/* Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.05} 
          color="#00d2ff" 
          transparent 
          opacity={0.6} 
          sizeAttenuation 
        />
      </points>
    </group>
  );
}
