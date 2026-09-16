import { describe, expect, it } from "vitest";
import {
  checkArrow,
  emptyNumber,
  fourTop,
  lackArrow,
  mergeNumberString,
  numberAtLeastThreeTimes,
  pickCharacter,
  removeVietnameseTones,
  soulAndExpress,
  stringToNumber,
} from "./numerlogy.js";

describe("mergeNumberString", () => {
  it("rút gọn ngày sinh như hiện tại", () => {
    expect(mergeNumberString("1281995")).toBe("8");
    expect(mergeNumberString("2922000")).toBe("6");
    expect(mergeNumberString("111990")).toBe("3");
  });

  it("giữ số master khi không rút gọn hết", () => {
    expect(mergeNumberString("29")).toBe("11");
    expect(mergeNumberString("29", true)).toBe("2");
  });

  it("không treo với chuỗi rỗng hoặc ký tự lạ", () => {
    expect(mergeNumberString("")).toBe("0");
    expect(mergeNumberString("abc")).toBe("0");
    expect(mergeNumberString("12-1")).toBe("4");
  });
});

describe("chuyển họ tên thành số", () => {
  it("bỏ dấu tiếng Việt", () => {
    expect(removeVietnameseTones("Nguyễn Văn Đức")).toBe("Nguyen Van Duc");
  });

  it("quy đổi chữ cái thành số", () => {
    expect(stringToNumber("NGUYEN MINH ANH")).toBe("573755040580158");
  });

  it("lấy nguyên âm, và không lỗi khi từ không có nguyên âm", () => {
    expect(pickCharacter("ANH")).toBe("A");
    expect(pickCharacter("HM")).toBe("");
    expect(() => soulAndExpress(["HM"])).not.toThrow();
  });
});

describe("mũi tên và số lặp", () => {
  it("tìm mũi tên đủ và mũi tên trống", () => {
    expect(checkArrow("1281995")).toEqual(["159", "258"]);
    expect(lackArrow("1281995")).toEqual([]);
    expect(emptyNumber("1281995")).toBe("34670".replace("0", ""));
  });

  it("lấy số xuất hiện từ 3 lần", () => {
    expect(numberAtLeastThreeTimes(["5", "5", "5", "1"])).toBe("5");
    expect(numberAtLeastThreeTimes(["1", "2"])).toBe("");
  });
});

describe("fourTop", () => {
  const top4 = fourTop(12, 8, 1995);

  it("tính bốn đỉnh theo tuổi và năm", () => {
    expect(top4.top4_peak.top01).toEqual({ num: "11", age: 28, year: 2023 });
    expect(top4.top4_peak.top04).toEqual({ num: "5", age: 55, year: 2050 });
  });

  it("tính hàng đáy tháng/ngày/năm", () => {
    expect(top4.top4_peak.numberbase).toEqual({ num1: "8", num2: "3", num3: "6" });
  });

  it("tính bốn thử thách, cho phép giá trị 0", () => {
    expect(top4.top4_challenge.top01.num).toBe(5);
    expect(fourTop(1, 1, 1990).top4_challenge.top01.num).toBe(0);
  });
});
