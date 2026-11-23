import React from 'react';
import CodeTerminal from '../components/CodeTerminal';
import { Terminal, Shield, Activity } from 'lucide-react';

export default function Troubleshooting() {
  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-accent-green mb-1">
          <Terminal size={14} />
          <span>MODULE 06 // TROUBLESHOOTING COMMAND CENTER</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-primary-text">
          Diagnose. Analyze. Resolve: CLI Diagnostics &amp; Packet Inspection
        </h3>
        <p className="text-sm text-secondary-text mt-1 max-w-3xl">
          Practical diagnostic tools used to inspect local IP parameters, trace routing hops, examine listening sockets, and dissect raw network frames down to the bitstream.
        </p>
      </div>

      <CodeTerminal />
    </div>
  );
}
