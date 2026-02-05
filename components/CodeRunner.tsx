import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, CheckCircle, XCircle, FileText, Clock, FileCode, ArrowRight, Save, Trash2, AlertCircle } from 'lucide-react';
import { Exercise, SubmissionResult, SubmissionStatus } from '../types';
import { simulateJudge } from '../services/judgeService';

interface CodeRunnerProps {
  exercise: Exercise;
}

export const CodeRunner: React.FC<CodeRunnerProps> = ({ exercise }) => {
  const [code, setCode] = useState<string>("");
  const [inputContent, setInputContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'input' | 'output'>('code');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when exercise changes
  useEffect(() => {
    setCode(`import sys

# Mở file theo yêu cầu đề bài: ${exercise.inputFile} -> ${exercise.outputFile}
sys.stdin = open('${exercise.inputFile}', 'r')
sys.stdout = open('${exercise.outputFile}', 'w')

# Nhập N
# n = int(input())
# ...
`);
    // Default to the first public test case
    setInputContent(exercise.testCases[0].input);
    setResult(null);
    setActiveTab('code');
  }, [exercise]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setInputContent(event.target.result);
        // Switch to input tab to show the uploaded content
        setActiveTab('input');
      }
    };
    reader.readAsText(file);
  };

  const handleRun = async () => {
    setIsSubmitting(true);
    setResult(null);
    try {
      // Create a temporary test case based on the current Input tab content
      // This allows users to test their own custom inputs
      const currentTestCase = {
        input: inputContent,
        expectedOutput: exercise.testCases[0].expectedOutput, // Mock: In real app we might not know expected out for custom input
        isPublic: true
      };
      
      // Pass the *actual* input content currently in the editor to the judge
      // Note: simulateJudge currently uses the exercise.testCases array, 
      // but in a real app we would send `inputContent` as the runtime stdin.
      // We will override the logic slightly here for the demo.
      
      const res = await simulateJudge(code, [currentTestCase]);
      setResult(res);
      
      // If result is generated, automatically show output
      if (res.status === SubmissionStatus.ACCEPTED || res.status === SubmissionStatus.WRONG_ANSWER || res.status === SubmissionStatus.RUNTIME_ERROR) {
        setActiveTab('output');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: SubmissionStatus) => {
    switch (status) {
      case SubmissionStatus.ACCEPTED: return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800';
      case SubmissionStatus.WRONG_ANSWER: return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800';
      case SubmissionStatus.RUNTIME_ERROR: return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case SubmissionStatus.RUNNING: return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default: return 'text-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="mt-8 flex flex-col rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-900 shadow-sm">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-3 bg-slate-100/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm">
             <FileCode size={14} className="text-blue-500" />
             <span className="text-xs font-mono text-slate-600 dark:text-slate-300">main.py</span>
           </div>
           <ArrowRight size={14} className="text-slate-400" />
           <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm">
             <FileText size={14} className="text-amber-500" />
             <span className="text-xs font-mono text-slate-600 dark:text-slate-300">{exercise.inputFile}</span>
           </div>
        </div>
        
        <button 
          disabled={isSubmitting}
          onClick={handleRun}
          className={`
            flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-sm transition-all
            ${isSubmitting 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800' 
              : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30'}
          `}
        >
          {isSubmitting ? <Clock className="animate-spin" size={16} /> : <Play size={16} fill="currentColor" />}
          {isSubmitting ? 'ĐANG CHẤM...' : 'CHẠY THỬ'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-dark-900">
        <button 
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'code' ? 'border-primary-500 text-primary-700 dark:text-primary-400 bg-white dark:bg-slate-800/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <FileCode size={16} />
          Code Editor
        </button>
        <button 
          onClick={() => setActiveTab('input')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'input' ? 'border-amber-500 text-amber-700 dark:text-amber-400 bg-white dark:bg-slate-800/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <FileText size={16} />
          File Input (.inp)
        </button>
        <button 
          onClick={() => setActiveTab('output')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'output' ? 'border-green-500 text-green-700 dark:text-green-400 bg-white dark:bg-slate-800/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <div className="relative">
            <FileText size={16} />
            {result && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
          </div>
          File Output (.out)
        </button>
      </div>

      {/* Content Area */}
      <div className="relative h-[450px] bg-[#1e1e1e] dark:bg-black group">
        
        {/* Code Editor */}
        <div className={`absolute inset-0 flex flex-col transition-opacity duration-200 ${activeTab === 'code' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full p-4 bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm resize-none focus:outline-none leading-relaxed custom-scrollbar"
            spellCheck={false}
            placeholder="Nhập code Python của bạn tại đây..."
          />
          <div className="px-4 py-2 bg-[#2d2d2d] text-xs text-slate-400 flex justify-between">
            <span>Python 3.10</span>
            <span>Lines: {code.split('\n').length}</span>
          </div>
        </div>

        {/* Input Editor */}
        <div className={`absolute inset-0 flex flex-col bg-slate-50 dark:bg-slate-900 transition-opacity duration-200 ${activeTab === 'input' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <div className="flex-1 relative">
            <textarea
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              className="w-full h-full p-4 bg-white dark:bg-black text-slate-800 dark:text-slate-200 font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
              placeholder={`Nội dung của file ${exercise.inputFile}`}
            />
             {/* Upload Overlay */}
             <div className="absolute top-4 right-4 flex gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".inp,.txt" 
                  onChange={handleFileUpload}
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Upload size={12} />
                  Upload .inp
                </button>
                <button 
                   onClick={() => setInputContent('')}
                   className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                   title="Clear"
                >
                  <Trash2 size={12} />
                </button>
             </div>
          </div>
        </div>

        {/* Output Viewer */}
        <div className={`absolute inset-0 bg-slate-50 dark:bg-slate-900 transition-opacity duration-200 overflow-y-auto ${activeTab === 'output' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          {!result ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Play size={24} className="ml-1 opacity-50" />
              </div>
              <p>Chưa có kết quả.</p>
              <button onClick={handleRun} className="mt-2 text-primary-600 hover:underline text-sm font-medium">Chạy code ngay</button>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Status Banner */}
              <div className={`p-4 rounded-xl border flex items-center gap-4 ${getStatusColor(result.status)}`}>
                <div className="p-2 bg-white/50 dark:bg-black/20 rounded-full">
                  {result.status === SubmissionStatus.ACCEPTED ? <CheckCircle size={24} /> : 
                   result.status === SubmissionStatus.RUNTIME_ERROR ? <AlertCircle size={24} /> : <XCircle size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-lg tracking-tight">
                    {result.status === SubmissionStatus.ACCEPTED ? 'KẾT QUẢ: CHÍNH XÁC' : 
                     result.status === SubmissionStatus.RUNTIME_ERROR ? 'LỖI THỰC THI (Runtime Error)' : 'KẾT QUẢ SAI (Wrong Answer)'}
                  </h4>
                  <p className="text-sm opacity-90 font-medium">
                    {result.message || (result.status === SubmissionStatus.ACCEPTED ? 'Output trùng khớp hoàn toàn với đáp án.' : 'Output không khớp với mong đợi.')}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white dark:bg-black rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Thời gian chạy</div>
                  <div className="font-mono text-xl font-semibold text-slate-800 dark:text-slate-100">{result.executionTime} ms</div>
                </div>
                <div className="p-4 bg-white dark:bg-black rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Bộ nhớ</div>
                  <div className="font-mono text-xl font-semibold text-slate-800 dark:text-slate-100">{result.memoryUsage} MB</div>
                </div>
                <div className="p-4 bg-white dark:bg-black rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                   <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Test Case</div>
                   <div className="font-mono text-xl font-semibold text-slate-800 dark:text-slate-100">{result.passedCases}/{result.totalCases}</div>
                </div>
                <div className="p-4 bg-white dark:bg-black rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                   <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Ngôn ngữ</div>
                   <div className="font-mono text-xl font-semibold text-slate-800 dark:text-slate-100">Python 3</div>
                </div>
              </div>

              {/* Output Diff Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Input ({exercise.inputFile})</span>
                  </div>
                  <pre className="font-mono text-sm bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-lg text-slate-700 dark:text-slate-300 overflow-x-auto h-48 custom-scrollbar">
                    {inputContent}
                  </pre>
                </div>
                <div>
                   <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Output Thực tế ({exercise.outputFile})</span>
                    {result.status === SubmissionStatus.WRONG_ANSWER && <span className="text-xs text-red-500 font-bold">KHÁC EXPECTED</span>}
                  </div>
                  <pre className={`font-mono text-sm bg-white dark:bg-black border p-4 rounded-lg overflow-x-auto h-48 custom-scrollbar
                    ${result.status === SubmissionStatus.WRONG_ANSWER 
                      ? 'border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-300' 
                      : 'border-green-300 dark:border-green-900 bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-300'}
                  `}>
                    {result.userOutput || result.message}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #525252; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #737373; 
        }
      `}</style>
    </div>
  );
};