import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { CURRICULUM, APP_NAME } from './constants';
import { DocContent } from './components/DocContent';
import { CodeRunner } from './components/CodeRunner';
import { Menu, Moon, Sun, Search, Github, ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [currentLessonId, setCurrentLessonId] = useState<string>(CURRICULUM[0].lessons[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Flat list of all lessons for navigation
  const allLessons = CURRICULUM.flatMap(chapter => chapter.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  
  // Find current lesson data
  const currentChapter = CURRICULUM.find(ch => ch.lessons.some(l => l.id === currentLessonId));
  const currentLesson = currentChapter?.lessons.find(l => l.id === currentLessonId);

  // Dark mode toggle
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleNext = () => {
    if (currentIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentIndex + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentLessonId(allLessons[currentIndex - 1].id);
      window.scrollTo(0, 0);
    }
  };

  if (!currentLesson) return <div>404 Not Found</div>;

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-dark-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar */}
      <Sidebar 
        currentLessonId={currentLessonId} 
        onSelectLesson={setCurrentLessonId}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        
        {/* Top Navigation */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm z-40 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-[200px]">
                {currentChapter?.title}
              </span>
              <h1 className="text-lg font-bold truncate max-w-[250px]">{currentLesson.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg hidden sm:block">
              <Github size={20} />
            </a>
          </div>
        </header>

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
            {/* Breadcrumb-ish */}
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 mb-4">
                {currentChapter?.title}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                {currentLesson.title}
              </h1>
            </div>

            {/* Render MDX-like Content */}
            <DocContent blocks={currentLesson.content} />

            {/* Exercise Section */}
            {currentLesson.exercise && (
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="bg-gradient-to-br from-primary-50 to-white dark:from-slate-800 dark:to-dark-900 p-6 rounded-2xl border border-primary-100 dark:border-slate-700">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <span className="bg-primary-600 text-white text-sm font-bold px-2 py-1 rounded shadow-sm">BÀI TẬP</span>
                    {currentLesson.exercise.title}
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                    {currentLesson.exercise.description}
                  </p>
                  
                  {/* The Interactive Coding Environment */}
                  <CodeRunner exercise={currentLesson.exercise} />
                </div>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="mt-16 flex justify-between border-t border-slate-200 dark:border-slate-800 pt-8 pb-20">
              <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentIndex === 0 ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'text-slate-500 hover:text-primary-600'}`}
              >
                <ChevronLeft size={16} />
                Bài trước
              </button>
              <button 
                onClick={handleNext}
                disabled={currentIndex === allLessons.length - 1}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentIndex === allLessons.length - 1 ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'text-slate-500 hover:text-primary-600'}`}
              >
                Bài tiếp theo
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
