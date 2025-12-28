
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, Smartphone, LucideIcon } from 'lucide-react';
import { Project } from '../types';
import ParticleOrbitEffect from './ui/ParticleOrbitEffect';

const projects: Project[] = [
  {
    id: 1,
    title: "Bliz X Fitness",
    category: "Mobile App • Health",
    description: "A comprehensive fitness tracking application accessible to everyone. Designed to democratize personal health data. Update coming soon.",
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
  actionLabel: string;
  ActionIcon: LucideIcon;
}

const ProjectCardContent: React.FC<ProjectCardContentProps> = ({ project, actionLabel, ActionIcon }) => {
  const categories = project.category.split('•').map(c => c.trim());
  const isGlowProject = project.id === 1 || project.id === 4;
  
  // Project-specific glow colors
  const glowStyle = project.id === 1 
    ? { "--glow-start": "#00b7ff", "--glow-end": "#ff30ff" } as React.CSSProperties
    : project.id === 4 
    ? { "--glow-start": "#f97316", "--glow-end": "#fbbf24" } as React.CSSProperties
    : {};

  return (
    <>
      <div className="relative group perspective-1000 mb-8">
          {/* Background Halo Animation for each card */}
          <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <ParticleOrbitEffect 
                particleCount={25}
                radius={100}
                intensity={1.2}
                followMouse={true}
                particleSize={1}
             />
          </div>

          <div className="relative w-full aspect-video p-3 z-10">
              {/* Animated Frames matching Hero */}
              <div className="absolute inset-0 border-[1px] border-black/10 dark:border-white/10 rounded-2xl transform rotate-2 group-hover:rotate-4 transition-transform duration-700" />
              <div className="absolute inset-0 border-[1px] border-black/10 dark:border-white/10 rounded-2xl transform -rotate-2 group-hover:-rotate-4 transition-transform duration-700" />
              
              <div 
                className={`relative w-full h-full overflow-hidden rounded-xl transition-all duration-500 group-hover:shadow-2xl ${isGlowProject ? 'glow-card shadow-lg p-1' : 'bg-gray-100 dark:bg-zinc-900 border border-black/10 dark:border-white/10'}`}
                style={glowStyle}
              >
                {/* The actual image container needs to be relative to the glow-card frame */}
                <div className="relative w-full h-full overflow-hidden rounded-lg z-10">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/800x600/f5f5f5/a3a3a3?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                  
                  {project.comingSoon && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-white/10 text-white z-20">
                      Coming Soon
                    </div>
                  )}
                  
                  {!project.comingSoon && (
                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-matteBlack dark:bg-white text-white dark:text-matteBlack rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0 z-30 shadow-xl">
                      <ActionIcon className="w-5 h-5" />
                    </div>
                  )}

                  {/* Inner Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10 pointer-events-none" />
                </div>
              </div>
          </div>
      </div>
      
      <div className="flex flex-col gap-2 px-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-matteBlack dark:text-white group-hover:underline decoration-2 underline-offset-4 transition-all">{project.title}</h3>
          {!project.comingSoon && (
            <span className="text-[10px] border border-black/20 dark:border-white/20 px-2 py-0.5 rounded text-gray-600 dark:text-gray-400 uppercase font-black">
              {actionLabel}
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
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 font-medium">
          {project.description}
        </p>
      </div>
    </>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <motion.h2 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="text-4xl md:text-7xl font-black tracking-tighter text-matteBlack dark:text-white"
          >
            Work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 dark:text-gray-400 mt-4 md:mt-0 max-w-sm md:text-right text-sm font-bold uppercase tracking-widest"
          >
            Engineering solutions with precision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {projects.map((project, index) => {
            const isLocalApk = project.link?.endsWith('.apk');
            const isDriveLink = project.link?.includes('drive.google.com');
            const isApk = isLocalApk || (isDriveLink && project.category.includes('Mobile App'));
            const isApp = project.category.includes('Mobile App');
            const fileName = isLocalApk ? project.link?.split('/').pop() : undefined;
            
            let actionLabel = 'Visit Site';
            let ActionIcon = ArrowUpRight;

            if (isApk) {
              actionLabel = 'Download';
              ActionIcon = Download;
            } else if (isApp) {
              actionLabel = 'Open App';
              ActionIcon = Smartphone;
            } else if (project.category.includes('GPT')) {
              actionLabel = 'Try GPT';
            }
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                {!project.comingSoon && project.link ? (
                  <a 
                    href={project.link} 
                    target={isLocalApk ? "_self" : "_blank"} 
                    rel="noopener noreferrer" 
                    className="block h-full cursor-pointer"
                    download={isLocalApk ? fileName : undefined}
                  >
                    <ProjectCardContent 
                      project={project} 
                      actionLabel={actionLabel} 
                      ActionIcon={ActionIcon} 
                    />
                  </a>
                ) : (
                  <div className="block h-full">
                    <ProjectCardContent 
                      project={project} 
                      actionLabel={actionLabel} 
                      ActionIcon={ActionIcon} 
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
