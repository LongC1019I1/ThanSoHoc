import { describe, expect, it } from "vitest";
import { buildNameKey, isLookupStorageEnabled, saveLookup } from "./saveLookup.js";

describe("buildNameKey", () => {
  it("bỏ dấu, bỏ hoa thường, gộp khoảng trắng", () => {
    expect(buildNameKey("Nguyễn  Minh Anh")).toBe("nguyen minh anh");
    expect(buildNameKey("NGUYỄN MINH ANH")).toBe("nguyen minh anh");
    expect(buildNameKey("Đỗ Thị Ý")).toBe("do thi y");
  });

  it("các cách viết khác nhau cho cùng một khóa, nên trùng sẽ không lưu lại", () => {
    expect(buildNameKey("Trần Anh Thư")).toBe(buildNameKey("tran  anh   thu"));
    expect(buildNameKey("Lê Văn Đức")).toBe("le van duc");
  });

  it("chuỗi rỗng cho khóa rỗng", () => {
    expect(buildNameKey("")).toBe("");
    expect(buildNameKey(null)).toBe("");
  });
});

describe("saveLookup khi chưa cấu hình Supabase", () => {
  it.skipIf(isLookupStorageEnabled())("báo bỏ qua và không ném lỗi", async () => {
    await expect(
      saveLookup({ fullName: "Nguyễn Minh Anh", birth: { day: 12, month: 8, year: 1995 } })
    ).resolves.toEqual({ skipped: "chưa cấu hình Supabase" });
  });
});
