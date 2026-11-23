import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { skillCategories } from '../data/skills';
import { Cpu, ShieldCheck, Terminal, Layers, Info } from 'lucide-react';

export default function Expertise() {
  const [activeTab, setActiveTab] = useState('all');

  const displayedCategories = activeTab === 'all'
    ? skillCategories
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="expertise" className="py-24 bg-background border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          tag="TECHNICAL ARSENAL"
          title="Systems I Work With."
          subtitle="A categorized inventory of languages, frameworks, deep learning stacks, and networking principles."
        />

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-accent-green text-black shadow-lg'
                : 'bg-[#141414] border border-white/10 text-secondary-text hover:text-white hover:border-white/20'
            }`}
          >
            ALL ARSENAL MODULES
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
                activeTab === cat.id
                  ? 'bg-accent-blue text-black shadow-lg'
                  : 'bg-[#141414] border border-white/10 text-secondary-text hover:text-white hover:border-white/20'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayedCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-accent-green font-bold tracking-widest block">
                      {cat.code} // {cat.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary-text mt-0.5">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-secondary-text leading-relaxed font-sans mb-6">
                  {cat.description}
                </p>

                {/* Academic Learning Disclaimer for Networking */}
                {cat.disclaimer && (
                  <div className="mb-6 p-3 rounded-xl bg-accent-blue/5 border border-accent-blue/20 text-xs font-mono text-accent-blue flex items-center gap-2">
                    <Info size={14} className="shrink-0" />
                    <span>{cat.disclaimer}</span>
                  </div>
                )}

                {/* Skill Groups */}
                <div className="space-y-6">
                  {cat.groups.map((grp, gIdx) => (
                    <div key={gIdx} className="space-y-2.5">
                      <span className="font-mono text-xs uppercase tracking-wider text-secondary-text block">
                        {grp.subTitle}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {grp.skills.map((skill, sIdx) => (
                          <div
                            key={sIdx}
                            className={`px-3 py-2 rounded-xl font-mono text-xs border transition-all flex items-center gap-2 ${
                              skill.highlight
                                ? 'bg-[#181818] border-accent-green/30 text-primary-text hover:border-accent-green'
                                : 'bg-[#141414] border-white/5 text-secondary-text hover:text-primary-text hover:border-white/20'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                            <span className="font-medium text-white">{skill.name}</span>
                            <span className="text-[10px] text-white/40">({skill.level})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-secondary-text">
                <span>SYSTEM STATUS: COMPILED</span>
                <span className="text-accent-green font-semibold">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
