# Thần Số Học

Trang tra cứu thần số học Pythagoras: người dùng nhập họ tên và ngày sinh, ứng dụng tính các chỉ số và hiển thị báo cáo diễn giải, có thể tải về dạng PDF.

React 19 + Vite 6 + Redux Toolkit, chạy hoàn toàn ở phía trình duyệt (không có backend, không lưu dữ liệu người dùng).

## Chạy dự án

```bash
npm install
npm run dev      # dev server
npm run build    # build vào dist/
npm run preview  # xem thử bản build
npm test         # unit test (vitest)
npm run lint     # eslint
```

## Hai route

| Route | Nội dung | File |
|---|---|---|
| `/` | Trang tra cứu: form họ tên và ngày sinh, phần giới thiệu | `src/Pages/FormInfor.jsx` |
| `/detail-number` | Báo cáo, chia phần bằng anchor: `#overview`, `#main_number` và các chỉ số, `#charts`, `#lifepeak`, `#summary_all` | `src/Pages/Numerlogy.jsx` |

Báo cáo chỉ nằm trong Redux của phiên hiện tại. Mở trực tiếp `/detail-number` hoặc tải lại trang sẽ hiện trạng thái "Bạn chưa có dữ liệu báo cáo" kèm nút quay về form.

## Cấu trúc chính

```
src/
├── Data/numerology.js          # Toàn bộ nội dung diễn giải (HTML) theo từng con số
├── service/
│   ├── numerlogy.js            # Thuật toán: rút gọn số, quy đổi họ tên, mũi tên, bốn đỉnh
│   ├── birthDate.js            # Chuẩn hóa và kiểm tra ngày sinh dd/mm/yyyy
│   ├── fullName.js             # Chuẩn hóa và kiểm tra họ tên
│   └── reportPdf.js            # Dựng file PDF (pdfmake), import động khi bấm tải
├── component/
│   ├── DetailNumber/           # Các phần của báo cáo: chỉ số, biểu đồ, đỉnh cao, tổng kết
│   ├── Decor.jsx               # Họa tiết SVG (núi, trăng, vòng số, ngôi sao)
│   └── ReportToc.jsx           # Mục lục báo cáo
├── store/                      # Redux slice cho số theo ngày sinh và theo họ tên
└── index.css                   # Toàn bộ CSS, không dùng framework
```

Thiết kế giao diện nằm trong `docs/mystic-purple/` (đặc tả, sơ đồ luồng, ảnh mockup).

## Vài điểm cần biết khi sửa code

- **Thuật toán trong `src/service/numerlogy.js` và nội dung trong `src/Data/numerology.js`** quyết định kết quả báo cáo. Khi sửa giao diện, đừng đổi hai phần này; nếu buộc phải đổi, hãy so kết quả trước/sau với vài bộ họ tên và ngày sinh có dấu.
- **Ngày sinh** được truyền vào thuật toán dưới dạng `{ $D, $M, $y }` (`$M` đếm từ 0), xem `toDateParts` trong `src/service/birthDate.js`.
- **`ChartCombineEnergy`** tính danh sách số mạnh/số yếu rồi đưa vào Redux; phần Tổng kết đọc lại danh sách đó, nên component này phải render trước `SummaryAll`.
- **Thư viện PDF** (`pdfmake`) được import động trong `DownloadPdfButton`, nhờ vậy không nằm trong bundle của trang đầu.
- **Font trong PDF không có emoji**, nên `reportPdf.js` lọc bỏ emoji khỏi nội dung trước khi dựng file.

## Triển khai

Build ra thư mục `dist/` gồm file tĩnh. Vì dùng `BrowserRouter`, máy chủ phải trả về `index.html` cho mọi đường dẫn:

- Apache: `public/.htaccess` (đã có sẵn trong bản build).
- Netlify / Cloudflare Pages: `public/_redirects` (đã có sẵn).
- Nginx: thêm `try_files $uri /index.html;`.
