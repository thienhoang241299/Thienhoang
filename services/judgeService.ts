import { SubmissionResult, SubmissionStatus, TestCase } from "../types";

// Helper: Find matching closing parenthesis
const findMatchingParen = (str: string, startIdx: number): number => {
  let depth = 1;
  for (let i = startIdx + 1; i < str.length; i++) {
    if (str[i] === "(") depth++;
    else if (str[i] === ")") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
};

// Tiền xử lý code - chuyển đổi file I/O sang stdin/stdout (robust parser)
const preprocessCode = (code: string): string => {
  let lines = code.split("\n");
  let result: string[] = [];

  for (let line of lines) {
    let processed = line;

    // Loại bỏ import sys
    if (/^import\s+sys\s*$/.test(processed.trim())) {
      continue;
    }

    // Loại bỏ sys.stdin/stdout assignment
    if (/sys\.(stdin|stdout)\s*=\s*open\(/.test(processed)) {
      continue;
    }

    // Loại bỏ <var> = open(...) assignment
    if (/^\s*\w+\s*=\s*open\(/.test(processed)) {
      continue;
    }

    // Loại bỏ <var>.close()
    if (/\w+\.close\(\)/.test(processed)) {
      processed = processed.replace(/\w+\.close\(\)/g, "");
      if (processed.trim() === "") continue;
    }

    // Xử lý <var>.read() / <var>.readline() / <var>.readlines()
    processed = processed.replace(
      /(\w+)\.(read|readline)\(\)\.strip\(\)/g,
      "input()",
    );
    processed = processed.replace(/(\w+)\.(read|readline)\(\)/g, "input()");
    processed = processed.replace(/(\w+)\.readlines\(\)/g, "[input()]");

    // Xử lý tất cả <var>.write(...) trên dòng (không recursion)
    let maxIterations = 10;
    while (processed.includes(".write(") && maxIterations-- > 0) {
      const writeMatch = processed.match(/(\w+)\.write\s*\(/);
      if (!writeMatch) break;

      const writeIdx = processed.indexOf(writeMatch[0]);
      const parenIdx = writeIdx + writeMatch[0].length - 1;
      const closingIdx = findMatchingParen(processed, parenIdx);

      if (closingIdx === -1) break;

      const beforeWrite = processed.substring(0, writeIdx);
      const content = processed.substring(parenIdx + 1, closingIdx);
      const afterWrite = processed.substring(closingIdx + 1);

      // Loại bỏ str(...) wrapper nếu có
      let cleanContent = content.trim();
      if (cleanContent.startsWith("str(") && cleanContent.endsWith(")")) {
        cleanContent = cleanContent
          .substring(4, cleanContent.length - 1)
          .trim();
      }

      processed = beforeWrite + "print(" + cleanContent + ")" + afterWrite;
    }

    // Loại bỏ dòng trống
    if (processed.trim() === "") continue;

    result.push(processed);
  }

  return result.join("\n");
};

// Sử dụng Piston API để chạy code Python thực sự
const runPythonCodeWithPiston = async (
  code: string,
  input: string,
): Promise<{ output: string; error?: string }> => {
  try {
    // Tiền xử lý code để loại bỏ file I/O
    const cleanCode = preprocessCode(code);

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "python",
        version: "*",
        files: [
          {
            name: "main.py",
            content: cleanCode,
          },
        ],
        stdin: input,
      }),
    });

    if (!response.ok) {
      return {
        output: "",
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const result = await response.json();

    // Xử lý output từ Piston API
    if (result.run) {
      const stdout = result.run.stdout || "";
      const stderr = result.run.stderr || "";

      if (stderr && result.run.code !== 0) {
        return {
          output: stdout,
          error: stderr.trim(),
        };
      }

      return {
        output: stdout.trim(),
      };
    }

    return {
      output: "",
      error: "No output from Piston API",
    };
  } catch (error: any) {
    return {
      output: "",
      error: error.message || String(error),
    };
  }
};

export const simulateJudge = async (
  userCode: string,
  testCases: TestCase[],
): Promise<SubmissionResult> => {
  const normalizedCode = userCode.toLowerCase();

  // Kiểm tra file I/O (yêu cầu bắt buộc)
  const hasFileIO =
    normalizedCode.includes("open") &&
    (normalizedCode.includes(".inp") || normalizedCode.includes(".out"));

  if (!hasFileIO) {
    return {
      status: SubmissionStatus.WRONG_ANSWER,
      passedCases: 0,
      totalCases: testCases.length,
      message: "Lỗi: Chương trình của bạn chưa đọc/ghi file (.INP/.OUT).",
      userOutput: "File not found.",
    };
  }

  // Chạy code trên tất cả test cases
  let passedCases = 0;
  let userOutput = "";
  let hasRuntimeError = false;
  let errorMessage = "";

  for (const testCase of testCases) {
    const result = await runPythonCodeWithPiston(userCode, testCase.input);

    if (result.error) {
      hasRuntimeError = true;
      errorMessage = result.error;
      break;
    }

    userOutput = result.output;

    // So sánh output (bỏ qua khoảng trắng thừa)
    const normalizedOutput = result.output.trim();
    const normalizedExpected = testCase.expectedOutput.trim();

    if (normalizedOutput === normalizedExpected) {
      passedCases++;
    }
  }

  // Trả về kết quả
  if (hasRuntimeError) {
    return {
      status: SubmissionStatus.RUNTIME_ERROR,
      passedCases: 0,
      totalCases: testCases.length,
      message: `Lỗi chạy chương trình: ${errorMessage}`,
      userOutput: userOutput,
    };
  } else if (passedCases === testCases.length) {
    return {
      status: SubmissionStatus.ACCEPTED,
      passedCases: passedCases,
      totalCases: testCases.length,
      executionTime: 15,
      memoryUsage: 4.2,
      userOutput: userOutput,
    };
  } else {
    return {
      status: SubmissionStatus.WRONG_ANSWER,
      passedCases: passedCases,
      totalCases: testCases.length,
      message: `Kết quả sai. Đã pass ${passedCases}/${testCases.length} test case.`,
      userOutput: userOutput,
    };
  }
};
