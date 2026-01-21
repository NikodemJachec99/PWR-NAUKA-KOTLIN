import React, { useState } from 'react';

interface Video {
    id: string;
    title: string;
    filename: string;
    description?: string;
}

// Add your videos here - just add the filename after placing the .mp4 in public/videos/
export const VIDEOS: Video[] = [
    {
        id: 'Filmik',
        title: 'Filmik',
        filename: 'Android_App_Fundamentals.mp4',
        description: 'Wprowadzenie do Kotlina'
    },

];

const VideoPlayer: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(
        VIDEOS.length > 0 ? VIDEOS[0] : null
    );

    if (VIDEOS.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8">
                <div className="text-6xl mb-4">🎬</div>
                <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">Brak wykładów</h2>
                <p className="text-slate-500 dark:text-slate-500 text-center max-w-md">
                    Dodaj pliki .mp4 do folderu <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">public/videos/</code>
                    <br />i zaktualizuj listę VIDEOS w <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">VideoPlayer.tsx</code>
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>🎬</span> Wykłady
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    {VIDEOS.length} {VIDEOS.length === 1 ? 'wykład' : 'wykładów'} dostępnych
                </p>
            </div>

            <div className="flex gap-6 flex-1 min-h-0">
                {/* Video List */}
                <div className="w-64 flex-shrink-0 space-y-2 overflow-y-auto">
                    {VIDEOS.map((video) => (
                        <button
                            key={video.id}
                            onClick={() => setSelectedVideo(video)}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${selectedVideo?.id === video.id
                                ? 'bg-blue-50 dark:bg-blue-600/10 border-blue-200 dark:border-blue-600/50 text-blue-600 dark:text-blue-400'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span>📹</span>
                                <span className="font-medium">{video.title}</span>
                            </div>
                            {video.description && (
                                <p className="text-xs text-slate-500 dark:text-slate-500 ml-6">{video.description}</p>
                            )}
                        </button>
                    ))}
                </div>

                {/* Video Player */}
                <div className="flex-1 flex flex-col min-w-0">
                    {selectedVideo ? (
                        <>
                            <div className="bg-black rounded-xl overflow-hidden flex-1 flex items-center justify-center">
                                <video
                                    key={selectedVideo.id}
                                    controls
                                    className="max-w-full max-h-full"
                                    src={`/videos/${selectedVideo.filename}`}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="mt-4">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedVideo.title}</h2>
                                {selectedVideo.description && (
                                    <p className="text-slate-600 dark:text-slate-400 mt-1">{selectedVideo.description}</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-slate-500">
                            Wybierz wykład z listy
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
