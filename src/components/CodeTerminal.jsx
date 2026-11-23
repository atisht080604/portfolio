import React, { useState } from 'react';
import { Terminal, Copy, Check, Info, Monitor, Layers, Eye } from 'lucide-react';
import { windowsCommands, linuxCommands, wiresharkInspection } from '../data/troubleshooting';

export default function CodeTerminal() {
  const [platform, setPlatform] = useState('windows'); // 'windows' | 'linux' | 'wireshark'
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [selectedPacket, setSelectedPacket] = useState(0);

  const commandList = platform === 'windows' ? windowsCommands : linuxCommands;
  const currentCmd = commandList[selectedIdx] || commandList[0];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#101010] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* Platform Switcher & Disclaimer */}
      <div className="bg-[#141414] px-5 py-3 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setPlatform('windows');
              setSelectedIdx(0);
            }}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              platform === 'windows'
                ? 'bg-accent-green text-black'
                : 'text-secondary-text hover:text-white bg-white/5'
            }`}
          >
            <Monitor size={13} />
            <span>Windows CLI</span>
          </button>

          <button
            onClick={() => {
              setPlatform('linux');
              setSelectedIdx(0);
            }}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              platform === 'linux'
                ? 'bg-accent-blue text-black'
                : 'text-secondary-text hover:text-white bg-white/5'
            }`}
          >
            <Terminal size={13} />
            <span>Linux Shell</span>
          </button>

          <button
            onClick={() => {
              setPlatform('wireshark');
            }}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              platform === 'wireshark'
                ? 'bg-[#FF79C6] text-black'
                : 'text-secondary-text hover:text-white bg-white/5'
            }`}
          >
            <Eye size={13} />
            <span>Wireshark Capture</span>
          </button>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-mono text-secondary-text">
          <Info size={13} className="text-accent-green shrink-0" />
          <span>Interactive simulator (educational demonstration)</span>
        </div>
      </div>

      {platform !== 'wireshark' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Command Selector Sidebar */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0d0d0d] p-4 space-y-1.5 max-h-[460px] overflow-y-auto">
            <span className="font-mono text-[10px] uppercase text-secondary-text tracking-wider block px-2 mb-2">
              SELECT DIAGNOSTIC COMMAND
            </span>
            {commandList.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full text-left px-3 py-2.5 rounded-lg font-mono text-xs transition-all flex items-center justify-between ${
                  selectedIdx === idx
                    ? 'bg-white/10 border border-accent-green/50 text-accent-green font-bold shadow'
                    : 'text-secondary-text hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div>
                  <span className="block text-white font-medium">{item.cmd}</span>
                  <span className="text-[10px] text-secondary-text font-normal line-clamp-1">
                    {item.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Terminal Output Area */}
          <div className="lg:col-span-8 p-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Command Title & Purpose */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 mb-4">
                <div>
                  <h4 className="font-mono text-base font-bold text-primary-text flex items-center gap-2">
                    <span className="text-accent-green">$</span> {currentCmd.cmd}
                  </h4>
                  <p className="text-xs text-secondary-text mt-1">{currentCmd.purpose}</p>
                </div>
                <button
                  onClick={() => handleCopy(currentCmd.sampleOutput)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-secondary-text hover:text-accent-green hover:border-accent-green/30 text-xs font-mono flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  {copied ? <Check size={13} className="text-accent-green" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy Output'}</span>
                </button>
              </div>

              {/* Troubleshooting Context */}
              <div className="p-3 rounded-xl bg-accent-blue/5 border border-accent-blue/20 mb-4 font-mono text-xs text-secondary-text">
                <span className="text-accent-blue font-bold">WHEN TO USE: </span>
                <span>{currentCmd.whenToUse}</span>
              </div>

              {/* Output Display */}
              <div className="relative rounded-xl bg-black/80 border border-white/10 p-4 font-mono text-xs overflow-x-auto text-primary-text">
                <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-white/5 text-[11px] text-secondary-text">
                  <span className="w-2 h-2 rounded-full bg-accent-green" />
                  <span>SIMULATED STDOUT ({currentCmd.category.toUpperCase()})</span>
                </div>
                <pre className="text-accent-green/90 leading-relaxed font-mono whitespace-pre selection:bg-accent-green/20">
                  {currentCmd.sampleOutput}
                </pre>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Wireshark Packet Inspection View */
        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-mono text-base font-bold text-primary-text flex items-center gap-2">
              WIRESHARK PACKET DISSECTION ENGINE
            </h4>
            <p className="text-xs text-secondary-text mt-1">
              Select captured network frames to inspect Layer 2 MAC addresses, Layer 3 IP headers, Layer 4 TCP handshakes, and Layer 7 protocol payloads.
            </p>
          </div>

          {/* Frame List Table */}
          <div className="border border-white/10 rounded-xl overflow-x-auto bg-black/60">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#181818] text-secondary-text uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-2.5 px-3">No.</th>
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Source</th>
                  <th className="py-2.5 px-3">Destination</th>
                  <th className="py-2.5 px-3">Protocol</th>
                  <th className="py-2.5 px-3">Length</th>
                  <th className="py-2.5 px-3">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {wiresharkInspection.samplePackets.map((pkt, idx) => (
                  <tr
                    key={idx}
                    onClick={() => setSelectedPacket(idx)}
                    className={`cursor-pointer transition-colors ${
                      selectedPacket === idx
                        ? 'bg-accent-green/15 text-accent-green font-medium'
                        : 'text-primary-text hover:bg-white/5'
                    }`}
                  >
                    <td className="py-2 px-3">{pkt.frameNo}</td>
                    <td className="py-2 px-3">{pkt.time}</td>
                    <td className="py-2 px-3">{pkt.source}</td>
                    <td className="py-2 px-3">{pkt.destination}</td>
                    <td className="py-2 px-3">
                      <span className="px-1.5 py-0.5 rounded bg-white/10 font-bold">
                        {pkt.protocol}
                      </span>
                    </td>
                    <td className="py-2 px-3">{pkt.length}</td>
                    <td className="py-2 px-3 text-[11px] truncate max-w-xs">{pkt.info}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Packet Details Dissection Tree */}
          {wiresharkInspection.samplePackets[selectedPacket] && (
            <div className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-3 font-mono text-xs">
              <span className="text-xs uppercase text-accent-green font-bold tracking-wider block pb-2 border-b border-white/10">
                FRAME {wiresharkInspection.samplePackets[selectedPacket].frameNo} DISSECTION DETAILS
              </span>

              <div className="space-y-2">
                <div className="p-2.5 rounded bg-black/50 border border-white/5 text-secondary-text">
                  <span className="text-accent-blue font-bold block">[Layer 2] Frame Header:</span>
                  <span className="text-primary-text">
                    {wiresharkInspection.samplePackets[selectedPacket].details.layer2}
                  </span>
                </div>

                <div className="p-2.5 rounded bg-black/50 border border-white/5 text-secondary-text">
                  <span className="text-accent-green font-bold block">[Layer 3] IP Header:</span>
                  <span className="text-primary-text">
                    {wiresharkInspection.samplePackets[selectedPacket].details.layer3}
                  </span>
                </div>

                <div className="p-2.5 rounded bg-black/50 border border-white/5 text-secondary-text">
                  <span className="text-[#FF79C6] font-bold block">[Layer 4] Transport:</span>
                  <span className="text-primary-text">
                    {wiresharkInspection.samplePackets[selectedPacket].details.layer4}
                  </span>
                </div>

                <div className="p-2.5 rounded bg-black/50 border border-white/5 text-secondary-text">
                  <span className="text-[#FFD166] font-bold block">[Layer 7] Payload / Protocol Info:</span>
                  <span className="text-primary-text">
                    {wiresharkInspection.samplePackets[selectedPacket].details.layer7}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
