import React, { useState, useMemo } from 'react';
import { useTheme } from './components/ThemeContext';
import { COURSE_TOPICS } from './data/courseContent';
import { Topic, ViewMode } from './types';
import TopicViewer from './components/TopicViewer';
import FlashcardsViewer from './components/FlashcardsViewer';
import VideoPlayer from './components/VideoPlayer';
import ExamModule from './components/ExamModule';

type AppMode = 'topics' | 'flashcards' | 'videos' | 'exam' | 'examModule';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTopicId, setActiveTopicId] = useState<string>(COURSE_TOPICS[0]?.id || '');
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.LEARN);
  const [appMode, setAppMode] = useState<AppMode>('topics');

  // Dynamically generate the Final Exam Topic
  const finalExamTopic: Topic = useMemo(() => {
    const allQuestions = COURSE_TOPICS.flatMap(t => t.quiz || []);
    return {
      id: 'doctoral-defense',
      title: 'QUIZ',
      category: 'Android System',
      description: 'The ultimate cumulative examination covering all topics.',
      sections: [
        {
          title: 'Examination Protocol',
          content: 'You are about to begin the **Comprehensive Exam**. \n\nThis exam aggregates all topics from the syllabus.'
        }
      ],
      quiz: allQuestions
    };
  }, []);

  const activeTopic = appMode === 'exam'
    ? finalExamTopic
    : (COURSE_TOPICS.find(t => t.id === activeTopicId) || COURSE_TOPICS[0]);

  const categories = Array.from(new Set(COURSE_TOPICS.map(t => t.category)));

  const handleTopicSelect = (id: string) => {
    setAppMode('topics');
    setActiveTopicId(id);
    setViewMode(ViewMode.LEARN);
  };

  const handleExamSelect = () => {
    setAppMode('exam');
    setViewMode(ViewMode.QUIZ);
  };

  const handleFlashcardsSelect = () => {
    setAppMode('flashcards');
  };

  const handleVideosSelect = () => {
    setAppMode('videos');
  };

  const handleExamModuleSelect = () => {
    setAppMode('examModule');
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col flex-shrink-0 transition-colors duration-300">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-android-green to-blue-500 rounded-lg shadow-lg flex items-center justify-center">
              <span className="font-mono font-bold text-black text-xs">PRO</span>
            </div>
            <h1 className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">Kotlin<span className="font-light opacity-70">Master</span></h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          {categories.map(cat => (
            <div key={cat}>
              <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 pl-2">{cat}</h3>
              <ul className="space-y-1">
                {COURSE_TOPICS.filter(t => t.category === cat).map(topic => (
                  <li key={topic.id}>
                    <button
                      onClick={() => handleTopicSelect(topic.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border border-transparent ${appMode === 'topics' && activeTopicId === topic.id
                        ? 'bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-600/20'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                      {topic.title.split(':')[0]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
          {/* Exam Module Button */}
          <button
            onClick={handleExamModuleSelect}
            className={`group w-full flex flex-col items-center justify-center gap-1 py-4 rounded-lg border transition-all duration-300 relative overflow-hidden ${appMode === 'examModule'
              ? 'bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500 text-orange-600 dark:text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.1)]'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400'
              }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm z-10">
              <span className="text-lg">📝</span> EXAM PREP
            </div>
            <span className="text-[10px] uppercase tracking-wider opacity-70 z-10">Theory + Quiz</span>
          </button>

          {/* Videos Button */}
          <button
            onClick={handleVideosSelect}
            className={`group w-full flex flex-col items-center justify-center gap-1 py-4 rounded-lg border transition-all duration-300 relative overflow-hidden ${appMode === 'videos'
              ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500 text-red-600 dark:text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:border-red-500/50 hover:text-red-600 dark:hover:text-red-400'
              }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm z-10">
              <span className="text-lg">🎬</span> FILMIK
            </div>
            <span className="text-[10px] uppercase tracking-wider opacity-70 z-10">Nagrania wideo</span>
          </button>

          {/* Flashcards Button */}
          <button
            onClick={handleFlashcardsSelect}
            className={`group w-full flex flex-col items-center justify-center gap-1 py-4 rounded-lg border transition-all duration-300 relative overflow-hidden ${appMode === 'flashcards'
              ? 'bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500 text-purple-600 dark:text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.1)]'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:border-purple-500/50 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm z-10">
              <span className="text-lg">📚</span> FISZKI
            </div>
            <span className="text-[10px] uppercase tracking-wider opacity-70 z-10">90 pytań do nauki</span>
          </button>

          {/* Quiz Button */}
          <button
            onClick={handleExamSelect}
            className={`group w-full flex flex-col items-center justify-center gap-1 py-4 rounded-lg border transition-all duration-300 relative overflow-hidden ${appMode === 'exam'
              ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500 text-amber-600 dark:text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400'
              }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm z-10">
              <span className="text-lg">🎓</span> QUIZ
            </div>
            <span className="text-[10px] uppercase tracking-wider opacity-70 z-10">Egzamin końcowy</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">
        <div className="flex-1 overflow-y-auto scroll-smooth w-full">
          {appMode === 'flashcards' ? (
            <FlashcardsViewer />
          ) : appMode === 'videos' ? (
            <VideoPlayer />
          ) : appMode === 'examModule' ? (
            <ExamModule />
          ) : (
            <TopicViewer
              topic={activeTopic}
              mode={viewMode}
              setMode={setViewMode}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;


