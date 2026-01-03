
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, GitPullRequest, Star, FolderGit2 } from 'lucide-react';

const repositories = [
  {
    name: "Aura-UI",
    description: "A generative UI library that creates accessible components based on natural language descriptions using AI.",
    language: "TypeScript",
    color: "#3178c6",
    stars: 24,
    link: "https://github.com/rajeevbliz/aura-ui"
  },
  {
    name: "Neural-Notes-Engine",
    description: "The core NLP engine behind context-aware note organization, utilizing vector embeddings for semantic search.",
    language: "Python",
    color: "#3572A5",
    stars: 18,
    link: "https://github.com/rajeevbliz/neural-notes"
  },
  {
    name: "Zenith-Tracker-Source",
    description: "Source code for the Zenith Habit Tracker. Features a custom local-first synchronization engine.",
    language: "Next.js",
    color: "#000000",
    stars: 12,
    link: "https://github.com/rajeevbliz/zenith-tracker"
  },
  {
    name: "BlizX-Automation-Core",
    description: "Internal microservices responsible for handling business logic and AI-driven workflow automations.",
    language: "Go",
    color: "#00ADD8",
    stars: 9,
    link: "https://github.com/rajeevbliz/blizx-core"
  }
];

const GitHubSection: React.FC = () => {
  return (
    <section id="github" className="py-24 px-6 md:px-12 bg-white dark:bg-[#050505] border-t border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-6">
              <Github className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">Open Source & Experiments</span>
            </div>
            
            <div className="flex items-center gap-6 mb-8 group">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-matteBlack dark:text-white leading-none">
                SEE THE <br /> <span className="text-neutral-400 dark:text-neutral-600">SOURCE CODE.</span>
              </h2>
              <motion.div
                initial={{ rotate: -10, scale: 0.9, opacity: 0 }}
                whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                whileHover={{ rotate: 12, scale: 1.1 }}
                viewport={{ once: true }}
                className="hidden sm:block text-matteBlack/10 dark:text-white/10 transition-colors group-hover:text-matteBlack dark:group-hover:text-white"
              >
                <Github size={120} strokeWidth={1.5} />
              </motion.div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              My GitHub is a playground for experimental AI integrations, custom UI libraries, and full-stack architecture. I believe in building in public and contributing back to the community.
            </p>
            
            <motion.a 
              href="https://github.com/rajeevbliz" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-matteBlack dark:bg-white text-white dark:text-matteBlack px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-xl transition-all duration-300 group"
            >
              Follow on GitHub
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Simulated GitHub Stats Card */}
            <div className="relative bg-neutral-50 dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/20 blur-[60px] rounded-full -translate-y-12 translate-x-12" />
              
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white dark:border-neutral-800 shadow-lg">
                    <img 
                      src="https://i.postimg.cc/QNbFbQtB/photo_6176793992998095630_x.jpg" 
                      alt="GitHub Avatar" 
                      className="w-full h-full object-cover"
                    />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-matteBlack dark:text-white">Rajeev Ranjan</h3>
                    <p className="text-sm text-gray-500 font-mono">@rajeevbliz</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                 <div className="p-4 rounded-2xl bg-white dark:bg-black/40 border border-black/5 dark:border-white/5 hover:border-blue-500/30 transition-colors">
                    <Code2 className="w-5 h-5 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold text-matteBlack dark:text-white">12+</div>
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Repositories</div>
                 </div>
                 <div className="p-4 rounded-2xl bg-white dark:bg-black/40 border border-black/5 dark:border-white/5 hover:border-purple-500/30 transition-colors">
                    <Star className="w-5 h-5 text-purple-500 mb-2" />
                    <div className="text-2xl font-bold text-matteBlack dark:text-white">50+</div>
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Stars Earned</div>
                 </div>
              </div>

              {/* Contribution Activity Hint */}
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    <span>Contribution Activity</span>
                    <span className="text-blue-500">Live Heatmap</span>
                 </div>
                 <div className="flex gap-1 overflow-hidden">
                    {[...Array(24)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-full h-8 rounded-sm ${
                          i % 3 === 0 ? 'bg-green-500/40 dark:bg-green-500/60' : 
                          i % 5 === 0 ? 'bg-green-500/20 dark:bg-green-500/30' : 
                          i % 2 === 0 ? 'bg-green-500/10 dark:bg-green-500/10' : 
                          'bg-neutral-200 dark:bg-neutral-800'
                        }`} 
                        style={{ opacity: 0.3 + (Math.random() * 0.7) }}
                      />
                    ))}
                 </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* New Repositories List Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-12 border-t border-black/5 dark:border-white/5"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-matteBlack dark:text-white tracking-tight">Featured Repositories</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">A selection of my most impactful open-source contributions.</p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-black/5 dark:bg-white/5 mx-12 mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repositories.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-black/5 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.color }} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{repo.language}</span>
                  </div>
                </div>

                <h4 className="text-2xl font-bold text-matteBlack dark:text-white mb-3 group-hover:text-blue-500 transition-colors">
                  {repo.name}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
                  {repo.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitPullRequest className="w-3 h-3" />
                      Forkable
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
