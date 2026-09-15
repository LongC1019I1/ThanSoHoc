export const INDEX_SECTIONS = [
  { id: "main_number", label: "Số đường đời" },
  { id: "name_number", label: "Số tên riêng" },
  { id: "destiny_number", label: "Số định mệnh" },
  { id: "atitute_number", label: "Số thái độ" },
  { id: "mature_number", label: "Số trưởng thành" },
  { id: "birth_number", label: "Số ngày sinh" },
  { id: "soul_number", label: "Số linh hồn" },
  { id: "express_number", label: "Số biểu đạt" },
  { id: "inner_number", label: "Số nội cảm" },
];

export const REPORT_SECTIONS = [
  { href: "overview", label: "Tổng quan" },
  { href: "main_number", label: "Các chỉ số", children: INDEX_SECTIONS },
  { href: "charts", label: "Biểu đồ & năng lượng" },
  { href: "lifepeak", label: "Đỉnh cao & thử thách" },
  { href: "summary_all", label: "Tổng kết" },
];

// Thứ tự theo tài liệu, dùng để xác định mục đang đọc.
export const OBSERVED_SECTION_IDS = [
  "overview",
  ...INDEX_SECTIONS.map((section) => section.id),
  "charts",
  "lifepeak",
  "summary_all",
];
