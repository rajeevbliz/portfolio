
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Smartphone, Globe, MoveRight, ChevronLeft, ChevronRight, X, AlertCircle, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import ParticleOrbitEffect from './ui/ParticleOrbitEffect';

const projects: Project[] = [
  {
    id: 5,
    title: "Zenith",
    category: "Lifestyle • Habit Tracker",
    description: "A minimalist habit tracker designed for dopamine management, helping users build long-term discipline through structured routine.",
    imageUrl: "https://i.postimg.cc/SRdGFjH9/Black-White-Minimalist-Initials-Logo.png", 
    multiLinks: [
      { label: "Visit in Web", url: "https://zenithflow.netlify.app/", type: 'web' },
      { label: "Download App", url: "#", type: 'mobile' }
    ],
    comingSoon: false
  },
  {
    id: 1,
    title: "Bliz X Fitness",
    category: "Mobile App • Health",
    description: "A comprehensive fitness tracking application accessible to everyone. Designed to democratize personal health data.",
    imageUrl: "https://i.postimg.cc/DwnTKy6p/11zon-resized.png", 
    link: "https://drive.google.com/file/d/1IV2aD8bLHHP2G-MsWQpw8NgEEKFREi7e/view?usp=drive_link",
    comingSoon: false
  },
  {
    id: 4,
    title: "Simplifier 1.0",
    category: "Custom GPT • Education",
    description: "A specialized AI assistant designed to help students understand complex topics through simple, digestible explanations.",
    imageUrl: "https://placehold.co/800x600/FFF4E6/c2410c?text=Simplifier+1.0&font=roboto",
    link: "https://chatgpt.com/g/g-6919e843136081919a06251b3856c1a0-simplifer-1-0",
    comingSoon: false
  },
  {
    id: 2,
    title: "Neural Note",
    category: "AI Productivity",
    description: "Context-aware note taking system that organizes your thoughts automatically.",
    imageUrl: "https://placehold.co/600x800/1e1e1e/a855f7?text=Neural+Note&font=roboto",
    comingSoon: true
  },
  {
    id: 3,
    title: "DevFlow",
    category: "DevTools",
    description: "Automated PR review assistant for small teams.",
    imageUrl: "https://placehold.co/600x800/0f172a/22c55e?text=DevFlow&font=roboto",
    comingSoon: true
  }
];

interface ProjectCardContentProps {
  project: Project;
  onDevClick: () => void;
}

const ProjectCardContent: React.FC<ProjectCardContentProps> = ({ project, onDevClick }) => {
  const categories = project.category.split('•').map(c => c.trim());
  const isGlowProject = project.id === 1 || project.id === 4 || project.id === 5;
  
  const glowStyle = project.id === 1 
    ? { "--glow-start": "#00b7ff", "--glow-end": "#ff30ff" } as React.CSSProperties
    : project.id === 4 
    ? { "--glow-start": "#f97316", "--glow-end": "#fbbf24" } as React.CSSProperties
    : project.id === 5
    ? { "--glow-start": "#8b5cf6", "--glow-end": "#3b82f6" } as React.CSSProperties
    : {};

  return (
    <div className="w-[85vw] md:w-[45vw] flex-shrink-0 snap-center">
      <div className="relative group perspective-1000 mb-8">
          <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <ParticleOrbitEffect 
                particleCount={20}
                radius={80}
                intensity={1.1}
                followMouse={true}
                particleSize={1}
             />
          </div>

          <div className="relative w-full aspect-video p-3 z-10">
              <div className="absolute inset-0 border-[1px] border-black/10 dark:border-white/10 rounded-2xl transform rotate-1 group-hover:rotate-3 transition-transform duration-700" />
              <div className="absolute inset-0 border-[1px] border-black/10 dark:border-white/10 rounded-2xl transform -rotate-1 group-hover:-rotate-3 transition-transform duration-700" />
              
              <div 
                className={`relative w-full h-full overflow-hidden rounded-xl transition-all duration-500 group-hover:shadow-2xl ${isGlowProject ? 'glow-card shadow-lg p-1' : 'bg-gray-100 dark:bg-zinc-900 border border-black/10 dark:border-white/10'}`}
                style={glowStyle}
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg z-10 bg-white dark:bg-zinc-900 flex items-center justify-center">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {project.comingSoon && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-white/10 text-white z-20">
                      Coming Soon
                    </div>
                  )}
                  
                  {!project.comingSoon && project.link && (
                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-matteBlack dark:bg-white text-white dark:text-matteBlack rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0 z-30 shadow-xl">
                      {project.category.includes('Mobile') ? <Smartphone className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 pointer-events-none" />
                </div>
              </div>
          </div>
      </div>
      
      <div className="flex flex-col gap-2 px-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl md:text-2xl font-bold text-matteBlack dark:text-white group-hover:underline decoration-2 underline-offset-4 transition-all">{project.title}</h3>
          {!project.comingSoon && !project.multiLinks && (
            <span className="text-[10px] border border-black/20 dark:border-white/20 px-2 py-0.5 rounded text-gray-600 dark:text-gray-400 uppercase font-black">
               {project.link?.endsWith('.apk') ? 'Download' : 'Visit'}
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, i) => (
            <span key={i} className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded-sm">
              {cat}
            </span>
          ))}
        </div>
        
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-medium">
          {project.description}
        </p>

        {!project.comingSoon && project.multiLinks && (
          <div className="mt-6 flex flex-wrap gap-4">
             {project.multiLinks.map((ml, i) => {
               const isDevLink = ml.label === "Download App" && project.title === "Zenith";
               return (
                 <a 
                   key={i} 
                   href={isDevLink ? "#" : ml.url} 
                   target={isDevLink ? "_self" : "_blank"}
                   rel="noopener noreferrer"
                   className="flex-1 flex items-center justify-center gap-2 border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 px-4 py-3 rounded-xl text-sm font-bold text-matteBlack dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                   onClick={(e) => {
                     e.stopPropagation();
                     if (isDevLink) {
                       e.preventDefault();
                       onDevClick();
                     }
                   }}
                 >
                    {ml.type === 'web' || ml.type === 'desktop' ? <Globe className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                    {ml.label}
                 </a>
               );
             })}
          </div>
        )}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showDevModal, setShowDevModal] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.5 : clientWidth * 0.5;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="text-5xl md:text-8xl font-black tracking-tighter text-matteBlack dark:text-white"
          >
            Work
          </motion.h2>
          
          <div className="flex flex-col items-start md:items-end gap-6 mt-6 md:mt-0">
            <div className="flex gap-4">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                aria-label="Next Project"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="text-gray-500 dark:text-gray-400 max-sm text-sm font-bold uppercase tracking-widest">
                Engineering solutions with precision.
              </p>
              <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-tighter animate-pulse">
                  <span>Swipe or scroll</span>
                  <MoveRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Added left padding spacer */}
            <div className="flex-shrink-0 w-2 md:w-1" aria-hidden="true" />
            
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {project.link ? (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block h-full"
                  >
                    <ProjectCardContent project={project} onDevClick={() => setShowDevModal(true)} />
                  </a>
                ) : (
                  <div className={`block h-full ${project.comingSoon ? 'grayscale opacity-70' : ''}`}>
                    <ProjectCardContent project={project} onDevClick={() => setShowDevModal(true)} />
                  </div>
                )}
              </motion.div>
            ))}
            
            {/* Added right padding spacer */}
            <div className="flex-shrink-0 w-8 md:w-32" aria-hidden="true" />
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden mt-4">
             <motion.div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${scrollProgress}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
             />
          </div>
          
          <style dangerouslySetInnerHTML={{ __html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
          `}} />
        </div>
      </div>

      {/* Under Development Modal */}
      <AnimatePresence>
        {showDevModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDevModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 shadow-2xl border border-black/5 dark:border-white/5 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full -translate-y-16 translate-x-16" />
              
              <button 
                onClick={() => setShowDevModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-gray-400 dark:text-gray-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-8">
                  <AlertCircle className="w-10 h-10 text-blue-500" />
                </div>
                
                <h3 className="text-3xl font-black tracking-tighter text-matteBlack dark:text-white mb-4">
                  UNDER DEVELOPMENT
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  The Zenith mobile application is currently being refined for the ultimate experience. 
                  <span className="block mt-4 font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest text-[11px]">
                    Good news: You can already use the web version!
                  </span>
                </p>

                <div className="flex flex-col gap-3 w-full">
                  <a 
                    href="https://zenithflow.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-blue-500 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Visit Web App
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setShowDevModal(false)}
                    className="w-full py-4 bg-matteBlack dark:bg-white text-white dark:text-matteBlack rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:opacity-90 transition-opacity"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
