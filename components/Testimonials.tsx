
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Rajeev's ability to bridge the gap between complex AI logic and intuitive user interface is rare. He didn't just build our app; he engineered an experience.",
    author: "Aarav Sharma",
    role: "Senior Design Engineer, PixelPerfect",
    avatar: "AS"
  },
  {
    id: 2,
    content: "Working with Rajeev on the Bliz X Fitness app was a game-changer. His 'vibe coding' approach meant we moved from concept to MVP in record time. The results were beyond our expectations.",
    author: "Priya Nair",
    role: "Product Lead, BlizX",
    avatar: "PN"
  },
  {
    id: 3,
    content: "The Simplifier GPT he developed has become an essential tool for our students. It makes the most dense topics accessible and engaging.",
    author: "Dr. Amit Khurana",
    role: "AI Education Specialist",
    avatar: "AK"
  },
  {
    id: 4,
    content: "Precision, speed, and a deep understanding of modern tech stacks. Rajeev is the generalist builder every startup needs in their corner. Truly a powerhouse of talent.",
    author: "Rohan Gupta",
    role: "CTO, DevStream AI",
    avatar: "RG"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-32 px-6 md:px-12 bg-offWhite dark:bg-black transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-[11vw] sm:text-6xl md:text-8xl font-black tracking-tighter text-matteBlack dark:text-white leading-[0.9] md:leading-[0.8] mb-6">
              VOICES OF <br />
              <span className="text-neutral-400 dark:text-neutral-600">COLLABORATION.</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start md:items-end"
          >
            <div className="h-px w-24 bg-black/20 dark:bg-white/20 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm text-left md:text-right">
              Trusted by founders, <br />engineers, and educators.
            </p>
          </motion.div>
        </div>

        {/* Staggered Column Layout for Desktop */}
        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="break-inside-avoid relative p-10 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-2xl dark:hover:shadow-white/5 transition-all duration-500 group mb-8 inline-block w-full"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-black/5 dark:text-white/5 group-hover:text-blue-500/10 transition-colors duration-500" />
              
              <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed mb-10 relative z-10">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-matteBlack dark:bg-white flex items-center justify-center text-white dark:text-matteBlack font-bold text-xs">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-matteBlack dark:text-white uppercase tracking-wider">{t.author}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block px-6 py-3 rounded-full border border-dashed border-black/20 dark:border-white/20 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
            Let's build your story next
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
