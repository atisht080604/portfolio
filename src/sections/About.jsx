import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { User, ShieldCheck, MapPin, GraduationCap, Code2, Sparkles, CheckCircle2, FileText, Download } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          tag="SUBJECT PROFILE"
          title="Beyond the Interface."
          subtitle="An MCA student passionate about building full-stack applications, intelligent AI solutions, and solving complex technical problems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Classified Dossier Profile Card (Left) */}
          <div className="lg:col-span-5 bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-2xl">
            {/* Top Classified Stamp */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary-text font-bold">
                  CLASSIFIED DOSSIER // 01-AT
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-accent-green/10 border border-accent-green/30 text-accent-green">
                SECURITY: UNCLASSIFIED
              </span>
            </div>

            {/* Field Metadata Grid */}
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-secondary-text">NAME:</span>
                <span className="text-primary-text font-bold text-sm">ATISH THORAT</span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-secondary-text">ROLE:</span>
                <span className="text-accent-green font-semibold">DEVELOPER / MCA STUDENT</span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-secondary-text">EDUCATION:</span>
                <span className="text-primary-text font-medium">MCA (2025–2027) // SPPU</span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-secondary-text">LOCATION:</span>
                <span className="text-primary-text font-medium">PUNE, MAHARASHTRA, INDIA</span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-secondary-text block text-[10px]">PRIMARY FOCUS:</span>
                <span className="text-accent-blue font-bold block">SOFTWARE DEVELOPMENT &amp; FULL-STACK</span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-secondary-text block text-[10px]">SECONDARY FOCUS:</span>
                <span className="text-accent-green font-bold block">ARTIFICIAL INTELLIGENCE &amp; MACHINE LEARNING</span>
              </div>
            </div>

            {/* Resume Download Action Button */}
            <a
              href="/Atish_Thorat_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full py-3 px-4 rounded-xl bg-accent-green text-black font-mono text-xs font-bold hover:bg-accent-green/90 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <FileText size={15} />
              <span>DOWNLOAD RESUME (PDF)</span>
              <Download size={14} />
            </a>

            {/* Quick Specialization Tags */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <span className="font-mono text-[10px] uppercase text-secondary-text tracking-wider block mb-2">
                ACTIVE TECHNICAL SPHERES
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {['Full-Stack Development', 'Artificial Intelligence', 'Machine Learning', 'Computer Vision', 'REST APIs', 'Technical Troubleshooting'].map((sphere, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-primary-text"
                  >
                    {sphere}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Narrative & Personal Story */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Quote Box */}
            <div className="p-6 rounded-2xl bg-[#141414] border border-accent-green/20 space-y-3 relative">
              <span className="font-mono text-xs text-accent-green uppercase tracking-widest block font-bold">
                PERSONAL STATEMENT
              </span>
              <p className="text-base sm:text-lg text-primary-text font-sans leading-relaxed italic">
                &ldquo;I am an MCA student passionate about software development, artificial intelligence, and computer networking. I enjoy building full-stack applications, exploring AI-powered solutions, understanding network infrastructure, and solving technical problems.&rdquo;
              </p>
            </div>

            {/* The Bridge Between Software Architecture & Intelligent Systems */}
            <div className="space-y-4 text-secondary-text leading-relaxed font-sans text-sm sm:text-base">
              <h4 className="font-mono text-base font-bold text-primary-text uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={18} className="text-accent-blue" />
                The Synergy of Full-Stack Architecture &amp; Intelligent Models
              </h4>

              <p>
                Modern software engineering is evolving rapidly beyond static interfaces and routine CRUD applications. By combining full-stack development with artificial intelligence and deep learning, applications can perceive, classify, predict, and automate real-world workflows in real time.
              </p>

              <p>
                My focus centers on architecting clean, maintainable systems from reactive frontend interfaces (React, Vite, Tailwind CSS) down to robust backend services (Node.js, Express, Python, Flask, MongoDB, MySQL). Integrating deep learning inference models—such as quantized MobileNetV3 vision backbones or multimodal LLMs—allows me to deliver solutions that solve genuine community and user challenges.
              </p>
            </div>

            {/* Core Capability Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              {[
                'Full-Stack Web Engineering',
                'Deep Learning Vision Models',
                'RESTful Microservice Design',
                'Database Modeling & Querying',
                'Real-Time WebSocket Streams',
                'Methodical Root Cause Analysis'
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#121212] border border-white/5 flex items-center gap-2.5 text-primary-text">
                  <CheckCircle2 size={15} className="text-accent-green shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}