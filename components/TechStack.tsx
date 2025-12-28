
import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "React", "TypeScript", "Node.js", "Python", "PyTorch", 
  "Tailwind CSS", "Next.js", "OpenAI API", "AWS", "Docker", 
  "Figma", "PostgreSQL", "MongoDB", "Git"
];

const TechStack: React.FC = () => {
  return (
    <section className="py-12 border-t border-b border-black/5 dark:border-white/5 bg-offWhite dark:bg-black overflow-hidden relative z-20">
      <div className="flex w-full">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex whitespace-nowrap"
        >
          {/* Repeat the list twice to create seamless loop */}
          {[...skills, ...skills].map((skill, index) => (
            <div key={index} className="flex items-center mx-8">
              <span className="text-4xl md:text-6xl font-bold text-gray-800/80 dark:text-white/90 uppercase select-none">
                {skill}
              </span>
              <span className="ml-8 text-xl text-gray-800 dark:text-white/90">•</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Gradient fades on edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-offWhite dark:from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-offWhite dark:from-black to-transparent z-10" />
    </section>
  );
};

export default TechStack;
