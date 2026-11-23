import React from 'react';
import SubnetCalculator from '../components/SubnetCalculator';
import { Hash, ShieldAlert, Cpu, Network, ArrowRight } from 'lucide-react';

export default function IPAddressing() {
  return (
    <div className="space-y-10">
      {/* Module Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-accent-green mb-1">
          <Hash size={14} />
          <span>MODULE 03 // LOGICAL ADDRESSING &amp; SUBNETTING</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-primary-text">
          IPv4 / IPv6 Logical Addressing, Classifications &amp; Subnet Slicing
        </h3>
        <p className="text-sm text-secondary-text mt-1 max-w-3xl">
          Addressing is the cornerstone of routed communications. Understand binary address boundaries, private network scopes (RFC 1918), and calculate CIDR masks mathematically.
        </p>
      </div>

      {/* Conceptual Foundations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-[#121212] border border-white/10 rounded-xl p-5 space-y-2">
          <span className="font-mono text-xs font-bold text-accent-green block">
            IPv4 vs IPv6 ARCHITECTURE
          </span>
          <p className="text-xs text-secondary-text leading-relaxed">
            <strong className="text-primary-text">IPv4 (32-bit):</strong> ~4.29 billion total addresses written in 4 dotted-decimal octets (e.g. 192.168.1.1).
          </p>
          <p className="text-xs text-secondary-text leading-relaxed">
            <strong className="text-primary-text">IPv6 (128-bit):</strong> $3.4 \times 10^{38}$ addresses written in 8 hexadecimal quartets (e.g. 2001:0db8::1), eliminating NAT reliance.
          </p>
        </div>

        <div className="bg-[#121212] border border-white/10 rounded-xl p-5 space-y-2">
          <span className="font-mono text-xs font-bold text-accent-blue block">
            NETWORK ID vs HOST ID
          </span>
          <p className="text-xs text-secondary-text leading-relaxed">
            Every IPv4 address is split into two logical portions by the Subnet Mask. The <strong className="text-primary-text">Network ID</strong> identifies the broadcast domain; the <strong className="text-primary-text">Host ID</strong> identifies the specific device interface on that network.
          </p>
        </div>

        <div className="bg-[#121212] border border-white/10 rounded-xl p-5 space-y-2">
          <span className="font-mono text-xs font-bold text-[#FFD166] block">
            STATIC vs DYNAMIC &amp; GATEWAY
          </span>
          <p className="text-xs text-secondary-text leading-relaxed">
            <strong className="text-primary-text">Static IP:</strong> Manually pinned IP for servers and switches.
            <br />
            <strong className="text-primary-text">Dynamic IP:</strong> Leased by DHCP servers.
            <br />
            <strong className="text-primary-text">Default Gateway:</strong> The router interface forwarding non-local traffic.
          </p>
        </div>
      </div>

      {/* RFC 1918 Private Ranges Callout */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-7">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div>
            <h4 className="font-mono text-sm sm:text-base font-bold text-primary-text">
              RFC 1918 PRIVATE IPv4 ADDRESS BLOCKS
            </h4>
            <p className="text-xs text-secondary-text">
              Reserved for enterprise LANs and home networks. Never routed across the public Internet backbone without NAT.
            </p>
          </div>
          <span className="font-mono text-xs text-accent-green px-2.5 py-1 rounded bg-accent-green/10 border border-accent-green/20 hidden sm:inline-block">
            NON-ROUTABLE ON WAN
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-1">
            <span className="text-accent-green font-bold text-sm block">10.0.0.0 / 8</span>
            <span className="text-secondary-text block text-[11px]">Range: 10.0.0.0 – 10.255.255.255</span>
            <span className="text-white/80 block text-[11px]">Capacity: 16,777,216 addresses (Class A)</span>
            <span className="text-secondary-text text-[10px] block pt-1">Used by: Enterprise mega-networks, cloud VPCs</span>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-1">
            <span className="text-accent-blue font-bold text-sm block">172.16.0.0 / 12</span>
            <span className="text-secondary-text block text-[11px]">Range: 172.16.0.0 – 172.31.255.255</span>
            <span className="text-white/80 block text-[11px]">Capacity: 1,048,576 addresses (Class B)</span>
            <span className="text-secondary-text text-[10px] block pt-1">Used by: Mid-size corporate campuses, Docker bridge</span>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-1">
            <span className="text-[#9B87FF] font-bold text-sm block">192.168.0.0 / 16</span>
            <span className="text-secondary-text block text-[11px]">Range: 192.168.0.0 – 192.168.255.255</span>
            <span className="text-white/80 block text-[11px]">Capacity: 65,536 addresses (Class C)</span>
            <span className="text-secondary-text text-[10px] block pt-1">Used by: Home Wi-Fi routers, small branch offices</span>
          </div>
        </div>
      </div>

      {/* Embedded Subnet Calculator */}
      <SubnetCalculator />
    </div>
  );
}
