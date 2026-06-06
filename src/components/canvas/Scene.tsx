import { useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll, Stars } from '@react-three/drei';
import * as THREE from 'three';

import Hero from './sections/Hero';
import AIUniverse from './sections/AIUniverse';
import RoboticsArena from './sections/RoboticsArena';
import SpaceExploration from './sections/SpaceExploration';
import InnovationCity from './sections/InnovationCity';
import NexusFinale from './sections/NexusFinale';
import Overlay from '../ui/Overlay';

const CameraController = () => {
  const scroll = useScroll();
  
  useFrame((state) => {
    // Scroll offset goes from 0 to 1
    const offset = scroll.offset;
    
    // We have 6 sections, total distance on Z axis could be -100
    // So z goes from 0 to -100 based on scroll
    const targetZ = offset * -100;
    
    // Smooth camera movement
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ + 5, 0.1);
    
    // Add slight sway to the camera based on time and scroll
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      Math.sin(state.clock.elapsedTime * 0.5) * 0.5,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      Math.cos(state.clock.elapsedTime * 0.3) * 0.5,
      0.05
    );
  });

  return null;
};

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#00d2ff" />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#ff007f" />
      
      {/* Background Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <ScrollControls pages={6} damping={0.2}>
        <CameraController />
        
        {/* 3D Elements positioned along the Z-axis journey */}
        <Hero position={[0, 0, 0]} />
        <AIUniverse position={[0, 0, -20]} />
        <RoboticsArena position={[0, 0, -40]} />
        <SpaceExploration position={[0, 0, -60]} />
        <InnovationCity position={[0, 0, -80]} />
        <NexusFinale position={[0, 0, -100]} />

        {/* HTML Overlays */}
        <Scroll html style={{ width: '100%', height: '100%' }}>
          <Overlay />
        </Scroll>
      </ScrollControls>
    </>
  );
}
