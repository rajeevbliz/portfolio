
import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, GitBranch, Zap, BrainCircuit, Building2, Palette } from 'lucide-react';

const pipelineItems = [
  {
    title: "BlizX Infotech",
    tag: "Business • Service",
    description: "Currently working on providing AI-based services and automation solutions to business owners.",
    icon: <Building2 className="w-6 h-6" />
  },
  {
    title: "Neural Note",
    tag: "AI Productivity",
    description: "Context-aware note taking system that organizes your thoughts automatically.",
    icon: <BrainCircuit className="w-6 h-6" />
  },
  {
    title: "DevFlow",
    tag: "DevTools",
    description: "Automated PR review assistant for small teams.",
    icon: <GitBranch className="w-6 h-6" />
  },
  {
    title: "Aura UI",
    tag: "Design Tools",
    description: "A generative UI library that creates accessible components based on natural language descriptions.",
    icon: <Palette className="w-6 h-6" />
  }
];

const Pipeline: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-neutral-900/50 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-black/5 dark:bg-white/5 rounded-full">
                <FlaskConical className="w-6 h-6 text-matteBlack dark:text-white" />
            </div>
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-matteBlack dark:text-white">In The Pipeline</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Experiments, concepts, and products in active development.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pipelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group p-8 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 shadow-sm dark:shadow-none ${index === 0 ? 'border-l-4 border-l-blue-500 dark:border-l-blue-400' : ''}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-gray-400 group-hover:text-matteBlack dark:group-hover:text-white transition-colors">
                    {item.icon}
                </div>
                <span className="text-[10px] uppercase tracking-widest bg-black/5 dark:bg-white/5 px-2 py-1 rounded text-gray-500 dark:text-gray-400 border border-black/5 dark:border-white/5">
                    {index === 0 ? 'Current Focus' : item.tag}
                </span>
              </div>
              
              <h3 className="text-xl font-medium mb-2 text-matteBlack dark:text-white">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <span className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></span>
                {index === 0 ? 'Active' : 'In Development'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pipeline;
