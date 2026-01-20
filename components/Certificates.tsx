
import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import ParticleOrbitEffect from './ui/ParticleOrbitEffect';

const certificates = [
  {
    id: 1,
    title: "AI Workplace Proficiency",
    issuer: "Superhuman AI Academy",
    date: "Nov 4, 2025",
    imageUrl: "https://i.postimg.cc/Y2PhwCJQ/tinywow_sh_cf_86522674_1.png",
  },
  {
    id: 2,
    title: "Build AI Agents For Marketing",
    issuer: "WsCube Tech",
    date: "Nov 20, 2025",
    imageUrl: "https://i.postimg.cc/Cxq82q5M/tinywow_Rajeev_Ranjan_WS_2025_M_24227_Certificate_(1)_86522620_1.jpg",
  },
  {
    id: 3,
    title: "Generative AI Mastermind",
    issuer: "Outskill",
    date: "Completed",
    imageUrl: "https://i.postimg.cc/52SFxyVX/tinywow-outskill-86508504-1.jpg",
  },
  {
    id: 4,
    title: "The Ultimate AI Power Weekend",
    issuer: "IIDE - The Digital School",
    date: "Nov 22 & 23",
    imageUrl: "https://i.postimg.cc/6QzCVNTd/tinywow-iide-certificate-86791162-1.jpg",
  }
];

const Certificates: React.FC = () => {
  return (
    <section id="certificates" className="py-24 px-6 md:px-12 bg-transparent border-t border-black/5 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="mb-16 text-center w-full"
        >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-matteBlack dark:text-white mb-4">
              Certifications
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-6">
              Validated milestones in AI and modern development.
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-widest animate-pulse">
                <span>Swipe to explore</span>
                <MoveRight className="w-3 h-3" />
            </div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <div 
            className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative flex-shrink-0 w-[75vw] md:w-[22vw] snap-center"
              >
                <div className="relative aspect-[4/3] p-2 mb-6">
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <ParticleOrbitEffect 
                          particleCount={10}
                          radius={60}
                          intensity={0.8}
                      />
                    </div>

                    <div className="absolute inset-0 border-[1px] border-black/5 dark:border-white/5 rounded-2xl transform rotate-2 group-hover:rotate-4 transition-transform duration-500" />
                    <div className="absolute inset-0 border-[1px] border-black/5 dark:border-white/5 rounded-2xl transform -rotate-2 group-hover:-rotate-4 transition-transform duration-500" />
                    
                    <div className="relative w-full h-full overflow-hidden rounded-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                      <img 
                        src={cert.imageUrl} 
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 opacity-60 pointer-events-none" />
                    </div>
                </div>

                <div className="px-2">
                  <h3 className="text-lg font-bold text-matteBlack dark:text-white mb-1 leading-tight group-hover:text-blue-500 transition-colors">{cert.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-3">{cert.issuer}</p>
                  <div className="pt-3 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-zinc-500 font-medium">{cert.date}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* End Padding Spacer */}
            <div className="flex-shrink-0 w-8 md:w-32" aria-hidden="true" />
          </div>
        </div>

        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.6, duration: 1 }}
           className="mt-16 flex flex-col items-center justify-center gap-6"
        >
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-zinc-700" />
            <p className="text-2xl md:text-3xl font-serif italic text-gray-400 dark:text-zinc-500 tracking-tight">
                ...and many more
            </p>
        </motion.div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
};

export default Certificates;
