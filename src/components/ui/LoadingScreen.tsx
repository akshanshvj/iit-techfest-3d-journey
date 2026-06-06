import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  started: boolean;
  setStarted: (started: boolean) => void;
}

export default function LoadingScreen({ started, setStarted }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);
  
  return (
    <AnimatePresence>
      {!started && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-dark overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-hero-glow opacity-30"></div>
          <div className="absolute w-[800px] h-[800px] rounded-full border border-white/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute w-[600px] h-[600px] rounded-full border border-brand-primary/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_40s_linear_infinite_reverse]"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-glow mb-2"
            >
              TECHFEST
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/60 tracking-[0.2em] text-sm uppercase mb-12"
            >
              IIT Bombay
            </motion.p>
            
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-6">
              <motion.div 
                className="h-full bg-brand-primary shadow-[0_0_10px_rgba(0,210,255,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            
            <div className="text-white/80 font-mono text-sm mb-8 h-6">
              {progress.toFixed(0)}% / INITIALIZING NEURAL UPLINK...
            </div>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: progress === 100 ? 1 : 0, scale: progress === 100 ? 1 : 0.9 }}
              transition={{ delay: 0.2 }}
              disabled={progress < 100}
              onClick={() => setStarted(true)}
              className="px-8 py-3 rounded-full bg-white/10 border border-brand-primary/50 text-brand-primary font-bold uppercase tracking-wider hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 shadow-[0_0_15px_rgba(0,210,255,0.3)] hover:shadow-[0_0_25px_rgba(0,210,255,0.6)] backdrop-blur-sm"
            >
              Enter The Future
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
