
import React from 'react';
import { motion } from 'framer-motion';
import ParticleOrbitEffect from './ui/ParticleOrbitEffect';

const Hero: React.FC = () => {
  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo('#work', {
        offset: -85,
        duration: 1.5
      });
    } else {
      const element = document.getElementById('work');
      if (element) {
        const headerOffset = 85;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="min-h-screen w-full relative overflow-hidden bg-transparent pt-32 md:pt-12 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        
        {/* Left Column: Text (Order 1 on mobile) */}
        <div className="flex flex-col justify-center items-start text-left order-2 md:order-1 relative z-20">
             <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2, duration: 0.8 }}
                 className="mb-6 md:mb-8 pl-1"
             >
                <p className="text-[10px] md:text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-[0.3em] bg-black/5 dark:bg-white/10 px-4 py-2 rounded-full inline-block backdrop-blur-sm border border-black/5 dark:border-white/5">
                    Vibe Coder • Full Stack Developer
                </p>
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-[18vw] md:text-[10.5vw] font-black tracking-tighter text-matteBlack dark:text-white leading-[0.8] mb-8 md:mb-10 origin-left"
            >
                RAJEEV<br /> 
                <span className="text-neutral-400 dark:text-neutral-600">RANJAN</span>
            </motion.h1>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="pl-1 pt-4"
            >
                <a 
                    href="#work"
                    onClick={handleScrollToWork}
                    className="hand-drawn-button group scale-90 md:scale-100 origin-left"
                >
                    {/* Highlighter Stroke */}
                    <svg className="highlight" viewBox="0 0 200 60" preserveAspectRatio="none">
                        <path d="M10,30 Q50,10 100,30 T190,30" />
                    </svg>
                    
                    {/* Among Us Character */}
                    <svg className="button-cosm" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 20 C 30 5, 70 5, 70 20 L 70 80 C 70 95, 60 95, 60 80 L 60 70 L 40 70 L 40 80 C 40 95, 30 95, 30 80 Z" fill="currentColor"/>
                      <rect x="42" y="22" width="34" height="18" rx="8" fill="#a5f3fc" stroke="black" strokeWidth="2"/>
                      <path d="M25 35 Q 20 35 20 45 L 20 65 Q 20 75 25 75 Z" fill="currentColor" opacity="0.8"/>
                    </svg>

                    <span className="relative z-10">Explore My Universe</span>
                </a>
            </motion.div>
        </div>

        {/* Right Column: Framed Image (Order 1 on mobile) */}
        <div className="relative w-full aspect-[4/5] max-w-[280px] md:max-w-[320px] mx-auto md:ml-auto md:mr-0 group perspective-1000 order-1 md:order-2">
            
            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0,
                  y: [0, -12, 0] 
                }}
                transition={{ 
                  opacity: { delay: 0.6, duration: 1 },
                  scale: { delay: 0.6, duration: 1 },
                  rotateY: { delay: 0.6, duration: 1 },
                  y: { 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }
                }}
                className="relative w-full h-full z-10"
            >
                <div className="absolute inset-0 z-0 scale-125">
                   <ParticleOrbitEffect 
                      particleCount={35}
                      radius={110}
                      intensity={1.4}
                      followMouse={true}
                      particleSize={1}
                      colorRange={[200, 260]} 
                   />
                </div>

                <div className="relative w-full h-full p-4 z-10">
                    <div className="absolute inset-0 border-[1.5px] border-black/10 dark:border-white/10 rounded-[2.5rem] transform rotate-3 scale-105 transition-transform group-hover:rotate-6 group-hover:scale-110 duration-700" />
                    <div className="absolute inset-0 border-[1.5px] border-black/10 dark:border-white/10 rounded-[2.5rem] transform -rotate-3 scale-105 transition-transform group-hover:-rotate-6 group-hover:scale-110 duration-700" />
                    
                    <div className="relative w-full h-full overflow-hidden rounded-[2rem] bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-xl transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)]">
                        <img 
                            src="https://i.postimg.cc/QNbFbQtB/photo_6176793992998095630_x.jpg"
                            alt="Rajeev Ranjan"
                            className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
                    </div>
                </div>
            </motion.div>
            
            <motion.div 
              animate={{ 
                scale: [0.8, 1, 0.8],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/20 dark:bg-white/10 blur-xl rounded-full"
            />
        </div>

      </div>
    </section>
  );
};

export default Hero;
