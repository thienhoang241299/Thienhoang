import { SubmissionResult, SubmissionStatus, TestCase } from '../types';

export const simulateJudge = async (
  userCode: string,
  testCases: TestCase[]
): Promise<SubmissionResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const normalizedCode = userCode.toLowerCase();
      
      // Kiểm tra file I/O (yêu cầu bắt buộc)
      const hasFileIO = normalizedCode.includes('open') && (normalizedCode.includes('.inp') || normalizedCode.includes('.out'));
      
      if (!hasFileIO) {
        resolve({
          status: SubmissionStatus.WRONG_ANSWER,
          passedCases: 0,
          totalCases: testCases.length,
          message: "Lỗi: Chương trình của bạn chưa đọc/ghi file (.INP/.OUT).",
          userOutput: "File not found."
        });
        return;
      }

      // Giả lập kiểm tra độ phức tạp đơn giản
      const hasNestedLoops = (normalizedCode.match(/for /g) || []).length >= 2;
      
      // Giả lập logic chấm bài dựa trên sự tồn tại của các hàm quan trọng
      let isLogicCorrect = false;
      if (normalizedCode.includes('gcd') || normalizedCode.includes('%') || normalizedCode.includes('math.sqrt') || normalizedCode.includes('set(') || normalizedCode.includes('dict(') || normalizedCode.includes('{}')) {
        isLogicCorrect = true;
      }

      if (isLogicCorrect) {
        resolve({
          status: SubmissionStatus.ACCEPTED,
          passedCases: testCases.length,
          totalCases: testCases.length,
          executionTime: hasNestedLoops ? 120 : 15,
          memoryUsage: 4.2,
          userOutput: testCases[0].expectedOutput
        });
      } else {
        resolve({
          status: SubmissionStatus.WRONG_ANSWER,
          passedCases: 0,
          totalCases: testCases.length,
          message: "Kết quả sai. Hãy kiểm tra lại thuật toán của bạn.",
          userOutput: "Output không khớp."
        });
      }
    }, 1500);
  });
};
