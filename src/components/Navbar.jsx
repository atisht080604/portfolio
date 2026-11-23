import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ChevronRight } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', code: '00' },
  { id: 'about', label: 'About', code: '01' },
  { id: 'expertise', label: 'Expertise', code: '02' },
  { id: 'projects', label: 'Projects', code: '03' },
  { id: 'education', label: 'Education', code: '04' },
  { id: 'contact', label: 'Contact', code: '05' },
];

export default function Navbar({ activeSection, scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.offsetTop - offset;
      window.scrollTo({
        top: top >= 0 ? top : 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
            aria-label="Atish Thorat Portfolio Home"
          >
            <div className="w-9 h-9 rounded bg-[#141414] border border-white/15 flex items-center justify-center group-hover:border-accent-green transition-colors relative overflow-hidden">
              <span className="font-mono text-xs font-bold text-accent-green">AT</span>
              <div className="absolute inset-0 bg-accent-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-wider text-primary-text group-hover:text-accent-green transition-colors flex items-center gap-1.5">
                ATISH<span className="text-accent-green">//</span>SYSTEM
              </span>
              <span className="font-mono text-[10px] text-secondary-text tracking-widest uppercase">
                v2.6 // PUNE_NODE
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#141414]/80 border border-white/10 rounded-full px-4 py-1.5 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all relative ${
                    isActive
                      ? 'text-accent-green bg-white/5 font-semibold'
                      : 'text-secondary-text hover:text-primary-text hover:bg-white/5'
                  }`}
                >
                  <span className="opacity-40 mr-1 text-[10px]">{item.code}</span>
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-green shadow-[0_0_8px_#B7FF6B]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* System Status & Mobile Trigger */}
          <div className="flex items-center gap-4">
            {/* Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-white/10 font-mono text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
              </span>
              <span className="text-secondary-text text-[11px] tracking-wide">
                STATUS: <strong className="text-primary-text font-medium">ONLINE</strong>
              </span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#141414] border border-white/10 text-secondary-text hover:text-primary-text hover:border-accent-green transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-lg lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 w-4/5 max-w-sm h-full bg-[#101010] border-l border-white/10 p-6 flex flex-col justify-between transform transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-accent-green" />
                <span className="font-mono text-sm font-bold tracking-wider text-primary-text">
                  COMMAND_MENU
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded bg-white/5 text-secondary-text hover:text-primary-text"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded font-mono text-sm transition-all text-left ${
                      isActive
                        ? 'bg-accent-green/10 text-accent-green border-l-2 border-accent-green font-semibold'
                        : 'text-secondary-text hover:text-primary-text hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs opacity-50 text-accent-blue">{item.code}</span>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={14} className="opacity-40" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-secondary-text">
              <span>LOCATION:</span>
              <span className="text-primary-text">PUNE, INDIA</span>
            </div>
            <div className="flex items-center justify-between text-secondary-text">
              <span>SYSTEM:</span>
              <span className="text-accent-green flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green inline-block animate-pulse" />
                OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}