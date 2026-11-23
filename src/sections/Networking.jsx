import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import OSIModel from '../networking/OSIModel';
import TCPIPModel from '../networking/TCPIPModel';
import IPAddressing from '../networking/IPAddressing';
import RoutingSwitching from '../networking/RoutingSwitching';
import Protocols from '../networking/Protocols';
import Troubleshooting from '../networking/Troubleshooting';
import NetworkScenarios from '../networking/NetworkScenarios';

import {
  Layers,
  Globe,
  Hash,
  Share2,
  Network,
  Terminal,
  Wrench,
  Radio,
  Server,
  Laptop,
  Cpu,
  Shield,
  ArrowRight
} from 'lucide-react';

const nocModules = [
  { id: 'all', title: 'Full NOC Dashboard', icon: Radio, code: 'MOD_ALL' },
  { id: 'osi', title: '01. OSI 7-Layer Model', icon: Layers, code: 'MOD_01' },
  { id: 'tcpip', title: '02. TCP/IP Architecture', icon: Globe, code: 'MOD_02' },
  { id: 'addressing', title: '03. IP & Subnet Calculator', icon: Hash, code: 'MOD_03' },
  { id: 'routing', title: '04. Routing & Switching', icon: Share2, code: 'MOD_04' },
  { id: 'protocols', title: '05. Protocol Arsenal', icon: Network, code: 'MOD_05' },
  { id: 'troubleshooting', title: '06. Diagnostic CLI & Wireshark', icon: Terminal, code: 'MOD_06' },
  { id: 'scenarios', title: '07. Troubleshooting Scenarios', icon: Wrench, code: 'MOD_07' },
];

const nocTopology = [
  {
    id: 'client',
    label: 'Client Workstation',
    ip: '192.168.1.105',
    role: 'Originates application requests (L7 down to L1). Issues HTTP/DNS calls over local physical NIC.',
    icon: Laptop
  },
  {
    id: 'switch',
    label: 'Managed Switch (L2)',
    ip: 'VLAN 10 Access',
    role: 'Maintains CAM table, associates MACs with ports, and isolates broadcast domains without IP altering.',
    icon: Cpu
  },
  {
    id: 'router',
    label: 'Edge Gateway (L3)',
    ip: '192.168.1.1 (LAN) / Public WAN',
    role: 'Evaluates routing table via Longest Prefix Match. Decrements TTL and performs NAT translation.',
    icon: Share2
  },
  {
    id: 'internet',
    label: 'Internet Backbone (BGP)',
    ip: 'Autonomous Systems',
    role: 'Global mesh of interconnected transit providers routing autonomous prefixes via BGP-4.',
    icon: Globe
  },
  {
    id: 'server',
    label: 'Target Web Server',
    ip: '142.250.190.46:443',
    role: 'Accepts TCP 3-way handshakes, terminates TLS sessions, and executes backend application logic.',
    icon: Server
  }
];

export default function Networking() {
  const [activeModule, setActiveModule] = useState('all');
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <section id="networking" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          tag="NETWORK OPERATIONS CENTER (NOC)"
          title="Understanding How Networks Connect."
          subtitle="An interactive deep-dive into the architectural models, routing algorithms, binary subnetting math, and packet diagnostics governing modern computer communication."
        />

        {/* NOC Interactive Topology Header Bar */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs text-accent-green font-bold uppercase tracking-wider block">
                NOC LIVE TOPOLOGY // CLIENT-TO-SERVER PACKET PATHWAY
              </span>
              <p className="text-xs text-secondary-text mt-0.5">
                Click any device in the path to inspect its operational role and layer responsibilities.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span>NOC SIMULATOR: READY</span>
            </div>
          </div>

          {/* Connected Device Nodes Diagram */}
          <div className="my-8 overflow-x-auto pb-2">
            <div className="flex items-center justify-between min-w-[700px] gap-2">
              {nocTopology.map((node, idx) => {
                const IconComponent = node.icon;
                const isSelected = selectedNode?.id === node.id;
                return (
                  <React.Fragment key={node.id}>
                    <button
                      onClick={() => setSelectedNode(node)}
                      className={`flex-1 p-4 rounded-xl border transition-all text-center group focus:outline-none ${
                        isSelected
                          ? 'bg-[#1a1a1a] border-accent-green ring-2 ring-accent-green/20 shadow-lg'
                          : 'bg-[#151515] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="w-10 h-10 mx-auto rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-accent-green group-hover:border-accent-green transition-colors mb-2">
                        <IconComponent size={20} />
                      </div>
                      <span className="font-mono text-xs font-bold text-primary-text block truncate">
                        {node.label}
                      </span>
                      <span className="font-mono text-[10px] text-accent-blue block truncate mt-0.5">
                        {node.ip}
                      </span>
                    </button>

                    {idx < nocTopology.length - 1 && (
                      <div className="flex items-center px-1 text-white/30 shrink-0">
                        <div className="h-0.5 w-6 sm:w-10 bg-white/15" />
                        <ArrowRight size={14} className="text-accent-green/70 -ml-1" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Node Role Inspector Modal / Flyout */}
          {selectedNode && (
            <div className="p-4 rounded-xl bg-black/70 border border-accent-green/30 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
              <div>
                <span className="text-accent-green font-bold block sm:inline mr-2">
                  [{selectedNode.label.toUpperCase()}]:
                </span>
                <span className="text-secondary-text font-sans text-xs">{selectedNode.role}</span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-[11px] text-white/50 hover:text-white underline self-end sm:self-auto shrink-0"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>

        {/* NOC Module Quick Jump Bar */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-white/10 pb-6">
          {nocModules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-accent-green text-black font-bold shadow-lg'
                    : 'bg-[#141414] border border-white/10 text-secondary-text hover:text-white hover:border-white/20'
                }`}
              >
                <Icon size={14} />
                <span>{mod.title}</span>
              </button>
            );
          })}
        </div>

        {/* Render Selected Module or Full NOC Dashboard */}
        <div className="space-y-20">
          {(activeModule === 'all' || activeModule === 'osi') && <OSIModel />}
          {(activeModule === 'all' || activeModule === 'tcpip') && <TCPIPModel />}
          {(activeModule === 'all' || activeModule === 'addressing') && <IPAddressing />}
          {(activeModule === 'all' || activeModule === 'routing') && <RoutingSwitching />}
          {(activeModule === 'all' || activeModule === 'protocols') && <Protocols />}
          {(activeModule === 'all' || activeModule === 'troubleshooting') && <Troubleshooting />}
          {(activeModule === 'all' || activeModule === 'scenarios') && <NetworkScenarios />}
        </div>
      </div>
    </section>
  );
}
