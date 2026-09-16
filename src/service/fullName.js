// Chuẩn hóa và kiểm tra họ tên trước khi đưa vào thuật toán.
// Thuật toán chỉ xử lý được chữ cái; chữ số hoặc chữ không phải Latin làm phép rút gọn số chạy vô hạn.
import { removeVietnameseTones } from "./numerlogy";

export const MAX_FULL_NAME_LENGTH = 70;

export function normalizeFullName(raw) {
  const input = String(raw ?? "");

  // Chữ số phải báo lỗi, không được im lặng bỏ đi: người dùng cần biết tên bị sai.
  if (/\p{N}/u.test(input)) {
    return { error: "Họ tên không được chứa chữ số." };
  }

  // Bỏ dấu câu (dấu chấm, gạch nối, dấu nháy) và gộp khoảng trắng.
  const cleaned = input
    .replace(/[^\p{L}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return { error: "Vui lòng nhập họ và tên của bạn." };
  if (cleaned.length > MAX_FULL_NAME_LENGTH) {
    return { error: `Họ tên quá dài (tối đa ${MAX_FULL_NAME_LENGTH} ký tự).` };
  }

  // removeVietnameseTones chỉ hiểu chữ Latin có dấu tiếng Việt; sau khi bỏ dấu phải còn A-Z.
  const ascii = removeVietnameseTones(cleaned).toUpperCase().replace(/\s+/g, " ").trim();
  if (!/^[A-Z]+( [A-Z]+)*$/.test(ascii)) {
    return {
      error: "Họ tên chỉ gồm chữ cái tiếng Việt và khoảng trắng, không dùng chữ số hay ký tự khác.",
    };
  }

  return { name: cleaned };
}
