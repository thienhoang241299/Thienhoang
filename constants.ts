import { Chapter } from "./types";

export const APP_NAME = "THCS Phổ Quang";

export const CURRICULUM: Chapter[] = [
  {
    id: "intro",
    title: "1. Khởi đầu & Tư duy HSG",
    lessons: [
      {
        id: "welcome",
        title: "Giới thiệu & Lộ trình",
        content: [
          {
            type: "heading",
            level: 2,
            content: "Chào mừng bạn đến với THCS Phổ Quang",
          },
          {
            type: "text",
            content:
              "Lập trình thi học sinh giỏi (HSG) đòi hỏi sự kết hợp giữa kỹ năng lập trình và tư duy toán học logic. Mục tiêu của chúng ta là giải quyết bài toán trong giới hạn thời gian (thường là 1s) và bộ nhớ (thường là 256MB).",
          },
          {
            type: "alert",
            variant: "info",
            content:
              "Chúng ta sử dụng Python 3.10+. Python giúp bạn tập trung vào thuật toán thay vì cú pháp phức tạp như C++ hay Pascal.",
          },
        ],
      },
      {
        id: "thienhb-mindset",
        title: "Tư duy Thuật toán & Debug",
        content: [
          { type: "heading", level: 2, content: "Quy trình giải bài HSG" },
          {
            type: "text",
            content:
              "1. Đọc kỹ đề: Xác định Input/Output và GIỚI HẠN (N = 10^2 hay 10^6?).\n2. Suy luận thuật toán: Nếu N nhỏ, dùng vét cạn. Nếu N lớn, dùng thuật toán tối ưu (O(N), O(N log N)).\n3. Cài đặt: Viết code sạch, dùng tên biến có ý nghĩa.\n4. Kiểm thử (Test): Thử với ví dụ trong đề và các test tự tạo.",
          },
          {
            type: "heading",
            level: 2,
            content: "Trực giác: Kỹ năng Debug (Gỡ lỗi)",
          },
          {
            type: "text",
            content:
              "Khi kết quả sai (Wrong Answer) hoặc lỗi runtime:\n- Print debugging: In ra giá trị các biến ở từng bước vòng lặp để xem logic sai ở đâu.\n- Kiểm tra điều kiện biên: N=1, N=0, mảng trống, số âm.\n- Sử dụng assert: Để đảm bảo giá trị biến luôn nằm trong khoảng mong đợi.",
          },
          {
            type: "code",
            language: "python",
            content: `def find_max(a):
    if not a: return None
    res = a[0]
    for x in a:
        print(f"DEBUG: current x={x}, current res={res}") # In debug
        if x > res:
            res = x
    return res`,
            title: "Ví dụ Debug thủ công",
          },
          {
            type: "alert",
            variant: "warning",
            content:
              "Sai lầm: Quên ép kiểu int() khi dùng input(), dẫn đến lỗi phép toán trên chuỗi.",
          },
        ],
      },
      {
        id: "complexity",
        title: "Độ phức tạp O(N) & Tối ưu",
        content: [
          {
            type: "heading",
            level: 2,
            content: "Tại sao cần phân tích Độ phức tạp?",
          },
          {
            type: "text",
            content:
              "Độ phức tạp cho biết tốc độ tăng của thời gian chạy khi dữ liệu đầu vào N tăng lên. Trong HSG, bạn phải ước lượng được thuật toán của mình có kịp 1 giây hay không.",
          },
          { type: "heading", level: 3, content: "Các cấp độ thường gặp" },
          {
            type: "text",
            content:
              "- O(1): Phép toán hằng số (a + b, tra cứu Dict).\n- O(log N): Chia đôi liên tiếp (Binary Search).\n- O(N): Duyệt qua mảng 1 lần.\n- O(N log N): Sắp xếp nhanh (QuickSort, MergeSort).\n- O(N^2): Hai vòng lặp lồng nhau (Duyệt cặp phần tử).\n- O(2^N): Duyệt vét cạn đệ quy.",
          },
          {
            type: "alert",
            variant: "tip",
            content:
              "Quy tắc vàng: Với Python, 1 giây chạy được khoảng 10^7 phép toán. Nếu N = 10^5, bạn bắt buộc phải dùng O(N) hoặc O(N log N).",
          },
        ],
      },
    ],
  },
  {
    id: "python-core",
    title: "2. Python Cơ bản cho HSG",
    lessons: [
      {
        id: "vars-types",
        title: "Biến & Kiểu dữ liệu",
        content: [
          { type: "heading", level: 2, content: "Các kiểu dữ liệu nền tảng" },
          {
            type: "text",
            content:
              "Trong Python, mỗi dữ liệu đều có kiểu riêng. Hiểu rõ kiểu dữ liệu giúp bạn tránh lỗi phép toán và lựa chọn cách lưu trữ phù hợp.",
          },

          { type: "heading", level: 3, content: "int - Số nguyên" },
          {
            type: "text",
            content:
              "Trong Python 3, int có độ dài vô hạn - không bị giới hạn như C++. Điều này rất tiện cho bài toán HSG khi làm việc với số siêu lớn.",
          },
          {
            type: "code",
            language: "python",
            content: `# Số bình thường
a = 100
print(a + 50)  # 150

# Số siêu lớn
big_num = 10**100  # 1 theo sau 100 chữ số 0
print(big_num + 1)

# Phép toán trên số lớn
result = big_num ** 2  # Bình phương
print(len(str(result)))  # Số chữ số của kết quả`,
            title: "Kinh nghiệm: Số nguyên trong Python",
          },

          { type: "heading", level: 3, content: "float - Số thực" },
          {
            type: "text",
            content:
              "Số thực được lưu dưới dạng nhị phân, nên có sai số khi so sánh == giữa các số thực. Luôn kiểm tra sai số trong khoảng 10^-9.",
          },
          {
            type: "code",
            language: "python",
            content: `x = 0.1 + 0.2
print(x)  # Output: 0.30000000000000004 (không phải 0.3!)
print(x == 0.3)  # False - sai!

# Cách đúng: Kiểm tra sai số
eps = 1e-9
print(abs(x - 0.3) < eps)  # True - đúng!`,
            title: "Cảnh báo: Sai số float",
          },

          { type: "heading", level: 3, content: "str - Chuỗi ký tự" },
          {
            type: "text",
            content:
              "Chuỗi dùng để lưu text, được ghi trong dấu nháy (\"...\") hoặc nháy đơn ('...').",
          },
          {
            type: "code",
            language: "python",
            content: `name = "Thienhb"
message = 'Hello World'
combined = name + " - " + message
print(combined)  # THCS Phổ Quang - Hello World

# Lấy ký tự tại vị trí
print(name[0])  # A
print(name[-1])  # t (từ cuối)`,
            title: "Thao tác chuỗi",
          },

          { type: "heading", level: 3, content: "bool - Giá trị logic" },
          {
            type: "text",
            content:
              "Chi có 2 giá trị: True hoặc False. Dùng trong điều kiện kiểm tra.",
          },
          {
            type: "code",
            language: "python",
            content: `is_student = True
age = 15
can_drive = age >= 18
print(can_drive)  # False`,
            title: "Biến boolean",
          },

          {
            type: "code",
            language: "python",
            content: `# Ví dụ toàn bộ các kiểu
a = 42              # int
b = 3.14            # float
s = "ThcsPhoQuang"      # str
check = True        # bool

print(type(a))      # <class 'int'>
print(type(b))      # <class 'float'>
print(type(s))      # <class 'str'>
print(type(check))  # <class 'bool'>`,
            title: "Kiểm tra kiểu với type()",
          },

          {
            type: "alert",
            variant: "tip",
            content:
              "Tip: Trong HSG, thường input dữ liệu là chuỗi, nên phải ép kiểu về int hoặc float bằng int() hay float().",
          },
        ],
        exercise: {
          title: "Bình phương số lớn",
          description:
            "Đọc số nguyên N. Ghi N*N ra file SQUARE.OUT. Chú ý N có thể rất lớn.",
          inputFile: "SQUARE.INP",
          outputFile: "SQUARE.OUT",
          testCases: [
            {
              input: "10000000000",
              expectedOutput: "100000000000000000000",
              isPublic: true,
            },
          ],
        },
      },
      {
        id: "operators",
        title: "Các toán tử & Phép chia",
        content: [
          { type: "heading", level: 2, content: "Các toán tử cơ bản" },
          {
            type: "text",
            content:
              "Python hỗ trợ các phép toán số học tương tự như toán học phổ thông.",
          },
          {
            type: "code",
            language: "python",
            content: `# Cộng, trừ, nhân
a = 10
b = 3
print(a + b)  # 13
print(a - b)  # 7
print(a * b)  # 30`,
            title: "Phép cộng, trừ, nhân",
          },

          {
            type: "heading",
            level: 2,
            content: "Phép chia hết (//) và chia lấy phần dư (%)",
          },
          {
            type: "text",
            content:
              "Đây là hai phép toán rất quan trọng trong lập trình HSG:\n- `//`: Chia lấy phần nguyên (dùng cho số nguyên).\n- `%`: Chia lấy phần dư.",
          },
          {
            type: "code",
            language: "python",
            content: `a = 17
b = 5

# Phép chia lấy phần nguyên
print(a // b)  # 3 (vì 17 = 5*3 + 2)

# Phép chia lấy phần dư
print(a % b)   # 2 (17 - 5*3 = 2)

# Kiểm tra: 5 * 3 + 2 = 17 ✓`,
            title: "Chia hết và chia lấy dư",
          },

          { type: "heading", level: 3, content: "Ứng dụng thực tế" },
          {
            type: "text",
            content:
              "Phép chia dư (%) được dùng rất thường xuyên. Dưới đây là các ứng dụng điển hình:",
          },
          { type: "heading", level: 3, content: "Kiểm tra tính chẵn/lẻ" },
          {
            type: "code",
            language: "python",
            content: `n = 42
if n % 2 == 0:
    print("Số chẵn")
else:
    print("Số lẻ")`,
            title: "Nhận diện số chẵn/lẻ",
          },

          { type: "heading", level: 3, content: "Tách chữ số của một số" },
          {
            type: "text",
            content: "Trong HSG, bạn thường phải xử lý từng chữ số của một số.",
          },
          {
            type: "code",
            language: "python",
            content: `n = 12345

# Lấy chữ số hàng đơn vị
last_digit = n % 10  # 5
print(f"Chữ số cuối: {last_digit}")

# Bỏ chữ số hàng đơn vị
remaining = n // 10  # 1234
print(f"Số còn lại: {remaining}")

# Tách tất cả chữ số
digits = []
temp = n
while temp > 0:
    digits.append(temp % 10)
    temp //= 10
print(f"Tất cả chữ số: {digits}")  # [5, 4, 3, 2, 1]`,
            title: "Tách chữ số từ một số",
          },

          { type: "heading", level: 3, content: "Chia dư Modulo" },
          {
            type: "text",
            content:
              'Trong bài toán yêu cầu kết quả "mod 10^9+7", bạn phải chia dư bằng 10^9+7 để tránh overflow (tức để kết quả nằm trong giới hạn).',
          },
          {
            type: "code",
            language: "python",
            content: `MOD = 10**9 + 7
result = 999999999 * 999999999
answer = result % MOD
print(answer)  # Kết quả cộng đủ nhỏ để lưu được`,
            title: "Chia dư trong bài HSG",
          },

          { type: "heading", level: 2, content: "Phép chia số thực (/)" },
          {
            type: "text",
            content:
              "Phép `/` luôn trả về một số thực (float), ngay cả khi chia hết.",
          },
          {
            type: "code",
            language: "python",
            content: `print(10 / 2)    # 5.0 (không phải 5)
print(10.0 / 2)  # 5.0
print(10 / 3)    # 3.3333333333333335`,
            title: "Phép chia thực",
          },

          { type: "heading", level: 2, content: "Lũy thừa (**)" },
          { type: "text", content: "Toán tử `**` tính lũy thừa." },
          {
            type: "code",
            language: "python",
            content: `print(2 ** 3)    # 8 (2 mũ 3)
print(10 ** 2)   # 100
print(2 ** 10)   # 1024

# Lưu ý: Các đại lượng lũy thừa tăng rất nhanh!
print(10 ** 100)  # Số khổng lồ`,
            title: "Phép lũy thừa",
          },

          {
            type: "alert",
            variant: "warning",
            content:
              "Lưu ý quan trọng: Trong Python, n % m luôn cùng dấu với m (mẫu số). Ví dụ: -7 % 3 = 2 (không phải -1).",
          },
        ],
        exercise: {
          title: "Tính thương và dư",
          description:
            "Đọc hai số nguyên A và B từ file MATH.INP. Tính A // B (thương) và A % B (dư). Ghi kết quả ra file MATH.OUT theo định dạng: thương dư.",
          inputFile: "MATH.INP",
          outputFile: "MATH.OUT",
          testCases: [
            {
              input: "17 5",
              expectedOutput: "3 2",
              isPublic: true,
            },
            {
              input: "100 7",
              expectedOutput: "14 2",
              isPublic: false,
            },
          ],
        },
      },
    ],
  },
  {
    id: "control-structures",
    title: "3. Rẽ nhánh & Điều kiện",
    lessons: [
      {
        id: "if-else-deep",
        title: "If - Elif - Else & Lồng nhau",
        content: [
          { type: "heading", level: 2, content: "Cấu trúc rẽ nhánh đầy đủ" },
          {
            type: "text",
            content:
              "Dùng `elif` (else if) giúp mã nguồn sạch hơn thay vì lồng nhiều `if-else`. Luôn nhớ: Khi một `if` hoặc `elif` thỏa mãn, các phần còn lại sẽ bị bỏ qua.",
          },
          {
            type: "heading",
            level: 3,
            content: "Cấu trúc cơ bản if-elif-else",
          },
          {
            type: "code",
            language: "python",
            content: `score = 8.5
if score >= 8.0:
    print("GIOI")
elif score >= 6.5:
    print("KHA")
elif score >= 5.0:
    print("TRUNG BINH")
else:
    print("YEU")`,
            title: "Phân loại điểm số",
          },

          { type: "heading", level: 3, content: "So sánh logic" },
          {
            type: "text",
            content:
              "Python hỗ trợ các phép so sánh: `>`, `<`, `>=`, `<=`, `==`, `!=`.",
          },
          {
            type: "code",
            language: "python",
            content: `age = 18
if age >= 18:
    print("Du tuoi dao tao")
else:
    print("Chua du tuoi")

# Kiểm tra bằng nhau
name = "Tung"
if name == "Tung":
    print("Chao Tung!")`,
            title: "Các phép so sánh",
          },

          {
            type: "heading",
            level: 3,
            content: "Kết hợp điều kiện với AND, OR, NOT",
          },
          {
            type: "text",
            content:
              "- `and`: Cả hai điều kiện đều đúng.\n- `or`: Ít nhất một điều kiện đúng.\n- `not`: Đảo ngược điều kiện.",
          },
          {
            type: "code",
            language: "python",
            content: `age = 20
has_license = True

# Dùng AND
if age >= 18 and has_license:
    print("Co the lai xe")

# Dùng OR
if age < 18 or not has_license:
    print("Khong the lai xe")

# Dùng NOT
if not has_license:
    print("Can cap phep")`,
            title: "Toán tử logic",
          },

          {
            type: "heading",
            level: 2,
            content: "Điều kiện lồng nhau (Nested If)",
          },
          {
            type: "text",
            content:
              "Sử dụng khi một điều kiện phụ thuộc vào một điều kiện trước đó đã thỏa mãn. Tuy nhiên, hãy sử dụng với cẩn thận vì quá nhiều mức lồng sẽ làm code khó đọc.",
          },
          {
            type: "code",
            language: "python",
            content: `x = 5
y = -3

if x > 0:
    if y > 0:
        print("Goc phan tu thu I")
    else:
        print("Goc phan tu thu IV")
else:
    if y > 0:
        print("Goc phan tu thu II")
    else:
        print("Goc phan tu thu III")`,
            title: "If lồng nhau - Xác định góc phần tư",
          },

          {
            type: "heading",
            level: 3,
            content: "Tối ưu hóa với điều kiện logic",
          },
          {
            type: "text",
            content:
              "Thay vì lồng nhiều if, ta có thể kết hợp điều kiện để mã sạch hơn:",
          },
          {
            type: "code",
            language: "python",
            content: `# Cách 1: Dùng AND (tốt hơn)
if x > 0 and y > 0 and x < 10 and y < 10:
    print("Diem nam trong khu vuc con")

# Cách 2: Dùng if lồng nhau (kém)
if x > 0:
    if y > 0:
        if x < 10:
            if y < 10:
                print("Diem nam trong khu vuc con")`,
            title: "Lọc điều kiện hiệu quả",
          },

          {
            type: "alert",
            variant: "tip",
            content:
              "Tip: Giữ code của bạn phẳng (không quá sâu). Nếu più hơn 3 mức lồng, hãy xem xét refactor lại logic.",
          },
        ],
        exercise: {
          title: "Xác định góc phần tư",
          description:
            "Đọc tọa độ hai điểm (x, y) từ file QUAD.INP. Xác định điểm nằm trong góc phần tư nào (I, II, III, IV) hoặc trên trục. Ghi kết quả ra file QUAD.OUT.",
          inputFile: "QUAD.INP",
          outputFile: "QUAD.OUT",
          testCases: [
            {
              input: "5 3",
              expectedOutput: "I",
              isPublic: true,
            },
            {
              input: "-2 4",
              expectedOutput: "II",
              isPublic: false,
            },
          ],
        },
      },
      {
        id: "equations-basic",
        title: "Phương trình bậc nhất & bậc hai",
        content: [
          {
            type: "heading",
            level: 2,
            content: "Phương trình bậc nhất ax + b = 0",
          },
          {
            type: "text",
            content:
              "Đây là phương trình có dạng tuyến tính đơn giản nhất. Để giải, ta cần xét ba trường hợp:",
          },

          { type: "heading", level: 3, content: "Trường hợp 1: a ≠ 0" },
          {
            type: "text",
            content: "Phương trình có nghiệm duy nhất: x = -b/a.",
          },

          { type: "heading", level: 3, content: "Trường hợp 2: a = 0, b ≠ 0" },
          {
            type: "text",
            content:
              "Phương trình trở thành 0x + b = 0, hay b = 0. Vì b ≠ 0, nên phương trình vô nghiệm.",
          },

          { type: "heading", level: 3, content: "Trường hợp 3: a = 0, b = 0" },
          {
            type: "text",
            content:
              "Phương trình trở thành 0x + 0 = 0. Mọi x đều thỏa mãn, nên phương trình có vô số nghiệm.",
          },

          {
            type: "code",
            language: "python",
            content: `def solve_pt_bac1(a, b):
    if a == 0:
        if b == 0:
            return "Vo so nghiem"
        else:
            return "Vo nghiem"
    else:
        x = -b / a
        return x

# Kiểm thử
print(solve_pt_bac1(2, 4))    # -2
print(solve_pt_bac1(0, 5))    # "Vo nghiem"
print(solve_pt_bac1(0, 0))    # "Vo so nghiem"`,
            title: "Giải PT bậc nhất",
          },

          {
            type: "heading",
            level: 2,
            content: "Phương trình bậc hai ax² + bx + c = 0",
          },
          {
            type: "text",
            content:
              "Phương trình bậc hai là một trong những bài toán cơ bản nhất. Để giải, ta sử dụng biệt thức Delta (Δ = b² - 4ac).",
          },

          { type: "heading", level: 3, content: "Biện luận theo Delta" },
          {
            type: "text",
            content:
              "- Nếu Δ > 0: Phương trình có 2 nghiệm phân biệt.\n- Nếu Δ = 0: Phương trình có nghiệm kép (1 nghiệm).\n- Nếu Δ < 0: Phương trình vô nghiệm (trên trường số thực).",
          },

          { type: "heading", level: 3, content: "Công thức nghiệm" },
          {
            type: "text",
            content: "Khi Δ ≥ 0:\nx₁ = (-b - √Δ) / 2a\nx₂ = (-b + √Δ) / 2a",
          },

          {
            type: "code",
            language: "python",
            content: `import math

def solve_pt_bac2(a, b, c):
    if a == 0:
        return "Tro ve PT bac 1"
    
    delta = b**2 - 4*a*c
    
    if delta < 0:
        return "Vo nghiem (tren R)"
    elif delta == 0:
        x = -b / (2*a)
        return f"Nghiem kep: x = {x}"
    else:
        sqrt_delta = math.sqrt(delta)
        x1 = (-b - sqrt_delta) / (2*a)
        x2 = (-b + sqrt_delta) / (2*a)
        return f"Hai nghiem: x1 = {x1}, x2 = {x2}"

# Kiểm thử
print(solve_pt_bac2(1, -5, 6))   # Hai nghiem
print(solve_pt_bac2(1, -2, 1))   # Nghiem kep
print(solve_pt_bac2(1, 0, 1))    # Vo nghiem`,
            title: "Giải PT bậc hai",
          },

          { type: "heading", level: 3, content: "Ví dụ thực tiễn" },
          {
            type: "code",
            language: "python",
            content: `# Bài toán: Một viên đạn được bắn lên với vận tốc v₀ = 20 m/s.
# Độ cao sau t giây: h(t) = v₀*t - 0.5*g*t² = 20t - 5t²
# Hỏi khi nào viên đạn rơi xuống đất (h = 0)?
# Phương trình: -5t² + 20t = 0
# Hay: 5t² - 20t = 0
# Hay: t(5t - 20) = 0

a = 5
b = -20
c = 0

delta = b**2 - 4*a*c  # = 400
sqrt_delta = math.sqrt(delta)
t1 = (-b - sqrt_delta) / (2*a)  # = 0
t2 = (-b + sqrt_delta) / (2*a)  # = 4

print(f"Viên đạn rơi xuống lúc t = {t2} giây")`,
            title: "Ứng dụng PT bậc hai trong Vật lý",
          },

          {
            type: "alert",
            variant: "warning",
            content:
              "Sai lầm thường gặp: Quên kiểm tra a = 0 trước khi tính Delta hoặc dùng công thức.",
          },
        ],
        exercise: {
          title: "Giải phương trình bậc hai",
          description:
            "Đọc ba hệ số a, b, c từ file PT.INP. Giải phương trình ax² + bx + c = 0. Ghi số lượng nghiệm và giá trị nghiệm (nếu có) ra file PT.OUT.",
          inputFile: "PT.INP",
          outputFile: "PT.OUT",
          testCases: [
            {
              input: "1 -5 6",
              expectedOutput: "2\n2.0 3.0",
              isPublic: true,
            },
          ],
        },
      },
    ],
  },
  {
    id: "loops-control",
    title: "4. Vòng lặp & Điều khiển",
    lessons: [
      {
        id: "for-while",
        title: "For, While & Lồng nhau",
        content: [
          { type: "heading", level: 2, content: "Vòng lặp For" },
          {
            type: "text",
            content:
              "Vòng lặp `for` dùng khi bạn biết chính xác số lần lặp. Python dùng hàm `range()` để tạo dãy số.",
          },

          { type: "heading", level: 3, content: "Hàm range()" },
          {
            type: "text",
            content:
              "- `range(n)`: Từ 0 đến n-1 (n số).\n- `range(a, b)`: Từ a đến b-1.\n- `range(a, b, step)`: Từ a đến b-1, cách nhau step.",
          },

          {
            type: "code",
            language: "python",
            content: `# In từ 0 đến 4
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# In từ 1 đến 5
for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5

# In các số chẵn 0 đến 10
for i in range(0, 11, 2):
    print(i)  # 0, 2, 4, 6, 8, 10`,
            title: "Sử dụng range()",
          },

          { type: "heading", level: 2, content: "Vòng lặp While" },
          {
            type: "text",
            content:
              "Vòng lặp `while` dùng khi số lần lặp không xác định trước. Chỉ cần điều kiện còn đúng, vòng lặp sẽ tiếp tục.",
          },

          {
            type: "code",
            language: "python",
            content: `# Tính tổng các chữ số của 2024
n = 2024
tong = 0
while n > 0:
    tong += n % 10  # Lấy chữ số cuối cùng
    n //= 10        # Bỏ chữ số cuối cùng
print(tong)  # 8 (2+0+2+4)`,
            title: "Tính tổng chữ số với while",
          },

          {
            type: "heading",
            level: 2,
            content: "Vòng lặp lồng nhau (Nested Loops)",
          },
          {
            type: "text",
            content:
              "Vòng lặp lồng nhau dùng để xử lý bảng, ma trận hoặc các tổ hợp cặp (i, j). Lưu ý: Độ phức tạp tăng nhanh!",
          },

          {
            type: "code",
            language: "python",
            content: `# Ví dụ 1: In bảng cửu chương
print("BANG CUU CHUONG 3:")
for i in range(1, 10):
    for j in range(1, 10):
        print(f"{i}x{j}={i*j}", end='\\t')
    print()  # Xuống dòng

# Ví dụ 2: Duyệt ma trận
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for i in range(len(matrix)):     # Dòng
    for j in range(len(matrix[i])):  # Cột
        print(matrix[i][j], end=' ')
    print()`,
            title: "Vòng lặp lồng nhau",
          },

          { type: "heading", level: 3, content: "So sánh độ phức tạp" },
          {
            type: "text",
            content:
              "Độ phức tạp rất quan trọng:\n- Vòng lặp đơn: O(N)\n- Vòng lặp lồng 2 lần: O(N²)\n- Vòng lặp lồng 3 lần: O(N³)",
          },

          {
            type: "alert",
            variant: "warning",
            content:
              "Cảnh báo: Với N = 10^4, O(N²) = 10^8 phép toán, gần như giới hạn. N > 10^4 sẽ timeout!",
          },
        ],
        exercise: {
          title: "Tính tổng dãy số",
          description:
            "Đọc số N từ file TONG.INP. Tính tổng từ 1 + 2 + 3 + ... + N. Ghi kết quả ra file TONG.OUT.",
          inputFile: "TONG.INP",
          outputFile: "TONG.OUT",
          testCases: [
            {
              input: "10",
              expectedOutput: "55",
              isPublic: true,
            },
            {
              input: "100",
              expectedOutput: "5050",
              isPublic: false,
            },
          ],
        },
      },
      {
        id: "break-continue-pass",
        title: "Break, Continue & Pass",
        content: [
          { type: "heading", level: 2, content: "Điều khiển luồng nâng cao" },

          { type: "heading", level: 3, content: "Break - Thoát khỏi vòng lặp" },
          {
            type: "text",
            content:
              "Lệnh `break` dùng để thoát ngay lập tức khỏi vòng lặp, bất kể điều kiện vòng lặp còn đúng hay không.",
          },

          {
            type: "code",
            language: "python",
            content: `# Tìm số đầu tiên chia hết cho 7 trong dãy 1-100
for i in range(1, 101):
    if i % 7 == 0:
        print(f"Tom thay: {i}")
        break  # Thoat ngay, khong tiep tuc

# Ket qua: Tom thay: 7`,
            title: "Dùng break để tìm kiếm",
          },

          { type: "heading", level: 3, content: "Continue - Bỏ qua lần lặp" },
          {
            type: "text",
            content:
              "Lệnh `continue` dùng để bỏ qua phần còn lại của vòng lặp hiện tại và nhảy đến lần lặp kế tiếp.",
          },

          {
            type: "code",
            language: "python",
            content: `# In tất cả số lẻ từ 1 đến 10
for i in range(1, 11):
    if i % 2 == 0:
        continue  # Khi i chan, bo qua
    print(i)

# Ket qua: 1, 3, 5, 7, 9`,
            title: "Dùng continue để lọc",
          },

          { type: "heading", level: 3, content: "Pass - Lệnh rỗng" },
          {
            type: "text",
            content:
              "Lệnh `pass` không làm gì cả. Nó được dùng khi cấu trúc code yêu cầu một khối lệnh nhưng bạn chưa viết logic cho nó.",
          },

          {
            type: "code",
            language: "python",
            content: `# Chuẩn bị viết code sau này
for i in range(5):
    if i == 3:
        pass  # TODO: Xu ly truong hop dac biet sau
    else:
        print(i)

# Khong co loi cu phap, tuy nhien khong in 3`,
            title: "Sử dụng pass",
          },

          { type: "heading", level: 2, content: "Tổng hợp Break & Continue" },

          {
            type: "code",
            language: "python",
            content: `# Bài toán: In các số từ 1 đến 20
# - Bỏ qua số chia hết cho 3
# - Dừng khi gặp số 15

for i in range(1, 21):
    if i == 15:
        print("Dung tai 15")
        break
    if i % 3 == 0:
        continue  # Bo qua so chia het cho 3
    print(i)

# Ket qua: 1, 2, 4, 5, 7, 8, 10, 11, 13, 14, Dung tai 15`,
            title: "Kết hợp break và continue",
          },

          {
            type: "alert",
            variant: "tip",
            content:
              "Tip: Dùng `break` khi tìm thấy kết quả và không cần tìm tiếp. Dùng `continue` khi bạn muốn bỏ qua một trường hợp nhưng vẫn tiếp tục lặp.",
          },
        ],
        exercise: {
          title: "Tìm số nguyên tố đầu tiên",
          description:
            "Đọc số N từ file PRIME.INP. Tìm số nguyên tố đầu tiên >= N. Ghi kết quả ra file PRIME.OUT.",
          inputFile: "PRIME.INP",
          outputFile: "PRIME.OUT",
          testCases: [
            {
              input: "10",
              expectedOutput: "11",
              isPublic: true,
            },
          ],
        },
      },
    ],
  },
  {
    id: "data-structures-core",
    title: "5. Cấu trúc dữ liệu: List, String, Dict & Set",
    lessons: [
      {
        id: "list-string-advanced",
        title: "List (Mảng) & String (Chuỗi)",
        content: [
          { type: "heading", level: 2, content: "List - Mảng động" },
          {
            type: "text",
            content:
              "List là một tập hợp những phần tử có thứ tự, có thể chứa các kiểu dữ liệu khác nhau. Có thể thêm, xóa, sửa các phần tử.",
          },

          { type: "heading", level: 3, content: "Tạo và truy cập List" },
          {
            type: "code",
            language: "python",
            content: `# Tạo list
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty = []

# Truy cập phần tử (indexing)
print(numbers[0])   # 1 (phần tử đầu)
print(numbers[-1])  # 5 (phần tử cuối)
print(numbers[2])   # 3 (phần tử thứ 3)`,
            title: "Tạo và truy cập List",
          },

          {
            type: "heading",
            level: 3,
            content: "Các thao tác quan trọng với List",
          },

          { type: "heading", level: 3, content: "append() - Thêm phần tử" },
          {
            type: "code",
            language: "python",
            content: `a = [1, 2, 3]
a.append(4)
print(a)  # [1, 2, 3, 4]`,
            title: "Thêm phần tử cuối",
          },

          { type: "heading", level: 3, content: "pop() - Xóa phần tử" },
          {
            type: "code",
            language: "python",
            content: `a = [1, 2, 3, 4]
removed = a.pop()    # Xoa phan tu cuoi, tra ve 4
print(a)  # [1, 2, 3]

removed = a.pop(1)   # Xoa phan tu chi so 1, tra ve 2
print(a)  # [1, 3]`,
            title: "Xóa phần tử",
          },

          { type: "heading", level: 3, content: "sort() - Sắp xếp" },
          {
            type: "code",
            language: "python",
            content: `a = [3, 1, 4, 1, 5, 9]
a.sort()  # Sap xep tang dan
print(a)  # [1, 1, 3, 4, 5, 9]

a.sort(reverse=True)  # Sap xep giam dan
print(a)  # [9, 5, 4, 3, 1, 1]`,
            title: "Sắp xếp List",
          },

          { type: "heading", level: 3, content: "Slicing - Cắt lấy phần" },
          {
            type: "text",
            content:
              "Slicing dùng để lấy một phần của list từ index a đến b-1.",
          },
          {
            type: "code",
            language: "python",
            content: `a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Lay tu chi so 2 den 5
sub = a[2:5]  # [2, 3, 4]

# Lay tu dau den chi so 3
sub = a[:3]   # [0, 1, 2]

# Lay tu chi so 5 den cuoi
sub = a[5:]   # [5, 6, 7, 8, 9]

# Lay toan bo list
sub = a[:]    # [0, 1, 2, ..., 9]`,
            title: "Slicing List",
          },

          { type: "heading", level: 2, content: "String - Chuỗi bất biến" },
          {
            type: "text",
            content:
              "String (chuỗi ký tự) là một dữ liệu bất biến trong Python. Khi sửa, bạn sẽ tạo một chuỗi mới thay vì sửa chuỗi cũ.",
          },

          {
            type: "code",
            language: "python",
            content: `s = "ThcsPhoQuang"

# Truy cập ký tự
print(s[0])   # A
print(s[-1])  # t
print(s[4])   # V

# Cắt chuỗi
print(s[0:4])   # THCS
print(s[4:])    # PhoQuang

# Độ dài
print(len(s))   # 8`,
            title: "Truy cập và cắt chuỗi",
          },

          { type: "heading", level: 3, content: "Các thao tác chuỗi" },

          {
            type: "code",
            language: "python",
            content: `s = "hello world"

# upper() - Chuyển thành chữ hoa
print(s.upper())  # HELLO WORLD

# lower() - Chuyển thành chữ thường
print(s.lower())  # hello world (da la thuong roi)

# replace() - Thay thế
print(s.replace("hello", "hi"))  # hi world

# split() - Chia chuỗi theo delimiter
s = "apple,banana,cherry"
fruits = s.split(",")  # ["apple", "banana", "cherry"]

# join() - Nối các phần tử
words = ["THCS", "Pho", "Quang"]
result = "-".join(words)  # THCS-Pho-Quang`,
            title: "Các phương thức chuỗi",
          },

          {
            type: "alert",
            variant: "warning",
            content:
              'Lưu ý: String là bất biến. s[0] = "X" sẽ gây lỗi. Dùng string mới: s = "X" + s[1:]',
          },
        ],
        exercise: {
          title: "Đảo ngược chuỗi",
          description:
            "Đọc một chuỗi từ file REVERSE.INP. Đảo ngược chuỗi và ghi kết quả ra file REVERSE.OUT.",
          inputFile: "REVERSE.INP",
          outputFile: "REVERSE.OUT",
          testCases: [
            {
              input: "THCSPHOQUANG",
              expectedOutput: "QUANGPHOCSTH",
              isPublic: true,
            },
          ],
        },
      },
      {
        id: "dict-set-hsg",
        title: "Dictionary & Set (Tối ưu O(1))",
        content: [
          { type: "heading", level: 2, content: "Set (Tập hợp)" },
          {
            type: "text",
            content:
              "Set lưu trữ các phần tử DUY NHẤT không có thứ tự. Tra cứu `x in my_set` chỉ mất O(1), nhanh hơn rất nhiều so với List.",
          },

          {
            type: "code",
            language: "python",
            content: `# Tạo set
numbers = {1, 2, 3, 4, 5}
mixed = {1, "hello", 3.14}

# Kiểm tra phần tử (O(1) - rất nhanh!)
print(3 in numbers)  # True
print(10 in numbers) # False

# Loại bỏ phần tử trùng lặp
data = [1, 2, 2, 3, 3, 3, 4]
unique = set(data)   # {1, 2, 3, 4}`,
            title: "Sử dụng Set",
          },

          {
            type: "heading",
            level: 3,
            content: "Ứng dụng Set: Loại bỏ trùng lặp",
          },
          {
            type: "code",
            language: "python",
            content: `# Bài toán: Tìm số phần tử duy nhất trong mảng
arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique_elements = set(arr)
print(len(unique_elements))  # 4`,
            title: "Đếm phần tử unique",
          },

          { type: "heading", level: 2, content: "Dictionary (Từ điển)" },
          {
            type: "text",
            content:
              "Dictionary lưu trữ dạng Key-Value (khóa-giá trị). Thích hợp cho các bài toán đếm tần suất, tra cứu nhanh, hoặc lưu thông tin.",
          },

          {
            type: "code",
            language: "python",
            content: `# Tạo dictionary
scores = {"Alice": 90, "Bob": 85, "Charlie": 88}

# Truy cập giá trị
print(scores["Alice"])  # 90

# Thêm phần tử
scores["David"] = 92

# Kiểm tra khóa tồn tại
if "Alice" in scores:
    print("Alice co diem")`,
            title: "Tạo và truy cập Dictionary",
          },

          { type: "heading", level: 3, content: "Ứng dụng 1: Đếm tần suất" },
          {
            type: "text",
            content:
              "Bài toán HSG rất hay yêu cầu đếm tần suất xuất hiện của mỗi phần tử.",
          },

          {
            type: "code",
            language: "python",
            content: `# Đếm tần suất các chữ cái
text = "hello world"
freq = {}

for char in text:
    if char in freq:
        freq[char] += 1
    else:
        freq[char] = 1

print(freq)  
# {'h': 1, 'e': 1, 'l': 3, 'o': 2, ' ': 1, 'w': 1, 'r': 1, 'd': 1}`,
            title: "Đếm tần suất các ký tự",
          },

          { type: "heading", level: 3, content: "Cách viết ngắn gọn hơn" },
          {
            type: "code",
            language: "python",
            content: `# Cách 1: Dùng get() với giá trị mặc định
freq = {}
for char in "hello":
    freq[char] = freq.get(char, 0) + 1

# Cách 2: Dùng collections.Counter (Python)
from collections import Counter
freq = Counter("hello")  # Counter({'l': 2, 'h': 1, 'e': 1, 'o': 1})`,
            title: "Cách viết gọn",
          },

          {
            type: "heading",
            level: 3,
            content: "Ứng dụng 2: Lưu thông tin đối tượng",
          },
          {
            type: "code",
            language: "python",
            content: `# Lưu thông tin học sinh
student = {
    "name": "Tung",
    "age": 15,
    "grade": 10,
    "scores": [9.5, 8.0, 9.0]
}

print(student["name"])  # Tung
print(student["scores"][0])  # 9.5`,
            title: "Lưu dữ liệu phức tạp",
          },

          { type: "heading", level: 3, content: "Duyệt qua Dictionary" },
          {
            type: "code",
            language: "python",
            content: `scores = {"Alice": 90, "Bob": 85}

# Duyệt khóa
for name in scores:
    print(name)  # Alice, Bob

# Duyệt giá trị
for score in scores.values():
    print(score)  # 90, 85

# Duyệt cả khóa và giá trị
for name, score in scores.items():
    print(f"{name}: {score}")`,
            title: "Duyệt Dictionary",
          },

          {
            type: "alert",
            variant: "tip",
            content:
              "Tip: Dùng Dict khi bạn cần tra cứu nhanh theo khóa. Dùng Set khi chỉ cần kiểm tra phần tử có tồn tại hay không.",
          },
        ],
        exercise: {
          title: "Đếm tần suất ký tự",
          description:
            "Đọc một chuỗi từ file FREQ.INP. Đếm tần suất của mỗi ký tự. Ghi kết quả ra file FREQ.OUT theo định dạng: ký_tự tần_suất (một dòng per ký tự).",
          inputFile: "FREQ.INP",
          outputFile: "FREQ.OUT",
          testCases: [
            {
              input: "hello",
              expectedOutput: "h 1\ne 1\nl 2\no 1",
              isPublic: true,
            },
          ],
        },
      },
    ],
  },
  {
    id: "math-thienhb",
    title: "6. Số học chuyên sâu",
    lessons: [
      {
        id: "divisibility-primes",
        title: "Số nguyên tố, Hợp số & Chính phương",
        content: [
          { type: "heading", level: 2, content: "Số nguyên tố & Hợp số" },
          {
            type: "text",
            content:
              "Số nguyên tố là số lớn hơn 1 chỉ chia hết cho 1 và chính nó. Hợp số là số lớn hơn 1 và không phải nguyên tố.",
          },

          { type: "heading", level: 3, content: "Ví dụ" },
          {
            type: "text",
            content:
              "Số nguyên tố: 2, 3, 5, 7, 11, 13, 17, 19, 23, ...\nHợp số: 4, 6, 8, 9, 10, 12, 14, 15, 16, ...\nSố 1 không là nguyên tố cũng không là hợp số.",
          },

          { type: "heading", level: 3, content: "Kiểm tra số nguyên tố" },
          {
            type: "text",
            content:
              "Để kiểm tra n có phải nguyên tố, ta duyệt các ước từ 2 đến √n. Nếu không có ước nào, n là nguyên tố.\nVì sao chỉ cần duyệt đến √n? Vì nếu n = a × b và a > √n, thì b < √n.",
          },

          {
            type: "code",
            language: "python",
            content: `def is_prime(n):
    """Kiểm tra n có phải số nguyên tố"""
    if n < 2:
        return False
    
    # Duyệt từ 2 đến sqrt(n)
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False  # Tìm thấy ước, n là hợp số
    
    return True  # Không tìm thấy ước nào, n là nguyên tố

# Kiểm thử
print(is_prime(2))   # True
print(is_prime(17))  # True
print(is_prime(18))  # False`,
            title: "Kiểm tra số nguyên tố O(√N)",
          },

          {
            type: "heading",
            level: 3,
            content: "Liệt kê tất cả số nguyên tố đến N",
          },
          {
            type: "text",
            content:
              "Dùng thuật toán Sieve of Eratosthenes để tìm tất cả số nguyên tố đến N trong O(N log log N).",
          },

          {
            type: "code",
            language: "python",
            content: `def sieve_of_eratosthenes(n):
    """Tìm tất cả số nguyên tố <= n"""
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:  # Nếu i chưa bị đánh dấu
            # Đánh dấu tất cả bội của i
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    
    # Trả về danh sách số nguyên tố
    return [i for i in range(n + 1) if is_prime[i]]

primes = sieve_of_eratosthenes(30)
print(primes)  # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`,
            title: "Sieve of Eratosthenes",
          },

          {
            type: "heading",
            level: 2,
            content: "Số chính phương (Perfect Square)",
          },
          {
            type: "text",
            content:
              "Số chính phương là bình phương của một số nguyên: 1, 4, 9, 16, 25, 36, ...",
          },

          {
            type: "code",
            language: "python",
            content: `import math

def is_perfect_square(n):
    """Kiểm tra n có phải số chính phương"""
    root = int(math.sqrt(n))
    return root * root == n

# Kiểm thử
print(is_perfect_square(16))  # True (4*4)
print(is_perfect_square(17))  # False
print(is_perfect_square(100)) # True (10*10)`,
            title: "Kiểm tra số chính phương",
          },

          {
            type: "heading",
            level: 3,
            content: "Cẽ hệt tất cả Số chính phương đến N",
          },
          {
            type: "code",
            language: "python",
            content: `n = 100

# Cách 1: Dùng vòng lặp
squares = []
i = 1
while i * i <= n:
    squares.append(i * i)
    i += 1
print(squares)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# Cách 2: Dùng list comprehension
squares = [i*i for i in range(1, int(n**0.5) + 1)]
print(squares)`,
            title: "Liệt kê số chính phương",
          },

          {
            type: "alert",
            variant: "tip",
            content:
              "Tip: Khi kiểm tra √n, hãy dùng int(n**0.5) hoặc math.isqrt(n) (Python 3.8+). Tránh lỗi do sai số float!",
          },
        ],
        exercise: {
          title: "Kiểm tra số nguyên tố",
          description:
            "Đọc số N từ file PRIME2.INP. Kiểm tra N có phải số nguyên tố hay không. Ghi 'YES' hoặc 'NO' ra file PRIME2.OUT.",
          inputFile: "PRIME2.INP",
          outputFile: "PRIME2.OUT",
          testCases: [
            {
              input: "17",
              expectedOutput: "YES",
              isPublic: true,
            },
            {
              input: "18",
              expectedOutput: "NO",
              isPublic: false,
            },
          ],
        },
      },
      {
        id: "factors-multiples",
        title: "Ước số & Bội số",
        content: [
          { type: "heading", level: 2, content: "Ước số (Divisor)" },
          {
            type: "text",
            content:
              "Ước số của n là số a sao cho n chia hết cho a (n % a == 0).",
          },

          { type: "heading", level: 3, content: "Ví dụ" },
          {
            type: "text",
            content:
              "Ước số của 12: 1, 2, 3, 4, 6, 12\nƯớc số của 20: 1, 2, 4, 5, 10, 20",
          },

          { type: "heading", level: 3, content: "Tìm tất cả ước số" },
          {
            type: "text",
            content:
              "Duyệt từ 1 đến √n. Nếu i chia hết n, thì cả i và n/i đều là ước số.",
          },

          {
            type: "code",
            language: "python",
            content: `def get_divisors(n):
    """Tìm tất cả ước số của n"""
    divs = []
    
    for i in range(1, int(n**0.5) + 1):
        if n % i == 0:
            divs.append(i)          # Thêm i
            if i != n // i:          # Nếu i khác n/i
                divs.append(n // i)  # Thêm n/i
    
    return sorted(divs)

divisors = get_divisors(12)
print(divisors)  # [1, 2, 3, 4, 6, 12]

divisors = get_divisors(20)
print(divisors)  # [1, 2, 4, 5, 10, 20]`,
            title: "Tìm tất cả ước số",
          },

          { type: "heading", level: 2, content: "Bội số (Multiple)" },
          {
            type: "text",
            content:
              "Bội số của n là số b sao cho b chia hết cho n, hay b = n × k (k là số nguyên dương).",
          },

          { type: "heading", level: 3, content: "Ví dụ" },
          {
            type: "text",
            content:
              "Bội số của 3: 3, 6, 9, 12, 15, 18, ...\nBội số của 5: 5, 10, 15, 20, 25, ...",
          },

          {
            type: "code",
            language: "python",
            content: `def get_multiples(n, limit):
    """Tìm tất cả bội số của n không vượt quá limit"""
    multiples = []
    
    for k in range(1, limit // n + 1):
        multiples.append(n * k)
    
    return multiples

# Hoặc ngắn gọn
multiples = [n*k for k in range(1, limit // n + 1)]

result = get_multiples(3, 20)
print(result)  # [3, 6, 9, 12, 15, 18]`,
            title: "Tìm bội số",
          },

          { type: "heading", level: 2, content: "ƯCLN (GCD) & BCNN (LCM)" },
          {
            type: "text",
            content:
              "ƯCLN (Greatest Common Divisor): Ước số lớn nhất chung của hai số.\nBCNN (Least Common Multiple): Bội số nhỏ nhất chung của hai số.",
          },

          {
            type: "code",
            language: "python",
            content: `import math

# Python cung cấp sẵn hàm gcd
a, b = 12, 18
print(math.gcd(a, b))  # 6 (ƯCLN)

# BCNN = (a * b) / ƯCLN(a, b)
lcm = (a * b) // math.gcd(a, b)
print(lcm)  # 36 (BCNN)

# Python 3.9+ có lcm sẵn
print(math.lcm(a, b))  # 36`,
            title: "Tính ƯCLN và BCNN",
          },

          { type: "heading", level: 3, content: "Ứng dụng thực tiễn" },
          {
            type: "code",
            language: "python",
            content: `# Bài toán: Tìm ước số chung lớn nhất của 48 và 18
def gcd_manual(a, b):
    """Thuật toán Euclid"""
    while b:
        a, b = b, a % b
    return a

print(gcd_manual(48, 18))  # 6

# Xác minh
print(48 % 6, 18 % 6)  # (0, 0) - cả hai đều chia hết`,
            title: "Thuật toán Euclid",
          },

          {
            type: "alert",
            variant: "tip",
            content:
              "Tip: Trong bài HSG, dùng math.gcd() để tiết kiệm thời gian code. Nhưng hiểu cách tính ƯCLN bằng Euclid cũng rất quan trọng!",
          },
        ],
        exercise: {
          title: "Tính ƯCLN và BCNN",
          description:
            "Đọc hai số A và B từ file UCLN.INP. Tính ƯCLN(A,B) và BCNN(A,B). Ghi kết quả ra file UCLN.OUT theo định dạng: ƯCLN BCNN.",
          inputFile: "UCLN.INP",
          outputFile: "UCLN.OUT",
          testCases: [
            {
              input: "12 18",
              expectedOutput: "6 36",
              isPublic: true,
            },
          ],
        },
      },
    ],
  },
  {
    id: "geometry",
    title: "7. Hình học tính toán",
    lessons: [
      {
        id: "points-lines-advanced",
        title: "Vị trí tương đối & Đường thẳng",
        content: [
          {
            type: "heading",
            level: 2,
            content: "Tích có hướng (Cross Product)",
          },
          {
            type: "text",
            content:
              "Tích có hướng giúp xác định vị trí tương đối của ba điểm trong mặt phẳng. Cụ thể, xác định điểm C nằm bên trái, bên phải, hay trên đường thẳng AB.",
          },

          { type: "heading", level: 3, content: "Công thức" },
          {
            type: "text",
            content:
              "Cho ba điểm A(xa, ya), B(xb, yb), C(xc, yc):\nCross Product = (xb - xa)(yc - ya) - (yb - ya)(xc - xa)\n\nNếu CP > 0: C nằm bên trái AB\nNếu CP = 0: A, B, C thẳng hàng\nNếu CP < 0: C nằm bên phải AB",
          },

          {
            type: "code",
            language: "python",
            content: `def cross_product(xa, ya, xb, yb, xc, yc):
    """Tính tích có hướng của vector AB và AC"""
    return (xb - xa) * (yc - ya) - (yb - ya) * (xc - xa)

# Kiểm tra vị trí A, B, C
a = (0, 0)
b = (1, 0)
c = (0, 1)

cp = cross_product(a[0], a[1], b[0], b[1], c[0], c[1])
print(cp)  # 1 (C nằm bên trái AB)

if cp > 0:
    print("C ben trai AB")
elif cp == 0:
    print("A, B, C thang hang")
else:
    print("C ben phai AB")`,
            title: "Cross Product - Vị trí điểm",
          },

          {
            type: "heading",
            level: 2,
            content: "Phương trình đường thẳng qua 2 điểm",
          },
          {
            type: "text",
            content:
              "Phương trình tổng quát của đường thẳng: Ax + By + C = 0\n\nNếu đường thẳng đi qua A(x1, y1) và B(x2, y2), ta có:\nA = y1 - y2\nB = x2 - x1\nC = -(A*x1 + B*y1)",
          },

          {
            type: "code",
            language: "python",
            content: `def line_equation(x1, y1, x2, y2):
    """Tim phuong trinh duong thang Ax + By + C = 0"""
    A = y1 - y2
    B = x2 - x1
    C = -(A * x1 + B * y1)
    return A, B, C

# Duong thang qua (1, 2) va (3, 4)
A, B, C = line_equation(1, 2, 3, 4)
print(f"PT: {A}x + {B}y + {C} = 0")
# -2x + 2y + 0 = 0
# hay: -x + y = 0
# hay: y = x

# Kiem tra: (1, 1) co nam tren duong thang khong?
x, y = 1, 1
result = A * x + B * y + C
print(f"A*x + B*y + C = {result}")  # 0 - co nam tren duong thang`,
            title: "PT đường thẳng",
          },

          {
            type: "heading",
            level: 2,
            content: "Khoảng cách từ điểm đến đường thẳng",
          },
          {
            type: "text",
            content:
              "Cho đường thẳng Ax + By + C = 0 và điểm P(x0, y0).\nKhoảng cách = |A*x0 + B*y0 + C| / √(A² + B²)",
          },

          {
            type: "code",
            language: "python",
            content: `import math

def distance_point_to_line(A, B, C, x0, y0):
    """Tinh khoang cach tu diem (x0, y0) den duong thang Ax+By+C=0"""
    numerator = abs(A * x0 + B * y0 + C)
    denominator = math.sqrt(A**2 + B**2)
    return numerator / denominator

# Duong thang: x - y = 0
A, B, C = 1, -1, 0

# Diem (2, 1)
dist = distance_point_to_line(A, B, C, 2, 1)
print(f"Khoang cach: {dist:.4f}")  # 0.7071 (la sqrt(2)/2)`,
            title: "Khoảng cách từ điểm đến đường thẳng",
          },

          {
            type: "alert",
            variant: "tip",
            content:
              "Tip: Tích có hướng là công cụ rất mạnh trong hình học tính toán. Đa số bài toán hình học HSG đều cần nó!",
          },
        ],
        exercise: {
          title: "Kiểm tra ba điểm thẳng hàng",
          description:
            "Đọc tọa độ ba điểm A, B, C từ file COLINEAR.INP. Kiểm tra ba điểm có thẳng hàng không. Ghi 'YES' hoặc 'NO' ra file COLINEAR.OUT.",
          inputFile: "COLINEAR.INP",
          outputFile: "COLINEAR.OUT",
          testCases: [
            {
              input: "0 0 1 1 2 2",
              expectedOutput: "YES",
              isPublic: true,
            },
          ],
        },
      },
      {
        id: "shapes-advanced",
        title: "Chu vi & Diện tích: Tròn, Tam giác, Tứ giác",
        content: [
          { type: "heading", level: 2, content: "Hình tròn" },

          { type: "heading", level: 3, content: "Công thức" },
          {
            type: "text",
            content:
              "Với R là bán kính:\n- Diện tích: S = π × R²\n- Chu vi: P = 2 × π × R",
          },

          {
            type: "code",
            language: "python",
            content: `import math

def circle_area(R):
    return math.pi * R**2

def circle_perimeter(R):
    return 2 * math.pi * R

# Ví dụ: Bán kính R = 5
R = 5
print(f"Diện tích: {circle_area(R):.4f}")      # 78.5398
print(f"Chu vi: {circle_perimeter(R):.4f}")    # 31.4159`,
            title: "Tính toán hình tròn",
          },

          { type: "heading", level: 2, content: "Tam giác" },

          {
            type: "heading",
            level: 3,
            content: "Công thức 1: Chiều cao (Height)",
          },
          {
            type: "text",
            content:
              "S = 0.5 × Base × Height\n\nĐây là cách đơn giản nhất nếu bạn biết đáy và chiều cao.",
          },

          {
            type: "code",
            language: "python",
            content: `def triangle_area_height(base, height):
    return 0.5 * base * height

# Ví dụ: đáy = 10, chiều cao = 6
area = triangle_area_height(10, 6)
print(f"Diện tích: {area}")  # 30`,
            title: "Tam giác - Công thức chiều cao",
          },

          {
            type: "heading",
            level: 3,
            content: "Công thức 2: Heron (Biết 3 cạnh)",
          },
          {
            type: "text",
            content:
              "Khi biết 3 cạnh a, b, c:\n1. Tính nửa chu vi: p = (a + b + c) / 2\n2. Tính diện tích: S = √(p × (p-a) × (p-b) × (p-c))",
          },

          {
            type: "code",
            language: "python",
            content: `import math

def triangle_area_heron(a, b, c):
    """Tinh dien tich tam giac biet 3 canh"""
    p = (a + b + c) / 2
    area = math.sqrt(p * (p - a) * (p - b) * (p - c))
    return area

# Ví dụ: Tam giác với cạnh 3, 4, 5
area = triangle_area_heron(3, 4, 5)
print(f"Diện tích: {area}")  # 6.0 (tam giác vuông)`,
            title: "Tam giác - Công thức Heron",
          },

          {
            type: "heading",
            level: 3,
            content: "Công thức 3: Tọa độ (Biết 3 tọa độ)",
          },
          {
            type: "text",
            content:
              "Cho 3 đỉnh A(x1, y1), B(x2, y2), C(x3, y3):\nS = |x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2)| / 2",
          },

          {
            type: "code",
            language: "python",
            content: `def triangle_area_coords(x1, y1, x2, y2, x3, y3):
    """Tinh dien tich tam giac theo toa do"""
    area = abs(x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2)) / 2
    return area

# Ví dụ: A(0,0), B(4,0), C(0,3)
area = triangle_area_coords(0, 0, 4, 0, 0, 3)
print(f"Diện tích: {area}")  # 6.0 (tam giác vuông)`,
            title: "Tam giác - Công thức tọa độ",
          },

          { type: "heading", level: 2, content: "Đa giác" },

          {
            type: "heading",
            level: 3,
            content: "Công thức Shoelace (Lace Formula)",
          },
          {
            type: "text",
            content:
              "Dùng để tính diện tích của bất kỳ đa giác nào khi biết tọa độ các đỉnh.\n\nS = |Σ(x_i × y_(i+1) - x_(i+1) × y_i)| / 2\n\nNơi i chạy từ 0 đến n-1, và (n) là (0).",
          },

          {
            type: "code",
            language: "python",
            content: `def polygon_area_shoelace(vertices):
    """Tinh dien tich da giac theo Shoelace formula"""
    n = len(vertices)
    area = 0
    
    for i in range(n):
        x1, y1 = vertices[i]
        x2, y2 = vertices[(i + 1) % n]  # Diem tiep theo (quay ve diem dau neu cuoi)
        area += x1 * y2 - x2 * y1
    
    return abs(area) / 2

# Ví dụ: Tứ giác với đỉnh (0,0), (4,0), (4,3), (0,3)
vertices = [(0, 0), (4, 0), (4, 3), (0, 3)]
area = polygon_area_shoelace(vertices)
print(f"Diện tích hình chữ nhật: {area}")  # 12.0`,
            title: "Công thức Shoelace - Đa giác",
          },

          {
            type: "alert",
            variant: "warning",
            content:
              "Chú ý: Công thức Shoelace đòi hỏi các đỉnh phải được sắp xếp theo thứ tự (cùng chiều hoặc ngược chiều kim đồng hồ).",
          },
        ],
        exercise: {
          title: "Tính diện tích tam giác",
          description:
            "Đọc tọa độ ba đỉnh A, B, C từ file TRIANGLE.INP. Tính diện tích tam giác ABC dùng công thức tọa độ. Ghi kết quả (làm tròn 2 chữ số thập phân) ra file TRIANGLE.OUT.",
          inputFile: "TRIANGLE.INP",
          outputFile: "TRIANGLE.OUT",
          testCases: [
            {
              input: "0 0 4 0 0 3",
              expectedOutput: "6.00",
              isPublic: true,
            },
          ],
        },
      },
    ],
  },
  {
    id: "advanced",
    title: "8. Giải thuật Nâng cao",
    lessons: [
      {
        id: "fibonacci-advanced",
        title: "Dãy Fibonacci & Dãy con, Đoạn con",
        content: [
          { type: "heading", level: 2, content: "Dãy Fibonacci" },
          {
            type: "text",
            content:
              "Fibonacci là dãy số được định nghĩa bằng công thức truy hồi:\nF(n) = F(n-1) + F(n-2), với F(1) = 1, F(2) = 1\n\nDãy: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...",
          },

          { type: "heading", level: 3, content: "Cách 1: Đệ quy (Slow)" },
          {
            type: "code",
            language: "python",
            content: `def fib_recursive(n):
    """Cach de quy - TIM KHONG LAM DUNG!"""
    if n <= 2:
        return 1
    return fib_recursive(n-1) + fib_recursive(n-2)

print(fib_recursive(10))  # 55
# Tuy nhien sai so: fib_recursive(50) se rat cham! - O(2^N)`,
            title: "Fibonacci - Đệ quy (chậm)",
          },

          {
            type: "heading",
            level: 3,
            content: "Cách 2: Dynamic Programming (Tốt)",
          },
          {
            type: "text",
            content:
              "Lưu các kết quả đã tính trong mảng để tránh phép tính lặp lại. Độ phức tạp O(N).",
          },

          {
            type: "code",
            language: "python",
            content: `def fib_dp(n):
    """Cach dung DP - SAH HAI!"""
    if n <= 2:
        return 1
    
    f = [0] * (n + 1)
    f[1] = f[2] = 1
    
    for i in range(3, n + 1):
        f[i] = f[i-1] + f[i-2]
    
    return f[n]

print(fib_dp(10))   # 55
print(fib_dp(50))   # 12586269025 - nhanh`,
            title: "Fibonacci - Dynamic Programming",
          },

          { type: "heading", level: 2, content: "Đoạn con vs Dãy con" },

          { type: "heading", level: 3, content: "Đoạn con (Subarray)" },
          {
            type: "text",
            content:
              "Đoạn con là các phần tử LIÊN TIẾP trong mảng. Thứ tự và liên tục là bắt buộc.",
          },

          {
            type: "code",
            language: "python",
            content: `arr = [1, 2, 3, 4, 5]

# Các đoạn con
# [1], [2], [3], [4], [5]
# [1,2], [2,3], [3,4], [4,5]
# [1,2,3], [2,3,4], [3,4,5]
# ...

# Bai toan: Tim tong lon nhat cua doan con
def max_subarray_sum(arr):
    """Thuật toán Kadane - O(N)"""
    max_sum = arr[0]
    current_sum = arr[0]
    
    for i in range(1, len(arr)):
        current_sum = max(arr[i], current_sum + arr[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum

print(max_subarray_sum([1, -2, 3, 4, -5]))  # 7 (doan [3,4])`,
            title: "Tìm đoạn con có tổng max",
          },

          { type: "heading", level: 3, content: "Dãy con (Subsequence)" },
          {
            type: "text",
            content:
              "Dãy con bao gồm các phần tử KHÔNG CẦN LIÊN TIẾP nhưng phải giữ đúng thứ tự từ mảng gốc. Có thể bỏ qua các phần tử ở giữa.",
          },

          {
            type: "code",
            language: "python",
            content: `arr = [1, 2, 3, 4, 5]

# Các dãy con (không cần liên tục)
# [1], [2], [3], [4], [5]
# [1,2], [1,3], [1,4], [1,5]
# [1,2,3], [1,2,4], [1,2,5], [1,3,4], ...
# [1,2,3,4,5]

# Bai toan: Tim day tang dai nhat (LIS)
def lis(arr):
    """Longest Increasing Subsequence - O(N^2)"""
    n = len(arr)
    dp = [1] * n  # dp[i] = do dai day tang dai nhat ket thuc tai i
    
    for i in range(n):
        for j in range(i):
            if arr[j] < arr[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)

print(lis([3, 1, 4, 1, 5, 9, 2]))  # 4 (dãy [1, 4, 5, 9])`,
            title: "Tìm dãy con tăng dài nhất",
          },

          {
            type: "alert",
            variant: "tip",
            content:
              "Lưu ý: Dãy con là khái niệm rộng hơn đoạn con. Mỗi đoạn con đều là dãy con, nhưng không phải dãy con nào cũng là đoạn con!",
          },
        ],
        exercise: {
          title: "Tính số Fibonacci thứ N",
          description:
            "Đọc số N từ file FIB.INP. Tính số Fibonacci thứ N (F(1)=1, F(2)=1, F(n)=F(n-1)+F(n-2)). Ghi kết quả ra file FIB.OUT.",
          inputFile: "FIB.INP",
          outputFile: "FIB.OUT",
          testCases: [
            {
              input: "10",
              expectedOutput: "55",
              isPublic: true,
            },
          ],
        },
      },
      {
        id: "divide-conquer-deep",
        title: "Thuật toán Chia để trị (Divide & Conquer)",
        content: [
          { type: "heading", level: 2, content: "Nguyên lý Chia để trị" },
          {
            type: "text",
            content:
              "Chia để trị là một kỹ thuật thiết kế thuật toán bằng cách chia bài toán lớn thành những bài toán nhỏ hơn cùng dạng, giải quyết chúng độc lập, rồi kết hợp kết quả.\n\n3 bước chính:\n1. Chia (Divide): Chia bài toán thành các bài toán con nhỏ hơn.\n2. Trị (Conquer): Giải các bài toán con (thường dùng đệ quy).\n3. Kết hợp (Combine): Gộp kết quả từ các bài toán con thành cơ sở cho bài toán lớn.",
          },

          {
            type: "heading",
            level: 2,
            content: "Ví dụ 1: Tìm kiếm nhị phân (Binary Search)",
          },
          {
            type: "text",
            content:
              "Tìm kiếm một phần tử trong mảng đã sắp xếp bằng cách chia đôi liên tiếp. Độ phức tạp: O(log N).",
          },

          {
            type: "code",
            language: "python",
            content: `def binary_search(arr, target):
    """Tim target trong mang da sap xep"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid  # Tim thay
        elif arr[mid] < target:
            left = mid + 1  # Tim ben phai
        else:
            right = mid - 1  # Tim ben trai
    
    return -1  # Khong tim thay

# Ví dụ
arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 6))   # -1`,
            title: "Binary Search - O(log N)",
          },

          {
            type: "heading",
            level: 2,
            content: "Ví dụ 2: Sắp xếp Trộn (Merge Sort)",
          },
          {
            type: "text",
            content:
              "Chia mảng thành hai nữa, sắp xếp từng nữa, rồi trộp chúng lại. Độ phức tạp: O(N log N) - luôn ổn định.",
          },

          {
            type: "code",
            language: "python",
            content: `def merge_sort(arr):
    """Sap xep tron - O(N log N)"""
    if len(arr) <= 1:
        return arr
    
    # Chia
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Kết hợp
    return merge(left, right)

def merge(left, right):
    """Trop hai mang da sap xep"""
    result = []
    i = j = 0
    
    # So sanh va trop
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Thêm phan tu con lai
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Ví dụ
arr = [3, 1, 4, 1, 5, 9, 2]
sorted_arr = merge_sort(arr)
print(sorted_arr)  # [1, 1, 2, 3, 4, 5, 9]`,
            title: "Merge Sort - O(N log N)",
          },

          {
            type: "heading",
            level: 2,
            content: "Ví dụ 3: Sắp xếp Nhanh (Quick Sort)",
          },
          {
            type: "text",
            content:
              "Chọn một phần tử pivot, phân chia mảng thành 3 phần: nhỏ hơn pivot, bằng pivot, lớn hơn pivot. Độ phức tạp trung bình: O(N log N).",
          },

          {
            type: "code",
            language: "python",
            content: `def quick_sort(arr):
    """Sap xep nhanh - O(N log N) trung binh"""
    if len(arr) <= 1:
        return arr
    
    # Chon pivot la phan tu o giua
    pivot = arr[len(arr) // 2]
    
    # Phan chia
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    # Tra ve da sap xep
    return quick_sort(left) + middle + quick_sort(right)

# Ví dụ
arr = [3, 1, 4, 1, 5, 9, 2]
print(quick_sort(arr))  # [1, 1, 2, 3, 4, 5, 9]`,
            title: "Quick Sort - O(N log N)",
          },

          { type: "heading", level: 2, content: "So sánh cách tiếp cận" },
          {
            type: "text",
            content:
              "So sánh các tính chất của ba thuật toán:\n- Binary Search: O(log N), chỉ có thể dùng cho mảng đã sắp xếp.\n- Merge Sort: O(N log N), luôn ổn định, dùng O(N) bộ nhớ thêm.\n- Quick Sort: O(N log N) trung bình, sắp xếp tại chỗ (in-place), nhanh trong thực tế.",
          },

          {
            type: "alert",
            variant: "tip",
            content:
              "Tip: Chia để trị là một kỹ thuật rất mạnh. Ngoài sắp xếp, nó còn dùng cho tìm kiếm, tính toán (FFT), và nhiều bài toán khác!",
          },
        ],
        exercise: {
          title: "Tìm phần tử lớn nhất (Binary Search)",
          description:
            "Đọc một mảng đã sắp xếp và số X từ file BINSEARCH.INP. Tìm vị trí của X trong mảng dùng Binary Search. Ghi vị trí (1-indexed) hoặc -1 nếu không tìm thấy ra file BINSEARCH.OUT.",
          inputFile: "BINSEARCH.INP",
          outputFile: "BINSEARCH.OUT",
          testCases: [
            {
              input: "1 3 5 7 9 11 13\n7",
              expectedOutput: "4",
              isPublic: true,
            },
          ],
        },
      },
    ],
  },
];
