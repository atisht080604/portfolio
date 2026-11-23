import React from 'react';

export default function SectionHeading({
  index,
  tag = 'SYSTEM MODULE',
  title,
  subtitle,
  align = 'left',
  accentColor = '#B7FF6B'
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center mx-auto' : 'text-left'}`}>
      {/* Classified Header Metadata */}
      <div className={`flex items-center gap-3 mb-3 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <span className="font-mono text-xs tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 text-accent-green">
          {index}
        </span>
        <div className="h-px w-6 bg-white/20" />
        <span className="font-mono text-xs uppercase tracking-widest text-secondary-text">
          {tag}
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary-text uppercase">
        {title}
      </h2>

      {/* Subtitle / Description */}
      {subtitle && (
        <p className="mt-3 text-secondary-text max-w-2xl text-base sm:text-lg leading-relaxed font-normal">
          {subtitle}
        </p>
      )}

      {/* Cyber Deco Line */}
      <div className={`mt-5 flex items-center gap-2 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <div className="h-0.5 w-12 bg-accent-green" />
        <div className="h-0.5 w-3 bg-accent-blue" />
        <div className="h-0.5 w-24 bg-white/10" />
      </div>
    </div>
  );
}
