import React, { useState, useEffect } from 'react';
import { FLASHCARDS, Flashcard } from '../data/flashcards';

const FlashcardsViewer: React.FC = () => {
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
            ? [...FLASHCARDS]
            : FLASHCARDS.filter(c => !knownCards.has(c.id));

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
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Gratulacje!</h2>
                <p className="text-slate-400 mb-6">Znasz wszystkie fiszki!</p>
                <button
                    onClick={resetProgress}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                >
                    Zacznij od nowa
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span>📚</span> Fiszki
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Karta {currentIndex + 1} z {shuffledCards.length} |
                        Znasz: {knownCards.size}/{FLASHCARDS.length}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setMode(mode === 'all' ? 'unknown' : 'all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'unknown'
                                ? 'bg-amber-600 text-white'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            }`}
                    >
                        {mode === 'all' ? 'Wszystkie' : 'Tylko nieznane'}
                    </button>
                    <button
                        onClick={shuffleCards}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
                    >
                        🔀 Przetasuj
                    </button>
                    <button
                        onClick={resetProgress}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
                    >
                        🔄 Reset
                    </button>
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-700 rounded-full mb-6 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Flashcard */}
            <div className="flex-1 flex items-center justify-center">
                <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="w-full max-w-2xl h-80 cursor-pointer perspective-1000"
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
                            className="absolute w-full h-full rounded-2xl p-8 flex flex-col items-center justify-center text-center backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl"
                            style={{ backfaceVisibility: 'hidden' }}
                        >
                            <div className="text-blue-400 text-sm font-semibold mb-4 uppercase tracking-wider">
                                Pytanie
                            </div>
                            <p className="text-xl text-white leading-relaxed">
                                {currentCard?.question}
                            </p>
                            <div className="mt-6 text-slate-500 text-sm">
                                Kliknij, aby zobaczyć odpowiedź
                            </div>
                        </div>

                        {/* Back - Answer */}
                        <div
                            className="absolute w-full h-full rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-green-900/50 to-slate-900 border border-green-700/50 shadow-xl"
                            style={{
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)'
                            }}
                        >
                            <div className="text-green-400 text-sm font-semibold mb-4 uppercase tracking-wider">
                                Odpowiedź
                            </div>
                            <p className="text-xl text-white leading-relaxed">
                                {currentCard?.answer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
                <button
                    onClick={prevCard}
                    disabled={currentIndex === 0}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                >
                    ← Poprzednia
                </button>

                <button
                    onClick={markAsKnown}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    ✓ Znam to!
                </button>

                <button
                    onClick={nextCard}
                    disabled={currentIndex === shuffledCards.length - 1}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                >
                    Następna →
                </button>
            </div>

            {/* Keyboard hints */}
            <div className="text-center mt-4 text-slate-500 text-sm">
                Użyj <kbd className="px-2 py-1 bg-slate-700 rounded">Space</kbd> aby odwrócić |
                <kbd className="px-2 py-1 bg-slate-700 rounded ml-2">←</kbd> <kbd className="px-2 py-1 bg-slate-700 rounded">→</kbd> nawigacja
            </div>
        </div>
    );
};

export default FlashcardsViewer;
