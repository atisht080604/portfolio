import React from 'react';
import { ArrowUp, Terminal, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { socialLinks } from '../data/socialLinks';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-primary-text relative overflow-hidden">
      {/* Subtle top scanline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-green/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Identity Column */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Terminal size={20} className="text-accent-green" />
              <span className="font-mono text-base font-bold tracking-widest text-primary-text">
                ATISH THORAT
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs text-secondary-text tracking-wide">
              <p className="text-accent-green font-semibold">FULL-STACK DEVELOPER</p>
              <p className="text-accent-blue font-semibold">AI/ML ENTHUSIAST</p>
              <p className="text-primary-text font-semibold">SYSTEMS &amp; CLOUD EXPLORER</p>
            </div>

            <p className="text-secondary-text text-sm max-w-md leading-relaxed font-sans">
              Classified cybersecurity intelligence &amp; developer portfolio dossier. Architecting reactive web applications, deep learning inference pipelines, and scalable backend microservices.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-white/10 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-secondary-text">
                SYSTEM STATUS: <span className="text-accent-green font-bold">ONLINE</span>
              </span>
              <span className="text-white/20">|</span>
              <span className="text-secondary-text">PUNE, IN</span>
            </div>
          </div>

          {/* Navigation Quick Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent-blue mb-4 flex items-center gap-2">
              <span>//</span> DIRECTORY
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              {[
                { label: '00 // Home', href: '#home' },
                { label: '01 // Subject Profile', href: '#about' },
                { label: '02 // Technical Arsenal', href: '#expertise' },
                { label: '03 // Project Archive', href: '#projects' },
                { label: '04 // Academic Record', href: '#education' },
                { label: '05 // Communication', href: '#contact' }
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-secondary-text hover:text-accent-green transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Channels */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent-green mb-4 flex items-center gap-2">
              <span>//</span> CHANNELS
            </h4>
            <ul className="space-y-3 font-mono text-xs">
              {socialLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-secondary-text hover:text-primary-text group transition-colors"
                  >
                    <span className="p-1 rounded bg-[#141414] border border-white/10 group-hover:border-accent-green group-hover:text-accent-green transition-colors">
                      {item.name === 'GitHub' && <Github size={13} />}
                      {item.name === 'LinkedIn' && <Linkedin size={13} />}
                      {item.name === 'Email' && <Mail size={13} />}
                      {item.name === 'Phone' && <Phone size={13} />}
                      {item.name === 'Location' && <MapPin size={13} />}
                    </span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-secondary-text">
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} ATISH THORAT.</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:inline">ALL SYSTEMS NOMINAL</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-white/30 tracking-widest">
              SHA256: 7222922a...0d58
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#141414] border border-white/10 text-secondary-text hover:text-accent-green hover:border-accent-green transition-all"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
              <span>TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}