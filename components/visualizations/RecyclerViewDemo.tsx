import React, { useState, useEffect, useRef } from 'react';

const RecyclerViewDemo: React.FC = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const totalItems = 100;
  const itemHeight = 40;
  const containerHeight = 200;
  
  // Calculate visible items for RecyclerView logic
  const startIndex = Math.max(0, Math.floor(scrollPos / itemHeight));
  const endIndex = Math.min(totalItems, Math.ceil((scrollPos + containerHeight) / itemHeight));
  
  const visibleItems = [];
  for (let i = startIndex; i <= endIndex; i++) {
    visibleItems.push({ index: i, top: i * itemHeight });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-slate-900 rounded-xl border border-slate-700">
      {/* ScrollView Simulation */}
      <div>
        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span> ScrollView
        </h4>
        <div className="text-xs text-slate-400 mb-2">Renders ALL {totalItems} items. High memory usage.</div>
        <div className="h-[200px] overflow-y-auto border border-slate-600 rounded bg-slate-800 relative">
          <div style={{ height: totalItems * itemHeight }} className="relative">
            {Array.from({ length: totalItems }).map((_, i) => (
              <div key={i} className="absolute w-full h-[40px] border-b border-slate-700 flex items-center px-4 text-slate-500" style={{ top: i * itemHeight }}>
                Item {i} (Rendered)
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RecyclerView Simulation */}
      <div>
        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span> RecyclerView
        </h4>
        <div className="text-xs text-slate-400 mb-2">Renders only ~{endIndex - startIndex} visible items. Recycles views.</div>
        <div 
          className="h-[200px] overflow-y-auto border border-slate-600 rounded bg-slate-800 relative"
          onScroll={(e) => setScrollPos(e.currentTarget.scrollTop)}
        >
          <div style={{ height: totalItems * itemHeight }} className="relative">
            {visibleItems.map((item) => (
              <div 
                key={item.index} 
                className="absolute w-full h-[40px] border-b border-emerald-900/50 bg-emerald-900/20 flex items-center px-4 text-emerald-400 font-bold transition-all" 
                style={{ top: item.top }}
              >
                Item {item.index} (Active)
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclerViewDemo;