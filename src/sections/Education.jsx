import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { educationRecords } from '../data/education';
import { GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          tag="ACADEMIC RECORD"
          title="Formal Education &amp; Coursework."
          subtitle="A verified chronological timeline of collegiate degrees in computer applications and science."
        />

        <div className="max-w-4xl mx-auto space-y-8 relative">
          {/* Vertical Connecting Line */}
          <div className="absolute top-4 bottom-4 left-4 sm:left-8 w-0.5 bg-white/10" />

          {educationRecords.map((edu, idx) => (
            <div key={idx} className="relative pl-12 sm:pl-20">
              {/* Timeline Node Badge */}
              <div
                className="absolute left-1 sm:left-5 top-1.5 w-6 h-6 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center"
                style={{ backgroundColor: edu.statusColor }}
              >
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>

              {/* Education Card */}
              <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/25 transition-all shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4">
                  <div>
                    <span
                      className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full inline-block text-black mb-2"
                      style={{ backgroundColor: edu.statusColor }}
                    >
                      {edu.period}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary-text">
                      {edu.degree}
                    </h3>
                  </div>

                  <span className="font-mono text-xs text-secondary-text">
                    {edu.status}
                  </span>
                </div>

                {/* Institution & Location */}
                <div className="space-y-1 mb-4 font-mono text-xs sm:text-sm">
                  <p className="text-accent-green font-semibold">
                    {edu.institution}
                  </p>
                  <p className="text-secondary-text flex items-center gap-1.5">
                    <GraduationCap size={14} className="shrink-0" />
                    <span>{edu.university}</span>
                    <span className="text-white/20">|</span>
                    <MapPin size={13} className="shrink-0" />
                    <span>{edu.location}</span>
                  </p>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-secondary-text leading-relaxed font-sans mb-6">
                  {edu.summary}
                </p>

                {/* Highlights */}
                <div>
                  <span className="font-mono text-[10px] uppercase text-secondary-text tracking-wider block mb-2">
                    KEY CURRICULUM FOCUS AREAS:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {edu.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-primary-text flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-accent-green shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}