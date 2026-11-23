import React, { useState } from 'react';
import { troubleshootingScenarios } from '../data/scenarios';
import { AlertCircle, CheckCircle2, HelpCircle, ArrowRight, RotateCcw, Wrench, ShieldAlert } from 'lucide-react';

export default function NetworkScenarios() {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [userChoices, setUserChoices] = useState({}); // { [stepIndex]: optionIndex }
  const [showResolution, setShowResolution] = useState(false);

  const scenario = troubleshootingScenarios[selectedScenarioIdx];

  const handleSelectOption = (stepIdx, optIdx) => {
    setUserChoices((prev) => ({
      ...prev,
      [stepIdx]: optIdx
    }));
  };

  const resetScenario = () => {
    setUserChoices({});
    setShowResolution(false);
  };

  const handleSwitchScenario = (idx) => {
    setSelectedScenarioIdx(idx);
    setUserChoices({});
    setShowResolution(false);
  };

  const allStepsAnswered = scenario.steps.every((_, idx) => userChoices[idx] !== undefined);

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-accent-green mb-1">
          <Wrench size={14} />
          <span>MODULE 07 // REAL-WORLD TROUBLESHOOTING SIMULATOR</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-primary-text">
          Interactive Scenario Investigations &amp; Root Cause Analysis
        </h3>
        <p className="text-sm text-secondary-text mt-1 max-w-3xl">
          Step into the shoes of a network engineer. Analyze real-world failure symptoms, select methodical diagnostic procedures across OSI layers, and unlock the verified resolution.
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {troubleshootingScenarios.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => handleSwitchScenario(idx)}
            className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 ${
              selectedScenarioIdx === idx
                ? 'bg-accent-green text-black font-bold shadow-lg'
                : 'bg-[#141414] border border-white/10 text-secondary-text hover:text-white hover:border-white/20'
            }`}
          >
            <span>CASE 0{idx + 1}</span>
            <span className="hidden sm:inline opacity-70">| {sc.title.split(':')[1]}</span>
          </button>
        ))}
      </div>

      {/* Active Scenario Card */}
      <div className="bg-[#101010] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Scenario Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
          <div>
            <span className="font-mono text-xs font-bold text-accent-blue bg-accent-blue/10 px-2.5 py-0.5 rounded border border-accent-blue/20">
              {scenario.badge}
            </span>
            <h4 className="text-xl font-bold text-primary-text mt-2">
              {scenario.title}
            </h4>
          </div>

          <button
            onClick={resetScenario}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-secondary-text hover:text-white transition-colors self-start sm:self-auto"
          >
            <RotateCcw size={13} />
            <span>Reset Simulation</span>
          </button>
        </div>

        {/* Symptom & Context */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-1">
            <span className="font-mono text-xs text-red-400 font-bold uppercase tracking-wider block flex items-center gap-1.5">
              <AlertCircle size={14} /> Reported Symptom
            </span>
            <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
              {scenario.symptom}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-1">
            <span className="font-mono text-xs text-accent-green font-bold uppercase tracking-wider block flex items-center gap-1.5">
              <ShieldAlert size={14} /> Environmental Context
            </span>
            <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
              {scenario.context}
            </p>
          </div>
        </div>

        {/* Step-by-Step Diagnostic Questions */}
        <div className="space-y-6 pt-4">
          <h5 className="font-mono text-xs uppercase tracking-widest text-secondary-text">
            EXECUTE METHODICAL DIAGNOSTIC STEPS:
          </h5>

          {scenario.steps.map((step, sIdx) => {
            const chosenOptIdx = userChoices[sIdx];
            const hasChosen = chosenOptIdx !== undefined;

            return (
              <div
                key={sIdx}
                className="p-5 rounded-xl bg-[#141414] border border-white/10 space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-accent-green/10 text-accent-green border border-accent-green/20">
                    STEP 0{step.stepNum}
                  </span>
                  <p className="font-mono text-xs sm:text-sm font-semibold text-primary-text">
                    {step.question}
                  </p>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2">
                  {step.options.map((opt, oIdx) => {
                    const isSelected = chosenOptIdx === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(sIdx, oIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-accent-green/10 border-accent-green text-primary-text font-medium'
                              : 'bg-red-500/10 border-red-500 text-primary-text font-medium'
                            : 'bg-[#181818] border-white/5 text-secondary-text hover:text-white hover:border-white/15'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] shrink-0 mt-0.5 ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-accent-green text-black font-bold'
                              : 'bg-red-500 text-white font-bold'
                            : 'bg-white/10 text-secondary-text'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="flex-1 leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Panel */}
                {hasChosen && (
                  <div
                    className={`p-3 rounded-lg border font-mono text-xs leading-relaxed flex items-start gap-2.5 ${
                      step.options[chosenOptIdx].isCorrect
                        ? 'bg-accent-green/10 border-accent-green/30 text-accent-green'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    {step.options[chosenOptIdx].isCorrect ? (
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    )}
                    <span>{step.options[chosenOptIdx].feedback}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Resolution Reveal */}
        <div className="pt-4 border-t border-white/10">
          {!showResolution ? (
            <button
              onClick={() => setShowResolution(true)}
              className="w-full py-3.5 px-6 rounded-xl bg-accent-green text-black font-mono text-xs sm:text-sm font-bold hover:bg-accent-green/90 transition-all flex items-center justify-center gap-2"
            >
              <span>{allStepsAnswered ? 'VERIFY CASE RESOLUTION & RCA' : 'REVEAL ROOT CAUSE & VERIFIED RESOLUTION'}</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <div className="p-5 sm:p-6 rounded-xl bg-accent-green/10 border border-accent-green/40 space-y-3 animate-fadeIn">
              <span className="font-mono text-xs font-bold text-accent-green uppercase tracking-wider block flex items-center gap-2">
                <CheckCircle2 size={16} /> ROOT CAUSE ANALYSIS &amp; RESOLUTION SUMMARY
              </span>
              <p className="text-xs sm:text-sm text-primary-text leading-relaxed font-sans">
                {scenario.resolution}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
