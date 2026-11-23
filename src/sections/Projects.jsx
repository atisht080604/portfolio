import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { projects } from '../data/projects';
import { Filter } from 'lucide-react';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'AI & ML', 'Full-Stack', 'Real-Time'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => {
        if (activeCategory === 'AI & ML') return p.badge.includes('AI') || p.badge.includes('VISION');
        if (activeCategory === 'Full-Stack') return p.badge.includes('FULL-STACK') || p.badge.includes('COMMERCE');
        if (activeCategory === 'Real-Time') return p.badge.includes('REAL-TIME');
        return true;
      });

  return (
    <section id="projects" className="py-24 bg-background border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          tag="PROJECT ARCHIVE"
          title="Classified Projects &amp; Case Studies."
          subtitle="Engineered systems spanning deep learning computer vision, real-time WebSocket state synchronization, and scalable web architectures."
        />

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <span className="font-mono text-xs text-secondary-text mr-2 flex items-center gap-1.5">
            <Filter size={13} /> CLASSIFICATION:
          </span>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all ${
                activeCategory === cat
                  ? 'bg-accent-green text-black font-bold shadow-lg'
                  : 'bg-[#141414] border border-white/10 text-secondary-text hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>

        {/* Modal Inspector */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}