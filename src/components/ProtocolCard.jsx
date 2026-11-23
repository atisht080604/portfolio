import React, { useState } from 'react';
import { ShieldCheck, Activity, Globe, Server, Hash, ChevronRight, Info } from 'lucide-react';

export default function ProtocolCard({ protocol }) {
  const [showHandshake, setShowHandshake] = useState(false);

  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-white/25 transition-all group relative">
      <div>
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-sm font-bold px-2 py-0.5 rounded text-black"
                style={{ backgroundColor: protocol.color }}
              >
                {protocol.name}
              </span>
              <span className="font-mono text-[11px] text-secondary-text">
                {protocol.fullName}
              </span>
            </div>
            <span className="font-mono text-[10px] text-accent-blue block mt-1">
              {protocol.layer}
            </span>
          </div>

          <div className="text-right shrink-0">
            <span className="font-mono text-[10px] uppercase text-secondary-text block">
              DEFAULT PORT
            </span>
            <span className="font-mono text-xs font-semibold text-accent-green">
              {protocol.defaultPort}
            </span>
          </div>
        </div>

        {/* Port Note */}
        {protocol.portNote && (
          <p className="text-[11px] font-mono text-white/50 bg-black/40 px-2.5 py-1 rounded border border-white/5 mb-3">
            * {protocol.portNote}
          </p>
        )}

        {/* Purpose */}
        <p className="text-xs text-primary-text/90 leading-relaxed font-sans mb-3">
          {protocol.purpose}
        </p>

        {/* Key Characteristics */}
        <ul className="space-y-1 mb-4 text-[11px] text-secondary-text">
          {protocol.characteristics.map((char, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-accent-green font-bold">&rsaquo;</span>
              <span>{char}</span>
            </li>
          ))}
        </ul>

        {/* TCP Handshake Breakdown */}
        {protocol.handshake && (
          <div className="mb-4">
            <button
              onClick={() => setShowHandshake(!showHandshake)}
              className="text-xs font-mono text-accent-blue hover:text-white flex items-center gap-1.5 focus:outline-none"
            >
              <span>{showHandshake ? 'Hide' : 'Inspect'} 3-Way Handshake Flow</span>
              <ChevronRight size={14} className={`transform transition-transform ${showHandshake ? 'rotate-90' : ''}`} />
            </button>

            {showHandshake && (
              <div className="mt-2.5 p-3 rounded-lg bg-black/60 border border-accent-blue/30 space-y-2 font-mono text-[11px]">
                <div className="text-accent-green">1. {protocol.handshake.step1}</div>
                <div className="text-accent-blue">2. {protocol.handshake.step2}</div>
                <div className="text-primary-text">3. {protocol.handshake.step3}</div>
              </div>
            )}
          </div>
        )}

        {/* DHCP DORA Breakdown */}
        {protocol.doraProcess && (
          <div className="mb-4">
            <span className="text-[11px] font-mono text-accent-green block mb-1.5 font-semibold">
              DORA Exchange Sequence:
            </span>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
              {protocol.doraProcess.map((step, idx) => (
                <div key={idx} className="p-2 rounded bg-black/50 border border-white/5">
                  <span className="text-accent-green font-bold block">{step.step}</span>
                  <span className="text-secondary-text">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Example Usage */}
      <div className="pt-3 border-t border-white/10 font-mono text-[11px] text-secondary-text">
        <span className="text-white/40 block text-[10px] uppercase">PRACTICAL USAGE</span>
        <span className="text-primary-text/80">{protocol.exampleUsage}</span>
      </div>
    </div>
  );
}
