import React, { useState, useEffect } from 'react';
import { Topic, ViewMode } from '../types';
import CodeBlock from './CodeBlock';
import LifecycleDiagram from './visualizations/LifecycleDiagram';
import RecyclerViewDemo from './visualizations/RecyclerViewDemo';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TopicViewerProps {
  topic: Topic;
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
}

const TopicViewer: React.FC<TopicViewerProps> = ({ topic, mode, setMode }) => {
  // Quiz State
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Reset quiz state when topic changes
  useEffect(() => {
    setAnswers({});
    setIsSubmitted(false);
    setScore(0);
  }, [topic.id]);

  const renderVisualization = () => {
    if (topic.id === 'components-lifecycle') return <LifecycleDiagram />;
    if (topic.id === 'recycler-scroll') return <RecyclerViewDemo />;
    return null;
  };

  const handleOptionSelect = (qIndex: number, optIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!topic.quiz) return;
    let calculatedScore = 0;
    topic.quiz.forEach((q, i) => {
      if (answers[i] === q.correctIndex) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    setAnswers({});
    setIsSubmitted(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Quiz Mode
  if (mode === ViewMode.QUIZ) {
    if (!topic.quiz || topic.quiz.length === 0) {
      return (
        <div className="p-8 max-w-3xl mx-auto text-center mt-20">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">No Quiz Data</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">This module does not have an active examination.</p>
          <button
            onClick={() => setMode(ViewMode.LEARN)}
            className="px-8 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 font-semibold"
          >
            Return to Content
          </button>
        </div>
      );
    }

    const percentage = Math.round((score / topic.quiz.length) * 100);
    let gradeColor = 'text-blue-400';
    if (percentage >= 90) gradeColor = 'text-emerald-400';
    if (percentage < 60) gradeColor = 'text-red-400';

    return (
      <div className="p-8 max-w-4xl mx-auto animate-fade-in">
        <div className="sticky top-0 z-10 bg-slate-50/95 dark:bg-[#0f172a]/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 pb-4 mb-8 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{topic.title}</h2>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Question Count: {topic.quiz.length}</span>
            </div>
            {isSubmitted && (
              <div className="text-right">
                <div className={`text-3xl font-black ${gradeColor}`}>
                  {percentage}%
                </div>
                <div className="text-sm text-slate-400">Score: {score} / {topic.quiz.length}</div>
              </div>
            )}
          </div>
        </div>

        {topic.quiz.map((q, qIndex) => {
          const isCorrect = answers[qIndex] === q.correctIndex;
          const showResult = isSubmitted;
          const isAnswered = answers[qIndex] !== undefined;

          return (
            <div key={qIndex} className={`mb-8 p-6 rounded-xl border transition-all duration-300 ${showResult
              ? isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-500/50' : 'bg-red-50 dark:bg-red-900/10 border-red-500/50'
              : isAnswered ? 'bg-white dark:bg-slate-800 border-blue-500/30 shadow-sm' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
              }`}>
              <div className="flex gap-4 mb-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono text-sm border border-slate-300 dark:border-slate-600">
                  {qIndex + 1}
                </span>
                <p className="font-medium text-lg text-slate-800 dark:text-slate-100 pt-1 leading-relaxed">
                  {q.question}
                </p>
              </div>

              <div className="pl-12 space-y-3">
                {q.options.map((opt, optIndex) => {
                  let optionClass = "p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between text-sm ";

                  if (showResult) {
                    if (optIndex === q.correctIndex) {
                      optionClass += "bg-emerald-500/20 border-emerald-500 text-emerald-100 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
                    } else if (answers[qIndex] === optIndex && optIndex !== q.correctIndex) {
                      optionClass += "bg-red-500/20 border-red-500 text-red-100";
                    } else {
                      optionClass += "bg-slate-900 border-transparent opacity-40 grayscale";
                    }
                  } else {
                    if (answers[qIndex] === optIndex) {
                      optionClass += "bg-blue-600 border-blue-500 text-white shadow-lg scale-[1.01]";
                    } else {
                      optionClass += "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500";
                    }
                  }

                  return (
                    <div
                      key={optIndex}
                      onClick={() => handleOptionSelect(qIndex, optIndex)}
                      className={optionClass}
                    >
                      {opt}
                      {showResult && optIndex === q.correctIndex && (
                        <span className="ml-2 text-[10px] font-bold bg-emerald-500 text-black px-2 py-0.5 rounded uppercase tracking-wider">Correct Answer</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {showResult && (
                <div className="mt-6 ml-12 p-5 bg-slate-900 rounded-lg border-l-4 border-blue-500 text-slate-300 text-sm animate-fade-in shadow-inner">
                  <strong className="text-blue-400 block mb-2 uppercase tracking-wide text-xs">Technical Explanation</strong>
                  <div className="leading-relaxed opacity-90">{q.explanation}</div>
                </div>
              )}
            </div>
          );
        })}

        <div className="flex flex-col md:flex-row gap-4 mt-12 pb-20 border-t border-slate-700 pt-8">
          {!isSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(answers).length !== topic.quiz.length}
              className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition shadow-xl shadow-blue-900/20"
            >
              {Object.keys(answers).length !== topic.quiz.length
                ? `Answer all ${topic.quiz.length} questions to submit`
                : 'Submit Final Defense'}
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-lg transition border border-slate-500"
            >
              Retake Examination
            </button>
          )}

          {/* Only show Back to Learning if NOT in exam mode (or if user wants to quit) */}
          <button
            onClick={() => setMode(ViewMode.LEARN)}
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl font-semibold"
          >
            {topic.id === 'doctoral-defense' ? 'View Protocol' : 'Back to Content'}
          </button>
        </div>
      </div>
    )
  }

  // Render Learn Mode
  return (
    <div className="max-w-4xl mx-auto p-8 animate-fade-in">
      <header className="mb-8 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-blue-600 dark:text-blue-400 text-sm font-mono uppercase tracking-wider">{topic.category}</span>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mt-2">{topic.title}</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg leading-relaxed max-w-2xl">{topic.description}</p>
          </div>
          {topic.quiz && topic.quiz.length > 0 && (
            <button
              onClick={() => setMode(ViewMode.QUIZ)}
              className="flex-shrink-0 ml-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-emerald-900/20 transition-all hover:scale-105 hover:shadow-emerald-900/40 flex items-center gap-2"
            >
              <span>Start Quiz</span>
              <span className="bg-emerald-800 px-2 py-0.5 rounded text-xs">{topic.quiz.length} Qs</span>
            </button>
          )}
        </div>
      </header>

      {renderVisualization() && (
        <div className="mb-12 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-500 pl-3">Interactive Simulation</h3>
          {renderVisualization()}
        </div>
      )}

      <div className="space-y-16 pb-12">
        {topic.sections.map((section, idx) => (
          <section key={idx} className="group relative">
            {/* Connector Line */}
            {idx !== topic.sections.length - 1 && (
              <div className="absolute left-[15px] top-12 bottom-[-4rem] w-0.5 bg-slate-800 group-last:hidden"></div>
            )}

            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center sticky top-0 bg-slate-50 dark:bg-[#0f172a] py-2 z-10 transition-colors duration-300">
              <span className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm mr-4 border border-slate-200 dark:border-slate-700 font-mono shadow-md">
                {idx + 1}
              </span>
              {section.title}
            </h2>

            <div className="ml-12 prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-7 text-lg">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  strong: ({ node, ...props }) => <strong className="text-slate-900 dark:text-white font-bold bg-slate-100 dark:bg-white/5 px-1 rounded" {...props} />,
                  table: ({ node, ...props }) => <div className="overflow-x-auto my-6 rounded-lg border border-slate-200 dark:border-slate-700"><table className="w-full text-left border-collapse" {...props} /></div>,
                  thead: ({ node, ...props }) => <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" {...props} />,
                  tbody: ({ node, ...props }) => <tbody className="bg-white dark:bg-slate-900/50 divide-y divide-slate-200 dark:divide-slate-800" {...props} />,
                  tr: ({ node, ...props }) => <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors" {...props} />,
                  th: ({ node, ...props }) => <th className="p-4 font-semibold text-sm uppercase tracking-wider border-b border-slate-200 dark:border-slate-700" {...props} />,
                  td: ({ node, ...props }) => <td className="p-4 text-sm border-r border-slate-100 dark:border-slate-700/50 last:border-0" {...props} />,
                  code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <div className="not-prose my-6 shadow-2xl rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                        <CodeBlock code={String(children).replace(/\n$/, '')} language={match[1] as any} />
                      </div>
                    ) : (
                      <code className="bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200 dark:border-slate-700/50" {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {section.content}
              </ReactMarkdown>
            </div>

            {section.codeSnippet && (
              <div className="ml-12 mt-8 shadow-2xl">
                <CodeBlock code={section.codeSnippet.code} language={section.codeSnippet.language} />
                {section.codeSnippet.description && (
                  <p className="text-sm text-slate-500 mt-3 italic border-l-2 border-slate-700 pl-4 py-1">{section.codeSnippet.description}</p>
                )}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default TopicViewer;