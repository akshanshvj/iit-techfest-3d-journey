import { motion } from 'framer-motion';
import { Sparkles, Brain, Cpu, Rocket, Building2, Ticket } from 'lucide-react';

export default function Overlay() {
  return (
    <div className="w-full relative" style={{ height: '600vh' }}>
      
      {/* SECTION 1: HERO (0-100vh) */}
      <section className="h-screen flex flex-col items-center justify-center text-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="glass-panel p-12 rounded-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-glow bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
            TECHFEST IIT BOMBAY
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light tracking-widest mb-8 uppercase">
            Where The Future Comes Alive
          </p>
          <div className="flex items-center justify-center gap-4 text-brand-primary/80 animate-pulse">
            <span className="text-sm tracking-widest">SCROLL TO EXPLORE</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-brand-primary to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: AI UNIVERSE (100-200vh) */}
      <section className="h-screen flex items-center p-8 md:p-24 justify-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <Brain className="w-10 h-10 text-brand-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-glow">AI Universe</h2>
          </div>
          <p className="text-lg text-white/70 mb-6 leading-relaxed">
            Dive into the neural pathways of tomorrow. Witness the evolution of Machine Learning, Generative AI, and Future Computing as they reshape our reality.
          </p>
          <ul className="space-y-2 text-brand-primary/80 font-mono text-sm">
            <li>&gt; Artificial Intelligence</li>
            <li>&gt; Machine Learning Algorithms</li>
            <li>&gt; Generative Models</li>
          </ul>
        </motion.div>
      </section>

      {/* SECTION 3: ROBOTICS ARENA (200-300vh) */}
      <section className="h-screen flex items-center p-8 md:p-24 justify-end text-right">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl"
        >
          <div className="flex items-center justify-end gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-glow-accent">Robotics Arena</h2>
            <Cpu className="w-10 h-10 text-brand-accent" />
          </div>
          <p className="text-lg text-white/70 mb-6 leading-relaxed">
            Experience the pinnacle of mechanical engineering. From autonomous drones to humanoid companions, witness the machines that will build our future.
          </p>
          <ul className="space-y-2 text-brand-accent/80 font-mono text-sm">
            <li>&gt; Robotics Competitions</li>
            <li>&gt; Automation & Control</li>
            <li>&gt; Engineering Challenges</li>
          </ul>
        </motion.div>
      </section>

      {/* SECTION 4: SPACE EXPLORATION (300-400vh) */}
      <section className="h-screen flex items-center p-8 md:p-24 justify-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <Rocket className="w-10 h-10 text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-blue-400" style={{ textShadow: '0 0 10px rgba(96, 165, 250, 0.7)' }}>Space Exploration</h2>
          </div>
          <p className="text-lg text-white/70 mb-6 leading-relaxed">
            The final frontier awaits. Explore aerospace innovations, satellite technologies, and the missions that will make humanity an interplanetary species.
          </p>
          <ul className="space-y-2 text-blue-400/80 font-mono text-sm">
            <li>&gt; Space Technology</li>
            <li>&gt; Aerospace Innovation</li>
            <li>&gt; Future Missions</li>
          </ul>
        </motion.div>
      </section>

      {/* SECTION 5: INNOVATION CITY & EVENTS (400-500vh) */}
      <section className="h-screen flex flex-col justify-center p-8 md:p-24 relative">
        <div className="absolute top-1/4 right-20 max-w-md text-right">
          <div className="flex items-center justify-end gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-primary">Innovation City</h2>
            <Building2 className="w-10 h-10 text-brand-primary" />
          </div>
          <p className="text-lg text-white/70 mb-8">
            Smart cities, sustainable energy, and emerging technologies paving the way for a brighter tomorrow.
          </p>
        </div>

        {/* Event Cards */}
        <div className="absolute bottom-1/4 left-10 right-10 flex gap-6 overflow-x-auto pb-8 snap-x">
          {['Competitions', 'Workshops', 'Lectures', 'Exhibitions', 'Hackathons'].map((event, i) => (
            <motion.div
              key={event}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[280px] glass-panel p-6 rounded-2xl snap-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer group border-brand-primary/20 hover:border-brand-primary/60"
            >
              <Ticket className="w-8 h-8 text-brand-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">{event}</h3>
              <p className="text-white/50 text-sm">Participate and showcase your skills in the ultimate {event.toLowerCase()} arena.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 6: GRAND FINALE (500-600vh) */}
      <section className="h-screen flex flex-col items-center justify-center text-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <Sparkles className="w-16 h-16 text-brand-primary mb-6 animate-pulse" />
          <h2 className="text-5xl md:text-8xl font-black mb-6 text-glow">
            THE FUTURE STARTS HERE
          </h2>
          <a 
            href="https://techfest.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-4 mt-8 rounded-full bg-brand-primary text-brand-dark font-black text-xl hover:bg-white transition-colors duration-300 shadow-[0_0_30px_rgba(0,210,255,0.6)] hover:shadow-[0_0_50px_rgba(255,255,255,0.8)] hover:scale-105 transform inline-block"
          >
            REGISTER NOW
          </a>
        </motion.div>
      </section>

    </div>
  );
}
