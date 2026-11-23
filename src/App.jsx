import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Expertise from './sections/Expertise';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact';
import { useActiveSection } from './hooks/useActiveSection';

const sectionIds = [
  'home',
  'about',
  'expertise',
  'projects',
  'education',
  'contact'
];

export default function App() {
  const { activeSection, scrolled } = useActiveSection(sectionIds, 120);

  return (
    <div className="min-h-screen bg-background text-primary-text font-sans selection:bg-accent-green/20 selection:text-accent-green relative">
      {/* Global Navigation */}
      <Navbar activeSection={activeSection} scrolled={scrolled} />

      {/* Main Sections */}
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Terminal Footer */}
      <Footer />
    </div>
  );
}