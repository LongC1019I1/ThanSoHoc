import { describe, expect, it } from "vitest";
import { normalizeFullName } from "./fullName.js";

describe("normalizeFullName", () => {
  it("giữ nguyên họ tên hợp lệ", () => {
    expect(normalizeFullName("Nguyễn Minh Anh")).toEqual({ name: "Nguyễn Minh Anh" });
    expect(normalizeFullName("Đỗ Thị Ý")).toEqual({ name: "Đỗ Thị Ý" });
  });

  it("gộp khoảng trắng và bỏ dấu câu", () => {
    expect(normalizeFullName("  Nguyễn   Minh  Anh ")).toEqual({ name: "Nguyễn Minh Anh" });
    expect(normalizeFullName("Nguyễn Văn A.")).toEqual({ name: "Nguyễn Văn A" });
    expect(normalizeFullName("Trần-Anh Thư")).toEqual({ name: "Trần Anh Thư" });
    expect(normalizeFullName("O'Brien Ly")).toEqual({ name: "O Brien Ly" });
  });

  it("chặn chữ số và chữ không phải Latin (những trường hợp làm thuật toán chạy vô hạn)", () => {
    expect(normalizeFullName("Anh 123").error).toMatch(/chữ số/);
    expect(normalizeFullName("Nguyễn Văn A1").error).toMatch(/chữ số/);
    expect(normalizeFullName("日本語 テスト").error).toMatch(/chữ cái/);
  });

  it("chặn chuỗi rỗng và quá dài", () => {
    expect(normalizeFullName("").error).toMatch(/Vui lòng nhập/);
    expect(normalizeFullName("   ").error).toMatch(/Vui lòng nhập/);
    expect(normalizeFullName("A".repeat(71)).error).toMatch(/quá dài/);
  });
});
