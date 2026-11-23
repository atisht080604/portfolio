import React from 'react';
import { ExternalLink, Github, ArrowUpRight, Cpu, Layers, Sparkles } from 'lucide-react';

export default function ProjectCard({ project, onOpenModal }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-accent-green/50 transition-all duration-300 group relative hover:shadow-[0_0_30px_-5px_rgba(183,255,107,0.15)]">
      {/* Top Metadata */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="font-mono text-xs font-bold text-accent-green bg-accent-green/10 px-2.5 py-1 rounded-md border border-accent-green/20">
            {project.code}
          </span>
          <span className="font-mono text-[11px] text-accent-blue tracking-wider">
            {project.badge}
          </span>
        </div>

        {/* Title & Headline */}
        <h3 className="text-xl sm:text-2xl font-bold text-primary-text group-hover:text-accent-green transition-colors mb-2">
          {project.title}
        </h3>
        <p className="font-mono text-xs text-accent-blue/90 mb-3">
          {project.headline}
        </p>

        {/* Short Description */}
        <p className="text-sm text-secondary-text leading-relaxed font-sans mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Key Metrics / Highlights */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-2 py-3 px-3.5 mb-5 rounded-xl bg-black/40 border border-white/5 font-mono text-xs">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <span className="block text-[10px] text-secondary-text truncate uppercase">{m.label}</span>
                <span className="text-primary-text font-semibold text-xs mt-0.5 block">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 5).map((tech, idx) => (
            <span
              key={idx}
              className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-primary-text"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-secondary-text">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-3">
        <button
          onClick={() => onOpenModal(project)}
          className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs font-semibold text-primary-text hover:text-accent-green hover:border-accent-green/40 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <span>VIEW DOSSIER</span>
          <ArrowUpRight size={14} />
        </button>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-secondary-text hover:text-white hover:border-white/30 transition-colors"
          title="Source Code"
          aria-label={`${project.title} GitHub repository`}
        >
          <Github size={16} />
        </a>

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-secondary-text hover:text-accent-green hover:border-accent-green/40 transition-colors"
            title="Live Deployment"
            aria-label={`${project.title} live demo`}
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  );
}
