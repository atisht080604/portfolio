import React, { useState } from 'react';
import { Play, RotateCcw, ArrowRight, ShieldCheck, Cpu, Share2, Network, CheckCircle2, Info } from 'lucide-react';

const topologyNodes = [
  { id: 'pc1', name: 'PC 1 (Workstation)', ip: '192.168.10.5', mac: '00:1A:2B:01:02:03', layer: 'L3/Host', role: 'Originates payload' },
  { id: 'switchA', name: 'Switch A (Access)', ip: 'VLAN 10 Access', mac: 'Learns Port MACs', layer: 'Layer 2 Switch', role: 'Inspects MAC, forwards frame' },
  { id: 'routerA', name: 'Router A (Gateway)', ip: '192.168.10.1 / WAN', mac: 'Next-Hop Decider', layer: 'Layer 3 Router', role: 'Longest prefix match routing' },
  { id: 'routerB', name: 'Router B (Edge)', ip: 'WAN / 172.20.0.1', mac: 'Autonomous System', layer: 'Layer 3 Router', role: 'BGP/OSPF transit router' },
  { id: 'server', name: 'Server (Destination)', ip: '172.20.0.80', mac: '00:90:27:FE:DC:BA', layer: 'L7 / Host', role: 'Receives and handles request' },
];

const packetSteps = [
  {
    step: 0,
    activeNode: 'pc1',
    title: '1. PC 1 Formulates Packet & Frame',
    detail: 'PC 1 prepares IP packet: Src: 192.168.10.5, Dst: 172.20.0.80. PC 1 checks its subnet mask (/24): destination is on an external subnet. It resolves the Default Gateway MAC (Router A) via local ARP cache and constructs an Ethernet frame addressed to Router A\'s MAC.',
    highlight: 'Source MAC: PC 1 | Dest MAC: Router A | Dest IP: 172.20.0.80'
  },
  {
    step: 1,
    activeNode: 'switchA',
    title: '2. Switch A Performs MAC Learning & Forwarding',
    detail: 'Switch A receives frame on Port Fa0/1. It examines Source MAC (PC 1) and records it in its MAC Address Table against Port Fa0/1. It then reads Destination MAC (Router A), finds Router A on Trunk/Access Port Fa0/24, and forwards the frame without altering IP contents.',
    highlight: 'Switch inspects Layer 2 Frame Header only. No IP modification.'
  },
  {
    step: 2,
    activeNode: 'routerA',
    title: '3. Router A Decapsulates L2 & Evaluates Routing Table',
    detail: 'Router A receives frame on its LAN interface, strips the Layer 2 Ethernet header, and inspects the Layer 3 IP Destination: 172.20.0.80. It consults its Routing Table, applies Longest Prefix Match, selects WAN interface towards Router B, decrements TTL, and encapsulates a new L2 frame for the next-hop.',
    highlight: 'Routing Decision based on Destination IP. L2 MAC changed to Router B.'
  },
  {
    step: 3,
    activeNode: 'routerB',
    title: '4. Router B Identifies Direct Subnet Delivery',
    detail: 'Router B receives packet over WAN link, decrements TTL, checks its routing table: 172.20.0.0/24 is directly connected to Interface Gi0/1. It checks its ARP table for 172.20.0.80, rewrites the destination MAC to the Server\'s MAC, and transmits the Ethernet frame onto the target LAN segment.',
    highlight: 'Directly Connected Subnet Delivery. MAC rewritten to Server.'
  },
  {
    step: 4,
    activeNode: 'server',
    title: '5. Destination Server Receives & Processes Packet',
    detail: 'Destination Server receives frame on its NIC, validates FCS checksum, verifies Destination MAC matches its hardware, strips L2 frame, strips L3 IP header, and passes the TCP segment to the listening web application on Port 443.',
    highlight: 'Delivery Complete. End-to-end packet traversal successful.'
  }
];

export const routingProtocols = [
  {
    name: 'OSPF',
    type: 'Link-State IGP',
    algorithm: 'Dijkstra SPF',
    metric: 'Cost (Inverse Bandwidth)',
    scope: 'Interior Gateway (Internal Enterprise / Campus)',
    summary: 'Open standard protocol dividing networks into hierarchical Areas (Area 0 Backbone). Fast convergence and loop-free topology maps.'
  },
  {
    name: 'BGP',
    type: 'Path-Vector EGP',
    algorithm: 'Best-Path Selection Rules',
    metric: 'AS-Path, Local Pref, Multi-Exit Discriminator',
    scope: 'Exterior Gateway (Global Internet Backbone)',
    summary: 'The protocol that connects the world. Exchanges routing prefixes between distinct Autonomous Systems (ASNs) with strict policy control.'
  },
  {
    name: 'EIGRP',
    type: 'Advanced Distance-Vector',
    algorithm: 'DUAL (Diffusing Update)',
    metric: 'Composite (Bandwidth & Delay)',
    scope: 'Interior Gateway (Cisco Enterprise Networks)',
    summary: 'Features rapid convergence using feasible successor backup routes and minimal bandwidth overhead via triggered incremental updates.'
  },
  {
    name: 'RIP v2',
    type: 'Distance-Vector IGP',
    algorithm: 'Bellman-Ford',
    metric: 'Hop Count (Maximum 15 Hops)',
    scope: 'Legacy Small Networks',
    summary: 'Simple periodic broadcasts every 30 seconds. Limited to small topologies due to 15-hop boundary (16 hops considered unreachable).'
  }
];

export default function RoutingSwitching() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % packetSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + packetSteps.length) % packetSteps.length);
  };

  const resetSim = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const activePacketInfo = packetSteps[currentStep];

  return (
    <div className="space-y-10">
      {/* Module Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-accent-blue mb-1">
          <Share2 size={14} />
          <span>MODULE 04 // PACKET FORWARDING &amp; SWITCHING PATHWAYS</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-primary-text">
          Moving Data Across Networks: Routing Decisions vs. Switching Logic
        </h3>
        <p className="text-sm text-secondary-text mt-1 max-w-3xl">
          Switches forward Ethernet frames locally within broadcast domains using MAC address tables. Routers forward IP packets across different networks using routing tables and longest prefix match.
        </p>
      </div>

      {/* Interactive Topology Packet Flow Simulator */}
      <div className="bg-[#101010] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h4 className="font-mono text-base font-bold text-primary-text flex items-center gap-2">
              INTERACTIVE PACKET TRAVERSAL SIMULATOR
            </h4>
            <p className="text-xs text-secondary-text mt-1">
              Trace step-by-step packet flow from local workstation to remote destination server.
            </p>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={prevStep}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-secondary-text hover:text-white transition-colors"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-accent-green font-bold">
              Step {currentStep + 1} / {packetSteps.length}
            </span>
            <button
              onClick={nextStep}
              className="px-3 py-1.5 rounded-lg bg-accent-green text-black font-bold hover:bg-accent-green/90 transition-colors"
            >
              Next Hop
            </button>
            <button
              onClick={resetSim}
              className="p-1.5 rounded-lg bg-white/5 text-secondary-text hover:text-white transition-colors"
              title="Reset"
              aria-label="Reset simulation"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* Visual Topology Diagram */}
        <div className="my-8 overflow-x-auto pb-4">
          <div className="flex items-center justify-between min-w-[700px] gap-2">
            {topologyNodes.map((node, idx) => {
              const isActive = activePacketInfo.activeNode === node.id;
              return (
                <React.Fragment key={node.id}>
                  <div
                    onClick={() => setCurrentStep(idx)}
                    className={`flex-1 p-3.5 rounded-xl border transition-all cursor-pointer text-center relative ${
                      isActive
                        ? 'bg-[#181818] border-accent-green ring-2 ring-accent-green/20 shadow-[0_0_20px_-3px_rgba(183,255,107,0.3)]'
                        : 'bg-[#121212] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-accent-green text-black font-mono text-[9px] font-bold">
                        PACKET AT THIS HOP
                      </span>
                    )}

                    <span className="font-mono text-[10px] text-accent-blue block uppercase">
                      {node.layer}
                    </span>
                    <strong className="font-mono text-xs sm:text-sm text-primary-text block mt-1">
                      {node.name}
                    </strong>
                    <span className="font-mono text-[11px] text-secondary-text block mt-0.5">
                      {node.ip}
                    </span>
                  </div>

                  {idx < topologyNodes.length - 1 && (
                    <div className="flex flex-col items-center px-1 text-secondary-text shrink-0">
                      <div className={`h-0.5 w-6 sm:w-10 transition-colors ${
                        currentStep > idx ? 'bg-accent-green' : 'bg-white/15'
                      }`} />
                      <ArrowRight size={14} className={`mt-0.5 ${
                        currentStep > idx ? 'text-accent-green' : 'text-white/20'
                      }`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Current Step Technical Explanation */}
        <div className="p-5 rounded-xl bg-[#141414] border border-accent-green/30 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h5 className="font-bold text-accent-green text-sm flex items-center gap-2">
              <CheckCircle2 size={16} /> {activePacketInfo.title}
            </h5>
            <span className="text-[10px] text-secondary-text">HOP EXPLANATION</span>
          </div>

          <p className="text-secondary-text leading-relaxed font-sans text-xs sm:text-sm">
            {activePacketInfo.detail}
          </p>

          <div className="p-2.5 rounded bg-black/60 border border-white/5 text-primary-text text-[11px]">
            <span className="text-accent-blue font-bold">PACKET / FRAME HEADERS AT THIS STAGE: </span>
            <span>{activePacketInfo.highlight}</span>
          </div>
        </div>
      </div>

      {/* Routing vs Switching Comparative Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Switching Architecture */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
              <Cpu size={20} />
            </div>
            <div>
              <h4 className="font-mono text-base font-bold text-primary-text">
                Layer 2 Switching Mechanics
              </h4>
              <span className="font-mono text-xs text-secondary-text">Broadcast Domain &amp; MAC Forwarding</span>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-secondary-text font-sans">
            <li className="flex items-start gap-2">
              <span className="text-accent-blue font-bold">&bull;</span>
              <span><strong className="text-primary-text">MAC Learning:</strong> As frames arrive, the switch inspects the <em>Source MAC</em> and associates it with the ingress physical switch port.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-blue font-bold">&bull;</span>
              <span><strong className="text-primary-text">Frame Forwarding:</strong> If <em>Destination MAC</em> is in the CAM table, forward to that single port; if unknown, flood out all ports in the VLAN (Unknown Unicast Flooding).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-blue font-bold">&bull;</span>
              <span><strong className="text-primary-text">VLANs &amp; Trunking:</strong> IEEE 802.1Q tags frames across trunk ports to carry multiple isolated subnets over a single physical link.</span>
            </li>
          </ul>
        </div>

        {/* Routing Architecture */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent-green/10 text-accent-green border border-accent-green/20">
              <Network size={20} />
            </div>
            <div>
              <h4 className="font-mono text-base font-bold text-primary-text">
                Layer 3 Routing Mechanics
              </h4>
              <span className="font-mono text-xs text-secondary-text">Inter-Network Path Determination</span>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-secondary-text font-sans">
            <li className="flex items-start gap-2">
              <span className="text-accent-green font-bold">&bull;</span>
              <span><strong className="text-primary-text">Routing Tables:</strong> Contain destination network CIDR blocks, metrics/administrative distance, exit interfaces, and next-hop IP addresses.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-green font-bold">&bull;</span>
              <span><strong className="text-primary-text">Longest Prefix Match (LPM):</strong> The router matches the destination IP against table entries; the entry with the longest prefix (most specific subnet mask) wins.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-green font-bold">&bull;</span>
              <span><strong className="text-primary-text">Header Manipulation:</strong> Routers decrement the IP TTL (Time To Live) by 1 (dropping packets with TTL=0) and recalculate the IP checksum.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Dynamic Routing Protocols Overview */}
      <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-7">
        <h4 className="font-mono text-base font-bold text-primary-text mb-4">
          ROUTING PROTOCOLS LANDSCAPE (IGP vs. EGP)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {routingProtocols.map((rp, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-bold text-accent-green">{rp.name}</span>
                <span className="font-mono text-[10px] text-accent-blue px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  {rp.type}
                </span>
              </div>
              <div className="text-[11px] font-mono text-secondary-text space-y-1">
                <div><span className="text-white/40">ALGO:</span> {rp.algorithm}</div>
                <div><span className="text-white/40">METRIC:</span> {rp.metric}</div>
                <div><span className="text-white/40">SCOPE:</span> {rp.scope}</div>
              </div>
              <p className="text-xs text-secondary-text font-sans pt-1 border-t border-white/5">
                {rp.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
