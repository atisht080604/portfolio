import React, { useState } from 'react';
import { protocolsData } from '../data/protocols';
import ProtocolCard from '../components/ProtocolCard';
import { Network, Filter, Info } from 'lucide-react';

const categories = ['All', 'Transport', 'Core Services', 'Web Services', 'Diagnostics & Control', 'Address Resolution'];

export default function Protocols() {
  const [selectedCat, setSelectedCat] = useState('All');

  const filtered = selectedCat === 'All'
    ? protocolsData
    : protocolsData.filter(p => p.category.toLowerCase().includes(selectedCat.toLowerCase()) || p.category === selectedCat);

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-accent-green mb-1">
          <Network size={14} />
          <span>MODULE 05 // NETWORK PROTOCOLS DOSSIER</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-primary-text">
          Protocols Behind Communication: Transmission, Services &amp; Control
        </h3>
        <p className="text-sm text-secondary-text mt-1 max-w-3xl">
          Standardized communication rules that define syntax, timing, synchronization, and error control. Explore deep mechanics of TCP handshakes, DHCP DORA cycles, and DNS hierarchies.
        </p>

        {/* Port Clarification Note */}
        <div className="mt-4 p-3 rounded-xl bg-accent-green/5 border border-accent-green/20 text-xs font-mono text-secondary-text flex items-center gap-2">
          <Info size={15} className="text-accent-green shrink-0" />
          <span>
            <strong className="text-primary-text">Architectural Note:</strong> Stated port numbers (e.g. HTTP 80, SSH 22, DNS 53) are IANA default assignments; protocol services can be bound to arbitrary non-standard ports.
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        <span className="font-mono text-xs text-secondary-text mr-2 flex items-center gap-1">
          <Filter size={12} /> FILTER:
        </span>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
              selectedCat === cat
                ? 'bg-accent-green text-black font-bold shadow'
                : 'bg-[#141414] border border-white/10 text-secondary-text hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Protocol Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((protocol) => (
          <ProtocolCard key={protocol.id} protocol={protocol} />
        ))}
      </div>
    </div>
  );
}
