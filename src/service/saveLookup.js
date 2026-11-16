// Lưu họ tên và ngày sinh lên Supabase.
// Trùng (tên đã chuẩn hóa + ngày sinh) thì bỏ qua, nhờ ràng buộc duy nhất trên bảng.
// Chưa cấu hình biến môi trường thì hàm không làm gì và app vẫn chạy bình thường.
import { birthDateToIso } from "./birthDate";
import { removeVietnameseTones } from "./numerlogy";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const TABLE = import.meta.env.VITE_SUPABASE_TABLE || "lookups";

export const isLookupStorageEnabled = () =>
  Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * Khóa chống trùng: bỏ dấu, bỏ hoa thường, gộp khoảng trắng.
 * "Nguyễn  Minh Anh" và "nguyen minh anh" cho cùng một khóa.
 */
export const buildNameKey = (fullName) =>
  removeVietnameseTones(String(fullName ?? ""))
    .toLowerCase()
    .replace(/[^a-z]+/g, " ")
    .trim();

/**
 * Ghi một lượt tra cứu. Trả về { saved } hoặc { skipped } kèm lý do.
 * Không bao giờ ném lỗi ra ngoài: lưu hỏng thì báo cáo vẫn phải xem được.
 */
export async function saveLookup({ fullName, birth }) {
  if (!isLookupStorageEnabled()) return { skipped: "chưa cấu hình Supabase" };

  const nameKey = buildNameKey(fullName);
  const birthDate = birth ? birthDateToIso(birth) : "";
  if (!nameKey || !birthDate) return { skipped: "thiếu dữ liệu" };

  try {
    // Import động: thư viện chỉ tải khi thật sự cần lưu.
    const { createClient } = await import("@supabase/supabase-js");
    const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
    });

    // ignoreDuplicates: INSERT ... ON CONFLICT DO NOTHING, nên không cần quyền đọc.
    const { error } = await client.from(TABLE).upsert(
      { full_name: fullName, name_key: nameKey, birth_date: birthDate },
      { onConflict: "name_key,birth_date", ignoreDuplicates: true }
    );

    if (error) return { skipped: `lỗi Supabase: ${error.message}` };
    return { saved: true };
  } catch (error) {
    return { skipped: `lỗi mạng: ${error.message}` };
  }
}
