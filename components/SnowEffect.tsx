
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake } from 'lucide-react';

interface SnowflakeProps {
  id: number;
}

const SnowflakeItem: React.FC<SnowflakeProps> = ({ id }) => {
  // Randomize start position and animation properties for higher visibility
  const startX = useMemo(() => Math.random() * 100, []);
  const duration = useMemo(() => 4 + Math.random() * 8, []); // Slightly faster falls
  const delay = useMemo(() => Math.random() * 12, []);
  const size = useMemo(() => 3 + Math.random() * 9, []); // Larger range: 3px to 12px
  const drift = useMemo(() => (Math.random() - 0.5) * 200, []); // More horizontal movement
  const opacity = useMemo(() => 0.5 + Math.random() * 0.5, []); // Higher opacity: 0.5 to 1.0

  return (
    <motion.div
      initial={{ y: -50, x: `${startX}vw`, opacity: 0 }}
      animate={{ 
        y: '110vh', 
        x: `${startX + (drift / 10)}vw`,
        opacity: [0, opacity, opacity, 0],
        rotate: 360
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      style={{
        position: 'fixed',
        top: 0,
        zIndex: 100,
        width: size,
        height: size,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '50%',
        filter: 'blur(0.5px)', // Sharper flakes for better visibility
        pointerEvents: 'none',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)', // Subtle glow to make them "pop"
      }}
    />
  );
};

const SnowEffect: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [flakes, setFlakes] = useState<number[]>([]);

  useEffect(() => {
    if (isActive) {
      // Increased count to 100 for a more immersive snowfall
      setFlakes(Array.from({ length: 100 }, (_, i) => i));
    } else {
      setFlakes([]);
    }
  }, [isActive]);

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsActive(!isActive)}
          className={`
            w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500
            ${isActive 
              ? 'bg-blue-500 text-white ring-4 ring-blue-100 dark:ring-blue-900/30' 
              : 'bg-white dark:bg-zinc-800 text-zinc-400 hover:text-blue-500 border border-zinc-200 dark:border-zinc-700'
            }
          `}
          title={isActive ? "Stop Snowfall" : "Winter Mode"}
        >
          <Snowflake className={`w-6 h-6 ${isActive ? 'animate-spin-slow' : ''}`} />
          
          {/* Subtle pulse for the button when inactive */}
          {!isActive && (
            <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping pointer-events-none" />
          )}
        </motion.button>
        
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-white/50 dark:bg-black/50 backdrop-blur-md px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">
          Winter
        </span>
      </div>

      <AnimatePresence>
        {isActive && (
          <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {flakes.map((id) => (
              <SnowflakeItem key={id} id={id} />
            ))}
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </>
  );
};

export default SnowEffect;
