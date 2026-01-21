import React, { useState } from 'react';

const LifecycleDiagram: React.FC = () => {
  const [activeState, setActiveState] = useState<string | null>(null);

  const states = [
    { id: 'created', label: 'onCreate()', desc: 'Activity is created. Setup UI/Variables.', color: 'bg-blue-600' },
    { id: 'started', label: 'onStart()', desc: 'Activity becomes visible to user.', color: 'bg-green-600' },
    { id: 'resumed', label: 'onResume()', desc: 'Activity is ready for user interaction.', color: 'bg-emerald-500' },
    { id: 'paused', label: 'onPause()', desc: 'Partially visible or losing focus.', color: 'bg-yellow-600' },
    { id: 'stopped', label: 'onStop()', desc: 'Activity is no longer visible.', color: 'bg-orange-600' },
    { id: 'destroyed', label: 'onDestroy()', desc: 'Activity is destroyed. Cleanup.', color: 'bg-red-600' },
  ];

  return (
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-700 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Activity Lifecycle Simulator</h3>
      <p className="text-sm text-slate-400 mb-6">Click a state to understand its role.</p>
      
      <div className="flex flex-col items-center space-y-4">
        {states.map((state, index) => (
          <div key={state.id} className="relative w-full max-w-xs flex flex-col items-center">
            {index > 0 && <div className="h-6 w-0.5 bg-slate-600"></div>}
            <button
              onClick={() => setActiveState(state.id)}
              className={`w-full py-3 px-4 rounded-lg font-mono font-semibold transition-all duration-300 ${
                activeState === state.id ? `${state.color} scale-105 shadow-lg ring-2 ring-white` : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {state.label}
            </button>
            {activeState === state.id && (
              <div className="mt-2 p-3 bg-slate-800/50 border border-slate-600 rounded text-xs text-slate-200 w-full animate-fade-in">
                {state.desc}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifecycleDiagram;