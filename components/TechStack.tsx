
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillDetails = [
  { name: "React", desc: "Modern UI Library" },
  { name: "TypeScript", desc: "Type-Safe JavaScript" },
  { name: "Node.js", desc: "Server-side Runtime" },
  { name: "Python", desc: "AI & Backend Logic" },
  { name: "PyTorch", desc: "Deep Learning Framework" },
  { name: "Tailwind CSS", desc: "Utility-First Styling" },
  { name: "Next.js", desc: "Fullstack Framework" },
  { name: "OpenAI API", desc: "LLM & AI Integration" },
  { name: "AWS", desc: "Cloud Infrastructure" },
  { name: "Docker", desc: "Containerization" },
  { name: "Figma", desc: "UX/UI Design Tool" },
  { name: "PostgreSQL", desc: "Relational Database" },
  { name: "MongoDB", desc: "NoSQL Database" },
  { name: "Git", desc: "Version Control" }
];

// Fix: Explicitly type SkillItem as React.FC to allow React-specific props like 'key' and resolve TypeScript assignment errors
const SkillItem: React.FC<{ name: string; desc: string }> = ({ name, desc }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex items-center mx-8 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`text-4xl md:text-6xl font-bold uppercase select-none transition-all duration-300 cursor-default ${
        isHovered 
          ? 'text-blue-500 scale-105' 
          : 'text-gray-800/80 dark:text-white/90'
      }`}>
        {name}
      </span>
      <span className="ml-8 text-xl text-gray-800 dark:text-white/90">•</span>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 5, x: '-50%' }}
            className="absolute -top-12 left-[calc(50%-1rem)] -translate-x-1/2 px-4 py-2 bg-matteBlack dark:bg-white text-white dark:text-matteBlack rounded-lg whitespace-nowrap z-30 pointer-events-none shadow-xl border border-white/10 dark:border-black/10"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest">{desc}</p>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-matteBlack dark:bg-white rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TechStack: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section 
      className="py-12 border-t border-b border-black/5 dark:border-white/5 bg-offWhite dark:bg-black overflow-hidden relative z-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex w-full">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          // We use style to control pause to avoid frame jumps when state updates
          style={{ 
            display: 'flex', 
            whiteSpace: 'nowrap',
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
          className="flex"
        >
          {/* Repeat the list twice to create seamless loop */}
          {[...skillDetails, ...skillDetails].map((skill, index) => (
            <SkillItem key={`${skill.name}-${index}`} name={skill.name} desc={skill.desc} />
          ))}
        </motion.div>
      </div>
      
      {/* Gradient fades on edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-offWhite dark:from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-offWhite dark:from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default TechStack;
