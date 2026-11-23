import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Copy, Check, RotateCcw } from 'lucide-react';

const defaultLines = [
  { text: '> Initializing developer profile...', delay: 400, color: 'text-secondary-text' },
  { text: '> Loading technical modules...', delay: 900, color: 'text-secondary-text' },
  { text: '> Full-stack systems: READY', delay: 1500, color: 'text-accent-green' },
  { text: '> AI/ML modules: READY', delay: 2100, color: 'text-accent-blue' },
  { text: '> Cloud & database services: LOADED', delay: 2700, color: 'text-accent-green' },
  { text: '> Access granted. System operational.', delay: 3300, color: 'text-primary-text font-bold' }
];

export default function Terminal({ className = '' }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [extraLogs, setExtraLogs] = useState([]);

  useEffect(() => {
    let timeouts = [];
    setDisplayedLines([]);
    
    defaultLines.forEach((item, index) => {
      const t = setTimeout(() => {
        setDisplayedLines(prev => [...prev, item]);
      }, item.delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleRestart = () => {
    setDisplayedLines([]);
    setExtraLogs([]);
    defaultLines.forEach((item) => {
      setTimeout(() => {
        setDisplayedLines(prev => [...prev, item]);
      }, item.delay);
    });
  };

  const handleCopy = () => {
    const textToCopy = [...displayedLines, ...extraLogs].map(l => l.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim().toLowerCase();
      if (!cmd) return;

      const userEntry = { text: `$ ${inputVal}`, color: 'text-white font-medium' };
      let responseEntry;

      if (cmd === 'help') {
        responseEntry = {
          text: 'Available commands: status, whoami, stack, clear, date',
          color: 'text-accent-blue'
        };
      } else if (cmd === 'status') {
        responseEntry = {
          text: 'SYSTEM STATUS: ONLINE | CPU: 12% | Pune Node Active',
          color: 'text-accent-green'
        };
      } else if (cmd === 'whoami') {
        responseEntry = {
          text: 'Atish Thorat — MCA Student, Full-Stack Developer & AI/ML Enthusiast',
          color: 'text-accent-green'
        };
      } else if (cmd === 'stack') {
        responseEntry = {
          text: 'React, Node.js, Python, PyTorch, MongoDB, Express, Vite, Tailwind CSS',
          color: 'text-accent-blue'
        };
      } else if (cmd === 'clear') {
        setDisplayedLines([]);
        setExtraLogs([]);
        setInputVal('');
        return;
      } else if (cmd === 'date') {
        responseEntry = {
          text: new Date().toUTCString(),
          color: 'text-secondary-text'
        };
      } else {
        responseEntry = {
          text: `Command not recognized: "${cmd}". Type "help" for list of commands.`,
          color: 'text-red-400'
        };
      }

      setExtraLogs(prev => [...prev, userEntry, responseEntry]);
      setInputVal('');
    }
  };

  return (
    <div className={`w-full bg-[#0d0d0d] border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md ${className}`}>
      {/* Terminal Title Bar */}
      <div className="bg-[#141414] px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80 border border-[#E0443E]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 border border-[#DEA123]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]/80 border border-[#1AAB29]" />
          <span className="ml-3 font-mono text-xs text-secondary-text flex items-center gap-1.5">
            <TerminalIcon size={12} className="text-accent-green" />
            atish@pune-intelligence:~ (bash)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRestart}
            className="p-1 rounded text-secondary-text hover:text-accent-green hover:bg-white/5 transition-colors"
            title="Replay initialization"
            aria-label="Replay initialization"
          >
            <RotateCcw size={12} />
          </button>
          <button
            onClick={handleCopy}
            className="p-1 rounded text-secondary-text hover:text-accent-green hover:bg-white/5 transition-colors"
            title="Copy output"
            aria-label="Copy output"
          >
            {copied ? <Check size={12} className="text-accent-green" /> : <Copy size={12} />}
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-2 min-h-[190px] max-h-[300px] overflow-y-auto">
        {displayedLines.map((line, idx) => (
          <div key={`init-${idx}`} className={`leading-relaxed ${line.color} transition-opacity duration-300`}>
            {line.text}
          </div>
        ))}

        {extraLogs.map((log, idx) => (
          <div key={`extra-${idx}`} className={`leading-relaxed ${log.color}`}>
            {log.text}
          </div>
        ))}

        {/* Interactive CLI Prompt */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-accent-green font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            placeholder='Type "help" or a command...'
            className="flex-1 bg-transparent border-none text-primary-text font-mono text-xs sm:text-sm focus:outline-none placeholder:text-white/20"
            aria-label="Interactive terminal input"
          />
          <span className="w-2 h-4 bg-accent-green animate-pulse" />
        </div>
      </div>
    </div>
  );
}