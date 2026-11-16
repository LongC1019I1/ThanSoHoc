# Supabase: lưu lịch sử tra cứu

Bảng `public.lookups` giữ họ tên + ngày sinh của mỗi lượt tra cứu. Trang `/admin`
đăng nhập bằng Supabase Auth để xem và xoá.

## Biến môi trường

`.env` (local) và Netlify → Project configuration → Environment variables:

```
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
VITE_SUPABASE_TABLE=lookups
```

Hai biến này nằm trong bundle công khai — an toàn là nhờ RLS, không phải nhờ giấu khoá.

## SQL khởi tạo

```sql
create table public.lookups (
  id bigint generated always as identity primary key,
  full_name text not null,
  name_key text not null,
  birth_date date not null,
  created_at timestamptz not null default now(),
  unique (name_key, birth_date)
);

alter table public.lookups enable row level security;

-- Khách vãng lai chỉ được ghi thêm.
create policy insert_lookups on public.lookups for insert to public with check (true);
-- Chỉ tài khoản đã đăng nhập mới đọc và xoá được.
create policy read_lookups on public.lookups for select to authenticated using (true);
create policy delete_lookups on public.lookups for delete to authenticated using (true);

grant insert on public.lookups to anon, authenticated;
grant select, delete on public.lookups to authenticated;
```

Cố ý **không** có policy UPDATE: bảng chỉ ghi thêm và xoá.

## Lưu ý khi sửa code

- Dùng `.insert()` chứ đừng dùng `.upsert()`: upsert của PostgREST chạy
  `insert ... on conflict do update` nên đòi thêm policy UPDATE, thiếu là lỗi 401 RLS.
  Trùng tên + ngày sinh sẽ trả mã lỗi `23505`, client coi đó là "đã có, bỏ qua".
- Khi xoá, luôn kèm `.select("id")` để biết có thật sự xoá được hàng nào không —
  RLS chặn thì Supabase trả mảng rỗng chứ không báo lỗi.

## Tài khoản quản trị

Supabase → Authentication → Users → Add user (email + mật khẩu). Không có luồng
tự đăng ký trên web, muốn thêm người thì tạo tay ở đây.
