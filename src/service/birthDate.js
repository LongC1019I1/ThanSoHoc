// Chuẩn hóa và kiểm tra ngày sinh nhập tay dạng dd/mm/yyyy.

export const BIRTH_DATE_MIN_YEAR = 1900;

const FIELD_LENGTHS = [2, 2, 4];
const pad2 = (value) => String(value).padStart(2, "0");

/**
 * Định dạng chuỗi người dùng gõ hoặc dán thành dd/mm/yyyy.
 * - Chỉ giữ chữ số, tự chèn "/" sau ngày và tháng.
 * - Dấu phân cách (/ - . khoảng trắng) kết thúc ô hiện tại, nhờ vậy sửa giữa chuỗi
 *   không hút chữ số của ô sau sang ô trước.
 * - appendSeparator = false khi đang xóa, để không tự thêm lại "/" vừa xóa.
 * - padOnSeparator = true thì gõ dấu sau 1 chữ số sẽ bổ sung số 0 ("1/" → "01/");
 *   khi sửa giữa chuỗi phải đặt false, nếu không ô đang sửa bị điền sớm.
 */
export function formatBirthDateInput(raw, { appendSeparator = true, padOnSeparator = true } = {}) {
  const text = String(raw ?? "");
  const segments = text.split(/\D+/);
  const fields = ["", "", ""];
  let index = 0;

  segments.forEach((segment, segmentIndex) => {
    for (const digit of segment) {
      if (index > 2) break;
      fields[index] += digit;
      if (fields[index].length === FIELD_LENGTHS[index]) index += 1;
    }
    const followedBySeparator = segmentIndex < segments.length - 1;
    if (followedBySeparator && index < 2 && fields[index].length > 0) {
      if (fields[index].length === 1 && padOnSeparator) fields[index] = pad2(fields[index]);
      index += 1;
    }
  });

  const [day, month, year] = fields;
  const addTrailing = appendSeparator || /\D$/.test(text);

  if (year) return `${day}/${month}/${year}`;
  if (month) return month.length === 2 && addTrailing ? `${day}/${month}/` : `${day}/${month}`;
  return day.length === 2 && addTrailing ? `${day}/` : day;
}

const isDigit = (char) => char >= "0" && char <= "9";

/**
 * Vị trí con trỏ sau khi chuỗi được định dạng lại.
 * - Gõ hoặc xóa ở cuối: luôn giữ con trỏ ở cuối, vì chuỗi có thể dài ra do tự thêm "/" hoặc số 0.
 * - Sửa giữa chuỗi: đặt sau chữ số thứ N, và bỏ qua dấu "/" ngay sau nó khi đang thêm ký tự.
 */
export function nextCaretPosition(formatted, source, caret, { isDeleting = false } = {}) {
  if (caret >= source.length) return formatted.length;

  let digitsBefore = 0;
  for (let index = 0; index < caret; index += 1) {
    if (isDigit(source[index])) digitsBefore += 1;
  }
  if (digitsBefore === 0) return 0;

  let seen = 0;
  let position = formatted.length;
  for (let index = 0; index < formatted.length; index += 1) {
    if (!isDigit(formatted[index])) continue;
    seen += 1;
    if (seen === digitsBefore) {
      position = index + 1;
      break;
    }
  }

  if (!isDeleting && formatted[position] === "/") position += 1;
  return position;
}

/** Trả về { day, month, year } nếu hợp lệ, ngược lại { error }. */
export function validateBirthDate(text, today = new Date()) {
  const value = String(text ?? "").trim();
  if (!value) return { error: "Vui lòng nhập ngày sinh của bạn." };

  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return { error: "Nhập đủ ngày sinh theo dạng dd/mm/yyyy, ví dụ 12/08/1995." };

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (month < 1 || month > 12) return { error: "Tháng phải từ 01 đến 12." };
  if (year < BIRTH_DATE_MIN_YEAR) return { error: `Năm sinh phải từ ${BIRTH_DATE_MIN_YEAR} trở đi.` };

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return { error: `Tháng ${pad2(month)}/${year} chỉ có ${daysInMonth} ngày.` };
  }

  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (new Date(year, month - 1, day) > startOfToday) {
    return { error: "Ngày sinh không được ở tương lai." };
  }

  return { day, month, year };
}

/** Cùng dạng các trường dayjs ($D, $M từ 0, $y) mà thuật toán trong FormInfor đang đọc. */
export const toDateParts = ({ day, month, year }) => ({ $D: day, $M: month - 1, $y: year });

export const birthDateToIso = ({ day, month, year }) => `${year}-${pad2(month)}-${pad2(day)}`;

export const isoToBirthDate = (iso) => {
  const match = String(iso ?? "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : "";
};

export const todayIso = (today = new Date()) =>
  `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-${pad2(today.getDate())}`;
