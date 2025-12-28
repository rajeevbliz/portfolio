import React from 'react';
import { EvervaultCardDemo } from './EvervaultCardDemo';
import { motion } from 'framer-motion';

const VibeCoding: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-black border-t border-black/5 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
                 <span className="inline-block mb-6 text-sm font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-400">
                    Core Competency
                 </span>
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-matteBlack dark:text-white mb-6">
                    Vibe Coder
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    It's more than just syntax; it's about flow, intuition, and leverage. I use advanced AI tools to accelerate the bridge between thought and execution, creating interfaces that feel alive and responsive.
                </p>
                <div className="flex gap-4">
                  <div className="h-2 w-20 bg-green-500 rounded-full animate-pulse" />
                  <div className="h-2 w-10 bg-blue-500 rounded-full animate-pulse delay-75" />
                  <div className="h-2 w-5 bg-purple-500 rounded-full animate-pulse delay-150" />
                </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:w-1/2 w-full flex justify-center"
            >
                <EvervaultCardDemo />
            </motion.div>
        </div>
    </section>
  )
}
export default VibeCoding;