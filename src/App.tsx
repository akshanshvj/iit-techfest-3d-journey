import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Scene from './components/canvas/Scene';
import LoadingScreen from './components/ui/LoadingScreen';
import ErrorBoundary from './components/ui/ErrorBoundary';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      
      <main className="w-full h-screen bg-brand-dark overflow-hidden">
        {/* Only render heavy 3D content once started */}
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={['#050508']} />
          <fog attach="fog" args={['#050508', 10, 50]} />
          
          <Suspense fallback={
            <Html center>
              <div className="text-white text-2xl font-bold">LOADING 3D ASSETS...</div>
            </Html>
          }>
            <ErrorBoundary>
              {started && (
                <>
                  <Scene />
                  <EffectComposer>
                    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
                  </EffectComposer>
                </>
              )}
            </ErrorBoundary>
            <Preload all />
          </Suspense>
        </Canvas>
      </main>
    </>
  );
}

export default App;
