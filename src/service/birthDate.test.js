import { describe, expect, it } from "vitest";
import {
  birthDateToIso,
  formatBirthDateInput,
  isoToBirthDate,
  nextCaretPosition,
  toDateParts,
  validateBirthDate,
} from "./birthDate.js";

describe("formatBirthDateInput", () => {
  it("tự thêm dấu / khi gõ số", () => {
    expect(formatBirthDateInput("1")).toBe("1");
    expect(formatBirthDateInput("12")).toBe("12/");
    expect(formatBirthDateInput("1208")).toBe("12/08/");
    expect(formatBirthDateInput("12081995")).toBe("12/08/1995");
  });

  it("bổ sung số 0 khi gõ dấu phân cách sau một chữ số", () => {
    expect(formatBirthDateInput("1/")).toBe("01/");
    expect(formatBirthDateInput("1/1/1990")).toBe("01/01/1990");
  });

  it("chuẩn hóa chuỗi dán", () => {
    expect(formatBirthDateInput("12-8-1995")).toBe("12/08/1995");
    expect(formatBirthDateInput("12.08.1995")).toBe("12/08/1995");
    expect(formatBirthDateInput("12 tháng 8 năm 1995")).toBe("12/08/1995");
  });

  it("bỏ chữ số vượt quá và ký tự lạ", () => {
    expect(formatBirthDateInput("12/08/19955")).toBe("12/08/1995");
    expect(formatBirthDateInput("ab12cd")).toBe("12/");
    expect(formatBirthDateInput("")).toBe("");
  });

  it("sửa giữa chuỗi: dấu / kết thúc ô, không hút chữ số của ô sau", () => {
    // bôi đen tháng "08" rồi gõ "1": phải còn "12/1/1995" để gõ tiếp số thứ hai
    expect(formatBirthDateInput("12/1/1995", { appendSeparator: false, padOnSeparator: false })).toBe("12/1/1995");
    // xóa một chữ số của tháng: năm phải giữ nguyên
    expect(formatBirthDateInput("12/8/1995", { appendSeparator: false, padOnSeparator: false })).toBe("12/8/1995");
    // xóa dấu "/" đầu kèm chữ số trước nó
    expect(formatBirthDateInput("108/1995", { appendSeparator: false, padOnSeparator: false })).toBe("10/8/1995");
  });

  it("không tự thêm dấu khi đang xóa", () => {
    expect(formatBirthDateInput("12", { appendSeparator: false })).toBe("12");
    expect(formatBirthDateInput("12/08", { appendSeparator: false })).toBe("12/08");
  });
});

describe("nextCaretPosition", () => {
  it("giữ con trỏ ở cuối khi gõ ở cuối, kể cả khi chuỗi dài ra", () => {
    // gõ "12" -> "12/": con trỏ phải ở sau dấu "/", nếu không ký tự kế tiếp lọt vào giữa
    expect(nextCaretPosition("12/", "12", 2)).toBe(3);
    // gõ "1" rồi "/" -> "01/"
    expect(nextCaretPosition("01/", "1/", 2)).toBe(3);
    expect(nextCaretPosition("12/08/", "12/08", 5)).toBe(6);
  });

  it("đặt sau chữ số vừa sửa khi sửa giữa chuỗi", () => {
    expect(nextCaretPosition("12/08/1995", "12/08/1995", 4)).toBe(4);
    expect(nextCaretPosition("12/08/1995", "1208/1995", 2, { isDeleting: true })).toBe(2);
    expect(nextCaretPosition("12/08/1995", "12/08/1995", 0)).toBe(0);
  });
});

describe("validateBirthDate", () => {
  const today = new Date(2026, 8, 16);

  it("chấp nhận ngày hợp lệ, kể cả hôm nay và 29/02 năm nhuận", () => {
    expect(validateBirthDate("12/08/1995", today)).toEqual({ day: 12, month: 8, year: 1995 });
    expect(validateBirthDate("16/09/2026", today)).toEqual({ day: 16, month: 9, year: 2026 });
    expect(validateBirthDate("29/02/2000", today)).toEqual({ day: 29, month: 2, year: 2000 });
  });

  it("báo lỗi cụ thể cho từng trường hợp", () => {
    expect(validateBirthDate("", today).error).toMatch(/Vui lòng nhập/);
    expect(validateBirthDate("12/08/199", today).error).toMatch(/dd\/mm\/yyyy/);
    expect(validateBirthDate("12/13/1995", today).error).toMatch(/01 đến 12/);
    expect(validateBirthDate("29/02/2001", today).error).toMatch(/28 ngày/);
    expect(validateBirthDate("31/04/1990", today).error).toMatch(/30 ngày/);
    expect(validateBirthDate("01/01/1899", today).error).toMatch(/1900/);
    expect(validateBirthDate("17/09/2026", today).error).toMatch(/tương lai/);
  });
});

describe("chuyển đổi định dạng", () => {
  it("đổi sang dạng $D/$M/$y của thuật toán", () => {
    expect(toDateParts({ day: 12, month: 8, year: 1995 })).toEqual({ $D: 12, $M: 7, $y: 1995 });
  });

  it("đổi qua lại với dạng ISO của input type=date", () => {
    expect(birthDateToIso({ day: 9, month: 11, year: 1987 })).toBe("1987-11-09");
    expect(isoToBirthDate("1987-11-09")).toBe("09/11/1987");
    expect(isoToBirthDate("không hợp lệ")).toBe("");
  });
});
