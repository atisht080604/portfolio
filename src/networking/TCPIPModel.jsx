import React, { useState } from 'react';
import { tcpIpComparison } from '../data/osiLayers';
import { Globe, ArrowRight, Layers, CheckCircle2, Info } from 'lucide-react';

export default function TCPIPModel() {
  const [selectedLayer, setSelectedLayer] = useState(0);

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-accent-blue mb-1">
          <Globe size={14} />
          <span>MODULE 02 // INTERNET PROTOCOL SUITE</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-primary-text">
          How Internet Communication Works: TCP/IP Model
        </h3>
        <p className="text-sm text-secondary-text mt-1 max-w-3xl">
          While the OSI model is a 7-layer theoretical blueprint, the modern Internet runs on the pragmatic 4-layer TCP/IP (DoD) suite. Explore how OSI abstractions map onto real-world internet architecture.
        </p>
      </div>

      {/* Interactive Side-by-Side Comparison Mapping */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* TCP/IP 4-Layer Interactive Stack */}
        <div className="lg:col-span-5 space-y-3">
          <span className="font-mono text-xs uppercase text-secondary-text tracking-wider block mb-2">
            TCP/IP 4-LAYER IMPLEMENTATION STACK
          </span>

          {tcpIpComparison.map((layer, idx) => {
            const isSelected = selectedLayer === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedLayer(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#181818] border-accent-blue shadow-lg'
                    : 'bg-[#101010] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold text-black"
                      style={{ backgroundColor: layer.color }}
                    >
                      {layer.tcpIpNumber}
                    </span>
                    <span className="font-mono text-sm font-bold text-primary-text">
                      {layer.tcpIpLayer}
                    </span>
                  </div>
                  <ArrowRight
                    size={16}
                    className={`transition-transform duration-300 ${
                      isSelected ? 'text-accent-blue translate-x-1' : 'text-white/20'
                    }`}
                  />
                </div>
                <p className="text-xs text-secondary-text mt-2 font-sans">
                  {layer.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Layer OSI Mapping Explanation Card */}
        <div className="lg:col-span-7 bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <span className="font-mono text-xs text-accent-blue uppercase tracking-wider block">
                  LAYER MAPPING CONVERGENCE
                </span>
                <h4 className="text-xl font-bold text-primary-text mt-0.5">
                  {tcpIpComparison[selectedLayer].tcpIpLayer}
                </h4>
              </div>
              <span
                className="font-mono text-xs font-bold px-3 py-1 rounded-full text-black"
                style={{ backgroundColor: tcpIpComparison[selectedLayer].color }}
              >
                TCP/IP LAYER {tcpIpComparison[selectedLayer].tcpIpNumber}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="font-mono text-xs text-secondary-text uppercase block mb-2">
                  CORRESPONDING OSI REFERENCE LAYERS:
                </span>
                <div className="space-y-1.5">
                  {tcpIpComparison[selectedLayer].osiLayers.map((osi, oIdx) => (
                    <div
                      key={oIdx}
                      className="p-3 rounded-lg bg-black/40 border border-white/10 font-mono text-xs text-accent-green flex items-center gap-2"
                    >
                      <Layers size={14} className="shrink-0" />
                      <span>{osi}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-xs text-secondary-text uppercase block mb-1.5">
                  PROTOCOLS OPERATING AT THIS LAYER:
                </span>
                <p className="font-mono text-xs text-primary-text bg-[#161616] p-3 rounded-lg border border-white/5">
                  {tcpIpComparison[selectedLayer].protocols}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-secondary-text flex items-center gap-2">
            <Info size={14} className="text-accent-green shrink-0" />
            <span>
              TCP/IP abstracts session and presentation into user-space applications for agility.
            </span>
          </div>
        </div>
      </div>

      {/* Comprehensive Comparison Table */}
      <div className="bg-[#101010] border border-white/10 rounded-xl overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#181818] border-b border-white/10 text-secondary-text text-[11px] uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">TCP/IP Layer</th>
              <th className="py-3 px-4">Mapped OSI Layers</th>
              <th className="py-3 px-4">Primary PDU</th>
              <th className="py-3 px-4">Representative Protocols</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 font-bold text-accent-green">4. Application</td>
              <td className="py-3 px-4 text-secondary-text">L7 Application, L6 Presentation, L5 Session</td>
              <td className="py-3 px-4">User Data / Message</td>
              <td className="py-3 px-4 text-white/90">HTTP, HTTPS, DNS, SSH, DHCP, SMTP</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 font-bold text-accent-blue">3. Transport</td>
              <td className="py-3 px-4 text-secondary-text">L4 Transport</td>
              <td className="py-3 px-4">Segment (TCP) / Datagram (UDP)</td>
              <td className="py-3 px-4 text-white/90">TCP, UDP, QUIC</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 font-bold text-[#9B87FF]">2. Internet</td>
              <td className="py-3 px-4 text-secondary-text">L3 Network</td>
              <td className="py-3 px-4">Packet</td>
              <td className="py-3 px-4 text-white/90">IPv4, IPv6, ICMP, IPsec</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 font-bold text-[#FFB86C]">1. Network Access (Link)</td>
              <td className="py-3 px-4 text-secondary-text">L2 Data Link, L1 Physical</td>
              <td className="py-3 px-4">Frame &amp; Bits</td>
              <td className="py-3 px-4 text-white/90">Ethernet, Wi-Fi, MAC, Optical Fiber</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
