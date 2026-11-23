import React, { useState, useMemo } from 'react';
import { calculateSubnet } from '../utils/subnetCalculator';
import { Calculator, CheckCircle2, AlertCircle, Copy, Check, RefreshCw, Info } from 'lucide-react';

const presets = [
  { label: 'LAN Home (192.168.1.1/24)', ip: '192.168.1.1', cidr: 24 },
  { label: 'Cloud VPC (10.0.0.1/16)', ip: '10.0.0.1', cidr: 16 },
  { label: 'Subnet Slice (172.16.5.10/28)', ip: '172.16.5.10', cidr: 28 },
  { label: 'P2P Link /31 (RFC 3021)', ip: '192.168.100.0', cidr: 31 },
  { label: 'Loopback Host /32', ip: '127.0.0.1', cidr: 32 },
];

export default function SubnetCalculator() {
  const [ip, setIp] = useState('192.168.1.50');
  const [cidr, setCidr] = useState(24);
  const [copiedKey, setCopiedKey] = useState(null);

  const result = useMemo(() => {
    return calculateSubnet(ip, cidr);
  }, [ip, cidr]);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const applyPreset = (preset) => {
    setIp(preset.ip);
    setCidr(preset.cidr);
  };

  return (
    <div className="bg-[#101010] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent-green/10 border border-accent-green/20 text-accent-green">
            <Calculator size={22} />
          </div>
          <div>
            <h3 className="font-mono text-lg font-bold text-primary-text flex items-center gap-2">
              IPV4 SUBNET CALCULATOR <span className="text-xs px-2 py-0.5 rounded bg-accent-green/10 text-accent-green border border-accent-green/20">RFC-COMPLIANT</span>
            </h3>
            <p className="text-xs text-secondary-text">
              Real-time binary logic calculation with /31 (RFC 3021) and /32 host boundary support.
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset)}
              className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-[#181818] border border-white/10 text-secondary-text hover:text-accent-green hover:border-accent-green/40 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6">
        {/* IP Address Input */}
        <div className="md:col-span-7">
          <label className="block font-mono text-xs uppercase tracking-wider text-secondary-text mb-2">
            IPv4 Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="e.g. 192.168.1.1"
              className="w-full bg-[#181818] border border-white/15 rounded-xl px-4 py-3 font-mono text-base text-primary-text focus:outline-none focus:border-accent-green transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-secondary-text">
              DOTTED DECIMAL
            </div>
          </div>
        </div>

        {/* CIDR Prefix Slider & Number */}
        <div className="md:col-span-5">
          <div className="flex items-center justify-between mb-2">
            <label className="font-mono text-xs uppercase tracking-wider text-secondary-text">
              CIDR Prefix (/{cidr})
            </label>
            <span className="font-mono text-xs text-accent-blue font-semibold">
              MASK: {result.success ? result.subnetMask : 'Calculating...'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="32"
              value={cidr}
              onChange={(e) => setCidr(Number(e.target.value))}
              className="flex-1 accent-accent-green cursor-pointer"
            />
            <input
              type="number"
              min="0"
              max="32"
              value={cidr}
              onChange={(e) => {
                const val = Math.min(32, Math.max(0, Number(e.target.value) || 0));
                setCidr(val);
              }}
              className="w-16 bg-[#181818] border border-white/15 rounded-lg px-2 py-2 font-mono text-center text-sm text-primary-text focus:outline-none focus:border-accent-green"
            />
          </div>
        </div>
      </div>

      {/* Errors or Results */}
      {result.error ? (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 font-mono text-xs">
          <AlertCircle size={18} className="shrink-0" />
          <span>{result.error}</span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Classification & Special Note */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 font-mono text-xs text-accent-blue">
              TYPE: {result.classification}
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-secondary-text">
              CLASS: {result.classType}
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-secondary-text">
              SCOPE: {result.scope}
            </div>
            {result.specialNote && (
              <div className="w-full text-xs font-mono text-accent-green bg-accent-green/5 border border-accent-green/20 px-3 py-2 rounded-lg flex items-center gap-2">
                <Info size={14} className="shrink-0" />
                <span>{result.specialNote}</span>
              </div>
            )}
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Subnet Mask */}
            <div className="bg-[#151515] border border-white/10 rounded-xl p-4 relative group">
              <span className="font-mono text-[10px] uppercase text-secondary-text tracking-wider block">
                Subnet Mask
              </span>
              <p className="font-mono text-base font-bold text-accent-green mt-1">
                {result.subnetMask}
              </p>
              <button
                onClick={() => handleCopy(result.subnetMask, 'mask')}
                className="absolute top-3 right-3 text-secondary-text hover:text-white"
                title="Copy"
              >
                {copiedKey === 'mask' ? <Check size={14} className="text-accent-green" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Network Address */}
            <div className="bg-[#151515] border border-white/10 rounded-xl p-4 relative group">
              <span className="font-mono text-[10px] uppercase text-secondary-text tracking-wider block">
                Network Address
              </span>
              <p className="font-mono text-base font-bold text-accent-blue mt-1">
                {result.networkAddress}
              </p>
              <button
                onClick={() => handleCopy(result.networkAddress, 'net')}
                className="absolute top-3 right-3 text-secondary-text hover:text-white"
                title="Copy"
              >
                {copiedKey === 'net' ? <Check size={14} className="text-accent-green" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Broadcast Address */}
            <div className="bg-[#151515] border border-white/10 rounded-xl p-4 relative group">
              <span className="font-mono text-[10px] uppercase text-secondary-text tracking-wider block">
                Broadcast Address
              </span>
              <p className="font-mono text-base font-bold text-primary-text mt-1">
                {result.broadcastAddress}
              </p>
              <button
                onClick={() => handleCopy(result.broadcastAddress, 'bcast')}
                className="absolute top-3 right-3 text-secondary-text hover:text-white"
                title="Copy"
              >
                {copiedKey === 'bcast' ? <Check size={14} className="text-accent-green" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Usable Hosts */}
            <div className="bg-[#151515] border border-white/10 rounded-xl p-4 relative group">
              <span className="font-mono text-[10px] uppercase text-secondary-text tracking-wider block">
                Usable Host Capacity
              </span>
              <p className="font-mono text-base font-bold text-accent-green mt-1">
                {result.usableHosts}{' '}
                <span className="text-xs font-normal text-secondary-text">
                  / {result.totalAddresses} total
                </span>
              </p>
            </div>
          </div>

          {/* Usable Range Bar */}
          <div className="p-4 rounded-xl bg-[#151515] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="text-secondary-text uppercase tracking-wider block text-[10px]">
                Valid Usable Host Address Range
              </span>
              <span className="text-sm font-semibold text-primary-text tracking-wide">
                {result.usableRange}
              </span>
            </div>

            <div className="flex items-center gap-6 text-secondary-text text-[11px]">
              <div>
                <span className="block text-[10px] text-secondary-text">FIRST USABLE</span>
                <span className="text-accent-green font-medium">{result.firstUsableIp || 'None'}</span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <span className="block text-[10px] text-secondary-text">LAST USABLE</span>
                <span className="text-accent-blue font-medium">{result.lastUsableIp || 'None'}</span>
              </div>
            </div>
          </div>

          {/* Binary Bitstream Breakdown */}
          <div className="p-4 rounded-xl bg-[#090909] border border-white/10 space-y-2">
            <div className="font-mono text-[11px] text-secondary-text flex items-center justify-between pb-1 border-b border-white/5">
              <span>32-BIT BINARY OCTET BREAKDOWN</span>
              <span className="text-accent-green font-mono">NET-BITS: {result.cidr} | HOST-BITS: {32 - result.cidr}</span>
            </div>
            <div className="font-mono text-xs space-y-1 overflow-x-auto py-1">
              <div className="flex items-center gap-4 min-w-[360px]">
                <span className="w-24 text-secondary-text text-[11px]">IP Bits:</span>
                <span className="text-white/80 tracking-widest">{result.binaryIp}</span>
              </div>
              <div className="flex items-center gap-4 min-w-[360px]">
                <span className="w-24 text-secondary-text text-[11px]">Mask Bits:</span>
                <span className="text-accent-green tracking-widest">{result.binarySubnetMask}</span>
              </div>
              <div className="flex items-center gap-4 min-w-[360px]">
                <span className="w-24 text-secondary-text text-[11px]">Network:</span>
                <span className="text-accent-blue tracking-widest">{result.binaryNetwork}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
