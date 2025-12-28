
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const Counter = ({ value, label, suffix = "+" }: { value: number; label: string, suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-matteBlack dark:text-white font-medium mb-2">
        {displayValue}{suffix}
      </span>
      <span className="text-xs md:text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {label}
      </span>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-transparent text-matteBlack dark:text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Heading Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif italic text-matteBlack dark:text-white mb-8 tracking-tight leading-[0.9]">
                Hi, I am <br/> Rajeev.
              </h2>
              
              <div className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-gray-800 dark:text-gray-200">
                I make 
                <span className="font-serif italic text-black dark:text-white font-medium ml-3 mr-1">Apps</span> 
                and 
                <span className="font-serif italic text-black dark:text-white font-medium ml-3">Websites</span>.
              </div>
            </motion.div>
          </div>

          {/* Description Column */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full pt-4 lg:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
               <div className="h-px w-24 bg-black/20 dark:bg-white/20" />
               
               <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  I navigate the intersection of design and engineering. As a full-stack developer and AI generalist, I don't just design interfaces; I engineer the intelligence behind them.
               </p>

               <p className="text-base md:text-lg text-gray-500 dark:text-gray-500 leading-relaxed">
                  Currently shipping experiments and building digital experiences that actually work for users, not just look good.
               </p>
            </motion.div>
          </div>

        </div>

        {/* Stats / Count Up - Centered Section */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full flex justify-center gap-16 md:gap-32 pt-16 mt-12 border-t border-black/10 dark:border-white/10"
        >
            <Counter value={10} label="Websites Made" suffix="+" />
            <Counter value={5} label="Apps Shipped" suffix="+" />
        </motion.div>

      </div>
    </section>
  );
};

export default About;
