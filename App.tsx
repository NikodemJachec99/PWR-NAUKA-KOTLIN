import React, { useState, useMemo } from 'react';
import { COURSE_TOPICS } from './data/courseContent';
import { Topic, ViewMode } from './types';
import TopicViewer from './components/TopicViewer';

const App: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<string>(COURSE_TOPICS[0].id);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.LEARN);
  
  // Special state for the "All In One" Exam
  const [isExamMode, setIsExamMode] = useState(false);

  // Dynamically generate the Final Exam Topic
  const finalExamTopic: Topic = useMemo(() => {
    const allQuestions = COURSE_TOPICS.flatMap(t => t.quiz || []);
    return {
      id: 'doctoral-defense',
      title: 'QUIZ',
      category: 'Android System',
      description: 'The ultimate cumulative examination covering JVM internals, Kernel interactions, Security, and Compose Architecture. Pass rate: < 10%.',
      sections: [
        {
          title: 'Examination Protocol',
          content: 'You are about to begin the **Comprehensive Doctoral Defense**. \n\nThis exam aggregates all advanced topics from the syllabus. \n\n**Rules:**\n1. No external resources allowed.\n2. You must achieve a score of 100% to pass.\n3. Analyze every byte-code implication before answering.'
        }
      ],
      quiz: allQuestions
    };
  }, []);

  const activeTopic = isExamMode 
    ? finalExamTopic 
    : (COURSE_TOPICS.find(t => t.id === activeTopicId) || COURSE_TOPICS[0]);

  const categories = Array.from(new Set(COURSE_TOPICS.map(t => t.category)));

  const handleTopicSelect = (id: string) => {
    setIsExamMode(false);
    setActiveTopicId(id);
    setViewMode(ViewMode.LEARN);
  };

  const handleExamSelect = () => {
    setIsExamMode(true);
    setViewMode(ViewMode.QUIZ); // Jump straight to quiz
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-gradient-to-tr from-android-green to-blue-500 rounded-lg shadow-lg flex items-center justify-center">
                <span className="font-mono font-bold text-black text-xs">PRO</span>
             </div>
             <h1 className="font-bold text-lg tracking-tight text-white">Android<span className="font-light opacity-70">Master</span></h1>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          {categories.map(cat => (
            <div key={cat}>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 pl-2">{cat}</h3>
              <ul className="space-y-1">
                {COURSE_TOPICS.filter(t => t.category === cat).map(topic => (
                  <li key={topic.id}>
                    <button
                      onClick={() => handleTopicSelect(topic.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border border-transparent ${
                        !isExamMode && activeTopicId === topic.id 
                          ? 'bg-blue-600/10 text-blue-400 border-blue-600/20' 
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                      }`}
                    >
                      {topic.title.split(':')[0]} {/* Truncate overly long titles for sidebar */}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <button 
                onClick={handleExamSelect}
                className={`group w-full flex flex-col items-center justify-center gap-1 py-4 rounded-lg border transition-all duration-300 relative overflow-hidden ${
                    isExamMode 
                    ? 'bg-amber-500/10 border-amber-500 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-amber-500/50 hover:text-amber-400'
                }`}
            >
                <div className="flex items-center gap-2 font-bold text-sm z-10">
                    <span className="text-lg">🎓</span> QUIZ
                </div>
                <span className="text-[10px] uppercase tracking-wider opacity-70 z-10">All-in-One Examination</span>
                
                {/* Subtle sheen effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] transition-transform duration-1000 ${isExamMode ? 'translate-x-[100%]' : 'group-hover:translate-x-[100%]'}`} />
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative bg-[#0f172a]">
        <div className="flex-1 overflow-y-auto scroll-smooth w-full">
          <TopicViewer 
            topic={activeTopic} 
            mode={viewMode}
            setMode={setViewMode}
          />
        </div>
      </main>
    </div>
  );
};

export default App;