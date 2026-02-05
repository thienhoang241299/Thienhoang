import React from 'react';
import { ContentBlock } from '../types';
import { AlertCircle, Lightbulb, Info, FileCode, Target, Zap, Bug } from 'lucide-react';

interface DocContentProps {
  blocks: ContentBlock[];
}

export const DocContent: React.FC<DocContentProps> = ({ blocks }) => {
  return (
    <div className="space-y-6 max-w-4xl">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'heading':
            const isTrựcGiác = block.content.includes("Trực giác");
            const isĐộPhứcTạp = block.content.includes("Độ phức tạp");
            const isSaiLầm = block.content.includes("Sai lầm");

            return block.level === 2 ? (
              <h2 key={idx} className={`text-2xl font-bold mt-10 mb-5 pb-2 border-b flex items-center gap-2 ${
                isTrựcGiác ? 'text-primary-600 border-primary-100' : 
                isĐộPhứcTạp ? 'text-amber-600 border-amber-100' : 
                isSaiLầm ? 'text-red-600 border-red-100' :
                'text-slate-900 dark:text-white border-slate-200 dark:border-slate-800'
              }`}>
                {isTrựcGiác && <Target size={24} />}
                {isĐộPhứcTạp && <Zap size={24} />}
                {isSaiLầm && <Bug size={24} />}
                {block.content}
              </h2>
            ) : (
              <h3 key={idx} className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary-500 rounded-full"></span>
                {block.content}
              </h3>
            );

          case 'text':
            return (
              <p key={idx} className="text-[17px] text-slate-600 dark:text-slate-300 leading-8 whitespace-pre-line">
                {block.content}
              </p>
            );

          case 'code':
            return (
              <div key={idx} className="my-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0d1117] shadow-sm">
                {block.title && (
                  <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-500 flex items-center gap-2">
                    <FileCode size={14} className="text-primary-500" />
                    {block.title}
                  </div>
                )}
                <div className="p-5 overflow-x-auto bg-[#0d1117]">
                  <pre className="text-[14.5px] font-mono text-[#e6edf3] leading-relaxed">
                    <code>{block.content}</code>
                  </pre>
                </div>
              </div>
            );

          case 'alert':
            const styles = {
              info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
              warning: 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800',
              tip: 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
            };
            const icons = {
              info: <Info size={22} />,
              warning: <AlertCircle size={22} />,
              tip: <Lightbulb size={22} />,
            };
            return (
              <div key={idx} className={`flex gap-4 p-5 rounded-xl border-l-4 shadow-sm ${styles[block.variant]}`}>
                <div className="shrink-0 pt-0.5">{icons[block.variant]}</div>
                <div className="text-[15px] font-medium leading-7">{block.content}</div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};