
import React from 'react';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const capabilities = [
    { text: "Vibe Coding", fancy: true },
    { text: "&", fancy: false },
    { text: "Full Stack Development", fancy: true },
    { text: "Digital Product Prototyping", fancy: false },
    { text: "AI Integrations", fancy: true },
    { text: "& Automation", fancy: false },
    { text: "Prompt Engineering", fancy: true },
    { text: "Design Systems", fancy: false },
  ];

  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-transparent border-t border-black/5 dark:border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
           <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
            Capabilities
          </h2>
          <div className="h-px w-20 bg-black/10 dark:bg-white/10 mx-auto" />
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:gap-x-8 md:gap-y-6 text-center leading-tight">
          {capabilities.map((item, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className={`
                text-3xl md:text-5xl lg:text-6xl 
                ${item.fancy 
                  ? 'font-serif italic text-matteBlack dark:text-white font-medium' 
                  : 'font-sans font-light text-gray-400 dark:text-gray-500'
                }
              `}
            >
              {item.text}
            </motion.span>
          ))}
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
        >
          Specializing in building comprehensive digital solutions. From the logic of the backend to the intelligence of AI integration, I craft systems that work.
        </motion.p>
      </div>
    </section>
  );
};

export default Services;
