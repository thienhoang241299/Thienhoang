import React from "react";
import { CURRICULUM } from "../constants";
import { ChevronRight, BookOpen, Code, Terminal } from "lucide-react";
import { Chapter, Lesson } from "../types";

interface SidebarProps {
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentLessonId,
  onSelectLesson,
  isOpen,
  onCloseMobile,
}) => {
  return (
    <aside
      className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-slate-50 dark:bg-dark-900 border-r border-slate-200 dark:border-slate-800
      transform transition-transform duration-200 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:relative md:translate-x-0
    `}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <Terminal className="w-6 h-6 text-primary-600" />
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
            Thienhb
          </span>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {CURRICULUM.map((chapter: Chapter) => (
            <div key={chapter.id}>
              <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {chapter.title}
              </h3>
              <ul className="space-y-1">
                {chapter.lessons.map((lesson: Lesson) => {
                  const isActive = lesson.id === currentLessonId;
                  return (
                    <li key={lesson.id}>
                      <button
                        onClick={() => {
                          onSelectLesson(lesson.id);
                          onCloseMobile();
                        }}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors
                          ${
                            isActive ?
                              "bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                          }
                        `}
                      >
                        {lesson.exercise ?
                          <Code size={16} />
                        : <BookOpen size={16} />}
                        <span className="truncate text-left">
                          {lesson.title}
                        </span>
                        {isActive && (
                          <ChevronRight size={14} className="ml-auto" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-xs text-center text-slate-500">
          © 2026 Thienhb99. All rights reserved.
        </div>
      </div>
    </aside>
  );
};
