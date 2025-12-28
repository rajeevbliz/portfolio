import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 px-6 md:px-12 border-t border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-4">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-serif italic text-matteBlack dark:text-white"
            >
              My Design <br/> Philosophy
            </motion.h2>
          </div>

          <div className="md:col-span-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <p className="text-xl md:text-3xl leading-snug font-light text-gray-700 dark:text-gray-200">
                I focus on <span className="text-matteBlack dark:text-white font-medium">practical, purposeful design</span>: ideas that solve real user problems and scale into products.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div>
                  <h3 className="text-matteBlack dark:text-white font-bold uppercase tracking-widest mb-4 text-sm">Design Thinking</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    I combine design thinking with fast experiments to validate concepts quickly. Function precedes form, but form elevates function.
                  </p>
                </div>
                <div>
                   <h3 className="text-matteBlack dark:text-white font-bold uppercase tracking-widest mb-4 text-sm">Business Outcomes</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                     Design must serve business outcomes. Every pixel is a decision, and every interaction is an opportunity to create value.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Philosophy;