import React from 'react';
import OSILayer from '../components/OSILayer';
import { Layers } from 'lucide-react';

export default function OSIModel() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-accent-green mb-1">
          <Layers size={14} />
          <span>MODULE 01 // THE SEVEN LAYERS</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-primary-text">
          The Open Systems Interconnection (OSI) Reference Model
        </h3>
        <p className="text-sm text-secondary-text mt-1 max-w-3xl">
          A conceptual framework developed by ISO dividing network communication into seven distinct abstraction layers, from high-level application data down to physical transmission waveforms.
        </p>
      </div>

      <OSILayer />
    </div>
  );
}
