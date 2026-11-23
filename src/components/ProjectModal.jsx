import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertTriangle, Layers, Cpu, ShieldCheck } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#121212] border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 bg-[#161616]/95 backdrop-blur-md px-6 py-4 border-b border-white/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-accent-green bg-accent-green/10 px-2.5 py-1 rounded border border-accent-green/20">
              {project.code}
            </span>
            <span className="font-mono text-sm text-secondary-text">CLASSIFIED CASE STUDY</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 text-secondary-text hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close project modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Headline */}
          <div>
            <span className="font-mono text-xs text-accent-blue tracking-widest block uppercase mb-1">
              {project.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-text mb-2">
              {project.title}
            </h2>
            <p className="text-base text-accent-green font-mono">
              {project.headline}
            </p>
          </div>

          {/* Quick Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-center">
              {project.metrics.map((m, idx) => (
                <div key={idx}>
                  <span className="block text-[10px] text-secondary-text uppercase">{m.label}</span>
                  <span className="text-base font-bold text-accent-green mt-0.5 block">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#161616] border border-white/10 space-y-2">
              <span className="font-mono text-xs text-red-400 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                <AlertTriangle size={14} /> Problem Statement
              </span>
              <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#161616] border border-white/10 space-y-2">
              <span className="font-mono text-xs text-accent-green font-bold uppercase tracking-wider block flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Engineered Solution
              </span>
              <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Breakdown */}
          <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent-blue font-bold flex items-center gap-2">
              <Layers size={15} /> System Architecture &amp; Data Pipeline
            </h4>
            <p className="text-xs sm:text-sm text-secondary-text leading-relaxed font-sans">
              {project.architecture}
            </p>
          </div>

          {/* Model Specification (If present) */}
          {project.modelDetails && (
            <div className="p-5 rounded-xl bg-[#161616] border border-accent-green/20 space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-accent-green font-bold flex items-center gap-2">
                <Cpu size={15} /> Model Specification: {project.modelDetails.name}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-2.5 rounded bg-black/50 border border-white/5">
                  <span className="text-[10px] text-secondary-text block">VERSION</span>
                  <span className="text-primary-text font-bold">{project.modelDetails.version}</span>
                </div>
                <div className="p-2.5 rounded bg-black/50 border border-white/5">
                  <span className="text-[10px] text-secondary-text block">BACKBONE</span>
                  <span className="text-primary-text font-bold">{project.modelDetails.backbone}</span>
                </div>
                <div className="p-2.5 rounded bg-black/50 border border-white/5">
                  <span className="text-[10px] text-secondary-text block">INPUT TENSOR</span>
                  <span className="text-primary-text font-bold">{project.modelDetails.inputSize}</span>
                </div>
                <div className="p-2.5 rounded bg-black/50 border border-white/5">
                  <span className="text-[10px] text-secondary-text block">LATENCY</span>
                  <span className="text-accent-green font-bold">{project.modelDetails.inferenceLatency}</span>
                </div>
              </div>

              {/* Civic Categories */}
              {project.categories && (
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-secondary-text block uppercase mb-1.5">
                    Trained Classification Classes:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-primary-text flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Features List */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-primary-text font-bold mb-3 flex items-center gap-2">
              <ShieldCheck size={15} className="text-accent-green" /> Key Capabilities &amp; Feature Set
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#161616] border border-white/5 flex items-start gap-2.5 text-xs text-secondary-text">
                  <span className="text-accent-green mt-0.5 font-bold">&bull;</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Mitigations */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-primary-text font-bold mb-3 flex items-center gap-2">
              <AlertTriangle size={15} className="text-accent-blue" /> Engineering Challenges &amp; Solutions
            </h4>
            <div className="space-y-2">
              {project.challenges.map((challenge, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[#161616] border border-white/5 text-xs text-secondary-text leading-relaxed">
                  <span className="font-mono text-accent-blue font-bold mr-2">CHALLENGE 0{idx + 1}:</span>
                  {challenge}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Full Breakdown */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-secondary-text font-bold mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs px-3 py-1 rounded-md bg-white/5 border border-white/10 text-primary-text"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-primary-text hover:text-accent-green hover:border-accent-green/40 transition-colors font-mono text-xs flex items-center gap-2"
              >
                <Github size={15} />
                <span>GITHUB REPOSITORY</span>
              </a>

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-accent-green text-black font-mono text-xs font-bold hover:bg-accent-green/90 transition-colors flex items-center gap-2"
                >
                  <ExternalLink size={15} />
                  <span>LAUNCH PREVIEW</span>
                </a>
              )}
            </div>

            <span className="font-mono text-[11px] text-secondary-text">
              CLASSIFIED DOSSIER // AUTHORIZED VIEW
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
