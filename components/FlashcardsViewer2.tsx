import React, { useState, useEffect } from 'react';
import { FLASHCARDS_2 } from '../data/flashcards2';
import { Flashcard } from '../data/flashcards'; // Reusing the interface

const FlashcardsViewer2: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);
    const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
    const [mode, setMode] = useState<'all' | 'unknown'>('all');

    useEffect(() => {
        shuffleCards();
    }, [mode]);

    const shuffleCards = () => {
        let cards = mode === 'all'
            ? [...FLASHCARDS_2]
            : FLASHCARDS_2.filter(c => !knownCards.has(c.id));

        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        setShuffledCards(cards);
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    const nextCard = () => {
        if (currentIndex < shuffledCards.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsFlipped(false);
        }
    };

    const prevCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setIsFlipped(false);
        }
    };

    const markAsKnown = () => {
        const card = shuffledCards[currentIndex];
        setKnownCards(new Set([...knownCards, card.id]));
        nextCard();
    };

    const resetProgress = () => {
        setKnownCards(new Set());
        shuffleCards();
    };

    const currentCard = shuffledCards[currentIndex];
    const progress = shuffledCards.length > 0
        ? ((currentIndex + 1) / shuffledCards.length) * 100
        : 0;

    if (shuffledCards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4">Master Class!</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Opanowałeś wszystkie zaawansowane zagadnienia!</p>
                <button
                    onClick={resetProgress}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-semibold transition-colors text-white"
                >
                    Zacznij od nowa
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>🧠</span> <span className="hidden sm:inline">Advanced Concepts</span><span className="sm:hidden">Zaawansowane</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
                        Karta {currentIndex + 1} z {shuffledCards.length} |
                        Znasz: {knownCards.size}/{FLASHCARDS_2.length}
                    </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setMode(mode === 'all' ? 'unknown' : 'all')}
                        className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${mode === 'unknown'
                            ? 'bg-amber-600 text-white shadow-md'
                            : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-transparent'
                            }`}
                    >
                        {mode === 'all' ? 'Wszystkie' : 'Nieznane'}
                    </button>
                    <button
                        onClick={shuffleCards}
                        className="px-3 sm:px-4 py-2 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-lg text-xs sm:text-sm font-medium transition-colors border border-slate-200 dark:border-transparent text-slate-600 dark:text-slate-300"
                    >
                        🔀
                    </button>
                    <button
                        onClick={resetProgress}
                        className="px-3 sm:px-4 py-2 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-lg text-xs sm:text-sm font-medium transition-colors border border-slate-200 dark:border-transparent text-slate-600 dark:text-slate-300"
                    >
                        🔄
                    </button>
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-4 sm:mb-6 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Flashcard */}
            <div className="flex-1 flex items-center justify-center min-h-0">
                <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="w-full max-w-4xl h-72 sm:h-96 lg:h-[32rem] cursor-pointer perspective-1000"
                >
                    <div
                        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''
                            }`}
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                        }}
                    >
                        {/* Front - Question */}
                        <div
                            className="absolute w-full h-full rounded-2xl p-4 sm:p-6 lg:p-10 flex flex-col items-center justify-center text-center backface-hidden bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 shadow-2xl overflow-y-auto"
                            style={{ backfaceVisibility: 'hidden' }}
                        >
                            <div className="text-teal-600 dark:text-teal-400 text-xs sm:text-sm font-bold mb-3 sm:mb-6 uppercase tracking-widest bg-teal-50 dark:bg-teal-900/30 px-3 sm:px-4 py-1 rounded-full">
                                Zagadnienie
                            </div>
                            <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white leading-tight max-w-3xl">
                                {currentCard?.question}
                            </h3>
                            <div className="mt-6 sm:mt-12 flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs sm:text-sm animate-pulse">
                                <span>👆</span> Kliknij, aby zobaczyć wyjaśnienie
                            </div>
                        </div>

                        {/* Back - Answer */}
                        <div
                            className="absolute w-full h-full rounded-2xl p-4 sm:p-6 lg:p-10 flex flex-col items-start justify-start text-left bg-teal-50 dark:bg-slate-900 border-2 border-teal-200 dark:border-teal-800 shadow-2xl overflow-y-auto custom-scrollbar"
                            style={{
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)'
                            }}
                        >
                            <div className="w-full text-center border-b border-teal-200/50 dark:border-teal-700/30 pb-2 sm:pb-4 mb-3 sm:mb-6">
                                <div className="text-teal-700 dark:text-teal-400 text-xs sm:text-sm font-bold uppercase tracking-widest">
                                    Wyjaśnienie
                                </div>
                            </div>
                            <div className="prose prose-slate dark:prose-invert max-w-none w-full">
                                <div className="whitespace-pre-line text-sm sm:text-base lg:text-lg text-slate-800 dark:text-slate-200 leading-relaxed">
                                    {currentCard?.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
                <button
                    onClick={prevCard}
                    disabled={currentIndex === 0}
                    className="px-3 sm:px-6 py-2 sm:py-3 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm sm:text-base font-medium transition-colors border border-slate-200 dark:border-transparent text-slate-700 dark:text-white"
                >
                    ←
                </button>

                <button
                    onClick={markAsKnown}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-teal-600 hover:bg-teal-700 rounded-lg text-sm sm:text-base font-medium transition-colors flex items-center gap-2 text-white shadow-lg shadow-teal-500/20"
                >
                    ✓ <span className="hidden sm:inline">Zrozumiałem!</span>
                </button>

                <button
                    onClick={nextCard}
                    disabled={currentIndex === shuffledCards.length - 1}
                    className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm sm:text-base font-medium transition-colors shadow-md"
                >
                    →
                </button>
            </div>

            {/* Keyboard hints - hidden on mobile */}
            <div className="hidden sm:block text-center mt-4 text-slate-400 dark:text-slate-500 text-sm">
                Użyj <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded font-mono">Space</kbd> aby odwrócić |
                <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded ml-2 font-mono">←</kbd> <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded font-mono">→</kbd> nawigacja
            </div>
            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                
                /* Custom scrollbar for long answers */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(156, 163, 175, 0.5);
                    border-radius: 20px;
                }
            `}</style>
        </div>
    );
};

export default FlashcardsViewer2;
