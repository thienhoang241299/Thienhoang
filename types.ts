export interface Lesson {
  id: string;
  title: string;
  content: ContentBlock[];
  exercise?: Exercise;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export type ContentBlock = 
  | { type: 'text'; content: string }
  | { type: 'code'; content: string; language: 'python' | 'bash' | 'text'; title?: string }
  | { type: 'alert'; content: string; variant: 'info' | 'warning' | 'tip' }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'heading'; content: string; level: 2 | 3 };

export interface Exercise {
  title: string;
  description: string;
  inputFile: string; // name of input file e.g., BAI1.INP
  outputFile: string; // name of output file e.g., BAI1.OUT
  testCases: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isPublic: boolean;
}

export enum SubmissionStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  ACCEPTED = 'ACCEPTED',
  WRONG_ANSWER = 'WRONG_ANSWER',
  RUNTIME_ERROR = 'RUNTIME_ERROR',
  TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
}

export interface SubmissionResult {
  status: SubmissionStatus;
  executionTime?: number; // ms
  memoryUsage?: number; // MB
  passedCases: number;
  totalCases: number;
  message?: string;
  userOutput?: string;
}