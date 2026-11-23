import React from 'react';
import Terminal from '../components/Terminal';
import { ArrowDown, Terminal as TerminalIcon, ChevronRight } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      window.scrollTo({
        top: el.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-28 pb-20 flex flex-col justify-between relative overflow-hidden bg-background bg-grid-pattern"
    >
      {/* Decorative Cyber Background Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-green/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Abstract Node Network Lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" aria-hidden="true">
        <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="#B7FF6B" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="40%" y1="50%" x2="80%" y2="30%" stroke="#65C7FF" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="80%" y1="30%" x2="90%" y2="70%" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="10%" cy="20%" r="3" fill="#B7FF6B" />
        <circle cx="40%" cy="50%" r="4" fill="#65C7FF" />
        <circle cx="80%" cy="30%" r="3" fill="#B7FF6B" />
        <circle cx="90%" cy="70%" r="3" fill="#FFFFFF" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex-1 flex flex-col justify-center">
        {/* Classified Metadata Bar */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs text-secondary-text mb-8">
          <span className="px-2.5 py-1 rounded bg-[#141414] border border-white/10 text-accent-green font-semibold">
            PERSONAL PORTFOLIO / 2026
          </span>
          <span className="hidden sm:inline text-white/20">&bull;</span>
          <span className="px-2.5 py-1 rounded bg-[#141414] border border-white/10 text-primary-text">
            LOCATION: PUNE, INDIA
          </span>
          <span className="hidden sm:inline text-white/20">&bull;</span>
          <span className="px-2.5 py-1 rounded bg-[#141414] border border-white/10 text-accent-blue flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping" />
            SYSTEM STATUS: ONLINE
          </span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle, Description, Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-primary-text leading-none uppercase">
                ATISH<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green via-primary-text to-accent-blue">
                  THORAT.
                </span>
              </h1>

              {/* Subtitle Tech Tiers */}
              <div className="mt-5 space-y-1 font-mono text-sm sm:text-base font-bold tracking-wider">
                <span className="text-accent-green block">
                  FULL-STACK DEVELOPER
                </span>
                <span className="text-accent-blue block">
                  AI/ML ENTHUSIAST
                </span>
                <span className="text-secondary-text block">
                  SYSTEMS &amp; CLOUD EXPLORER
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-secondary-text max-w-xl leading-relaxed font-sans font-normal">
              &ldquo;Building intelligent applications, exploring distributed infrastructure, and connecting technology with real-world solutions.&rdquo;
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-3.5 rounded-xl bg-accent-green text-black font-mono text-xs sm:text-sm font-bold hover:bg-accent-green/90 transition-all flex items-center gap-2 shadow-[0_0_25px_-5px_rgba(183,255,107,0.4)] group"
              >
                <span>EXPLORE PROJECTS</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-3.5 rounded-xl bg-[#141414] border border-white/15 text-primary-text font-mono text-xs sm:text-sm font-bold hover:border-accent-green hover:text-accent-green transition-all"
              >
                CONTACT ME
              </button>
            </div>
          </div>

          {/* Right Column: High-tech Animated Terminal */}
          <div className="lg:col-span-5">
            <Terminal />
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-12 flex justify-between items-center text-secondary-text font-mono text-xs">
        <button
          onClick={() => scrollTo('about')}
          className="flex items-center gap-2 hover:text-accent-green transition-colors focus:outline-none"
        >
          <ArrowDown size={14} className="animate-bounce text-accent-green" />
          <span>SCROLL DOWN // 01 SUBJECT PROFILE</span>
        </button>

        <span className="hidden sm:inline text-[11px] text-white/30">
          SYSTEM: ONLINE // PUNE NODE
        </span>
      </div>
    </section>
  );
}