import React, { useState } from 'react';
import { osiLayers, encapsulationSteps } from '../data/osiLayers';
import { ChevronDown, ChevronUp, ArrowDown, ArrowUp, Layers, Cpu, Shield, Network } from 'lucide-react';

export default function OSILayer() {
  const [expandedLayer, setExpandedLayer] = useState(7); // Layer 7 open by default
  const [encapsulationMode, setEncapsulationMode] = useState('encapsulate'); // 'encapsulate' | 'decapsulate'
  const [activeStep, setActiveStep] = useState(0);

  const toggleLayer = (num) => {
    setExpandedLayer(expandedLayer === num ? null : num);
  };

  const stepsList = encapsulationMode === 'encapsulate' 
    ? encapsulationSteps 
    : [...encapsulationSteps].reverse();

  return (
    <div className="space-y-10">
      {/* Interactive 7-Layer Vertical Stack */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-xs text-secondary-text">
          <span>7-LAYER ARCHITECTURAL STACK (ISO/IEC 7498-1)</span>
          <span>CLICK LAYER TO EXPAND DETAILS</span>
        </div>

        {osiLayers.map((layer) => {
          const isExpanded = expandedLayer === layer.number;
          return (
            <div
              key={layer.number}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'bg-[#151515] border-accent-green/40 shadow-xl'
                  : 'bg-[#101010] border-white/10 hover:border-white/20'
              }`}
            >
              {/* Header / Clickable Bar */}
              <button
                onClick={() => toggleLayer(layer.number)}
                className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none transition-colors"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold text-black shrink-0"
                    style={{ backgroundColor: layer.color }}
                  >
                    L{layer.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm sm:text-base font-bold text-primary-text">
                        {layer.name} Layer
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-secondary-text hidden sm:inline-block">
                        PDU: {layer.pdu}
                      </span>
                    </div>
                    <p className="text-xs text-secondary-text line-clamp-1 mt-0.5">
                      {layer.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs hidden md:inline-block text-secondary-text">
                    {layer.protocols.slice(0, 3).join(', ')}...
                  </span>
                  <div className={`p-1.5 rounded-md bg-white/5 text-secondary-text transition-transform duration-300 ${isExpanded ? 'rotate-180 text-accent-green' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </button>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-white/10 space-y-5 animate-fadeIn">
                  {/* Encapsulation note */}
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-xs flex items-center gap-2 text-white/90">
                    <span className="text-accent-green font-bold">ENCAPSULATION ROLE:</span>
                    <span>{layer.encapsulationDetail}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Responsibilities */}
                    <div>
                      <h5 className="font-mono text-xs uppercase tracking-wider text-accent-green mb-2.5 flex items-center gap-1.5">
                        <Layers size={13} />
                        Core Responsibilities
                      </h5>
                      <ul className="space-y-1.5 text-xs text-secondary-text font-sans">
                        {layer.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-accent-green mt-0.5">&bull;</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Protocols & Devices */}
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-mono text-xs uppercase tracking-wider text-accent-blue mb-2 flex items-center gap-1.5">
                          <Network size={13} />
                          Protocols &amp; Standards
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {layer.protocols.map((proto, idx) => (
                            <span
                              key={idx}
                              className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-primary-text"
                            >
                              {proto}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-mono text-xs uppercase tracking-wider text-primary-text mb-2 flex items-center gap-1.5">
                          <Cpu size={13} />
                          Network Hardware / Components
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {layer.devices.map((dev, idx) => (
                            <span
                              key={idx}
                              className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/40 border border-white/10 text-secondary-text"
                            >
                              {dev}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Encapsulation & Decapsulation Flow Interactive Visualizer */}
      <div className="bg-[#101010] border border-white/10 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h4 className="font-mono text-base font-bold text-primary-text flex items-center gap-2">
              PACKET ENCAPSULATION &amp; DECAPSULATION FLOW
            </h4>
            <p className="text-xs text-secondary-text mt-1">
              Observe how data payloads are wrapped with transport, network, and data link headers across layers.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#181818] p-1 rounded-xl border border-white/10 font-mono text-xs">
            <button
              onClick={() => {
                setEncapsulationMode('encapsulate');
                setActiveStep(0);
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                encapsulationMode === 'encapsulate'
                  ? 'bg-accent-green text-black font-bold shadow-md'
                  : 'text-secondary-text hover:text-white'
              }`}
            >
              <ArrowDown size={14} />
              <span>TX: Encapsulation</span>
            </button>
            <button
              onClick={() => {
                setEncapsulationMode('decapsulate');
                setActiveStep(0);
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                encapsulationMode === 'decapsulate'
                  ? 'bg-accent-blue text-black font-bold shadow-md'
                  : 'text-secondary-text hover:text-white'
              }`}
            >
              <ArrowUp size={14} />
              <span>RX: Decapsulation</span>
            </button>
          </div>
        </div>

        {/* Step Flow List */}
        <div className="mt-6 space-y-3">
          {stepsList.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                activeStep === idx
                  ? 'bg-[#181818] border-accent-green/50 shadow-lg'
                  : 'bg-[#121212] border-white/5 hover:border-white/15 opacity-80'
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded-md text-black"
                  style={{ backgroundColor: step.color }}
                >
                  Step 0{idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-primary-text">
                      {step.stage}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-secondary-text">
                      {step.layer}
                    </span>
                  </div>
                  <p className="text-xs text-secondary-text mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="font-mono text-xs text-right shrink-0">
                <span className="text-[10px] text-secondary-text block">PDU STATE</span>
                <span className="text-accent-green font-semibold">{step.pdu}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
