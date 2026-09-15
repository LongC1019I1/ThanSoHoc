# Đặc tả giao diện Thần Số Học — tím huyền bí

## Đọc trước khi triển khai

Đối tượng: https://github.com/LongC1019I1/ThanSoHoc, nhánh master.
Bản clone: `../../.codex-tmp-LongC1019I1-ThanSoHoc` tính từ thư mục docs này.
Không triển khai vào ứng dụng Chạm ở thư mục gốc. Kiểm tra remote và branch trước khi sửa.
Đây là thiết kế đề xuất, chưa triển khai. Ảnh là tham chiếu thẩm mỹ; đặc tả và dữ liệu thật ưu tiên hơn chữ/số trong ảnh. Các kết quả trong ảnh chỉ minh họa.

Mở `index.html` để xem bộ ảnh. Mở `flow.svg` để xem sơ đồ trực tiếp; `flow.mmd` là bản Mermaid có thể chỉnh sửa. Ảnh tổng quan có thể chứa biểu tượng tài khoản do công cụ tạo ảnh thêm: bỏ biểu tượng này khi triển khai vì repo không có chức năng tài khoản. Các heading tổng kết minh họa chỉ áp dụng nếu phù hợp nội dung SummaryAll, không tự tạo diễn giải mới.

## Phạm vi và thứ tự

Giữ hai route hiện tại. Chia báo cáo thành các phần có anchor để người đọc không bị lạc; không cần tạo năm route mới.

| Mã | Màn hình / phần | URL đề xuất | Nguồn hiện có |
|---|---|---|---|
| P01 | Tra cứu + giới thiệu | `/` | `src/Pages/FormInfor.jsx` |
| P02 | Tổng quan báo cáo | `/detail-number#overview` | `OverviewNumber.jsx` |
| P03 | Chi tiết các chỉ số | `/detail-number#main_number` và anchor từng chỉ số | `component/DetailNumber/*Number.jsx` |
| P04 | Biểu đồ & năng lượng | `/detail-number#charts` | `ChartDateName`, `DateToKnown`, `ChartCombineEnergy` |
| P05 | Đỉnh cao & thử thách | `/detail-number#lifepeak` | `LifePeak`, `FourPeak`, `FourChallenge` |
| P06 | Tổng kết | `/detail-number#summary_all` | `SummaryAll` |

## Hệ thống thiết kế

- Nền `#10091F`; panel `#211334`; panel nổi `#2B1944`.
- Màu nhấn `#9B6DFF`; chữ chính `#F5F0FF`; chữ phụ `#C7BCD8`; vàng trang trí `#C8AB76`.
- Font đề xuất: Noto Serif cho tiêu đề, Be Vietnam Pro cho nội dung; có fallback serif/sans-serif.
- Cỡ chữ desktop: H1 48px, H2 30px, H3 22px, nội dung 16px/1.7. Mobile H1 32px, H2 26px.
- Khoảng cách: 4, 8, 12, 16, 24, 32, 48, 64px. Panel bo góc 16px; input 12px; viền 1px.
- Container tối đa 1280px; lề desktop 32px, mobile 16px. Sidebar desktop 220px, khoảng cách nội dung 32px.
- Sao, tinh vân và vòng số tập trung ở hero. Nền đọc báo cáo phẳng, không đặt họa tiết dưới đoạn văn.
- Dưới 768px: một cột, menu mục lục dạng nút mở danh sách; thẻ tổng quan có thể hai cột nếu đủ rộng. Không tràn ngang tại 360px.
- Input và nút cao tối thiểu 48px; trạng thái focus rõ; hỗ trợ bàn phím; kiểm tra tương phản WCAG AA khi lập trình.
- Hiệu ứng nhẹ 150–250ms; tắt chuyển động không cần thiết khi prefers-reduced-motion.

## P01 — Tra cứu

Header tên THẦN SỐ HỌC. Menu Trang chủ và Giới thiệu trỏ đến section thật. Không giữ link giả `#` cho mục chưa có nội dung.
Hero: “Khám phá bản thân qua những con số”; mô tả “Giải mã ý nghĩa họ tên và ngày sinh của bạn.”
Form hai trường có label: Họ và tên, Ngày sinh; nút Tra cứu ngay. Ngày hiển thị dd/mm/yyyy.
Kiểm tra tên sau trim không rỗng; ngày hợp lệ và không ở tương lai. Lỗi đặt ngay dưới trường, focus trường lỗi đầu tiên; giữ dữ liệu đã nhập.
Submit hợp lệ gọi lại thuật toán hiện tại, dispatch Redux rồi chuyển `/detail-number#overview`. Chặn submit lặp trong lúc xử lý; lỗi tính toán giữ form và thông báo thử lại.
Giới thiệu lấy nội dung đang có, chia heading/đoạn dễ đọc; không tự viết thêm cam kết khoa học hoặc tiên đoán chắc chắn.

## P02 — Tổng quan

Hiển thị họ tên và ngày sinh từ Redux. Số đường đời là thẻ chính; “Số chủ đạo” là tên gọi khác của cùng giá trị, không tính thành hai chỉ số khác nhau.
Tám thẻ còn lại: tên riêng, định mệnh, thái độ, trưởng thành, ngày sinh, linh hồn, biểu đạt, nội tâm. Nút/thẻ chuyển đến đúng anchor tương ứng.
Nếu ảnh dùng từ “sứ mệnh”, chuẩn hóa nhãn giao diện thành “Số định mệnh” theo repo. Không dùng số minh họa làm fallback dữ liệu thật.

## P03 — Đọc từng chỉ số

Tiêu đề gồm tên chỉ số + giá trị; breadcrumb về tổng quan. Mục lục cố định trên desktop.
Đường đời gồm: bài học, môi trường, tính chất chung, mục đích sống, đặc điểm, điều kiện phát triển, hướng phát triển, khuynh hướng cần khắc phục, nghề nghiệp.
Nội dung dài dùng heading và đoạn/bullet, chiều rộng đọc khoảng 65–75 ký tự; không cắt bỏ nội dung để khớp ảnh. Các chỉ số khác dùng cùng khung đọc nhưng giữ cấu trúc nội dung riêng.
Nguồn chính: `src/Data/numerology.js`; sử dụng nguyên dữ liệu trong bản clone đã cập nhật. Không viết lại nội dung bằng suy đoán.
Lưu ý kiểm tra: MainNumber hiện đang gắn KHAC_PHUC/HUONG_PT với tiêu đề có vẻ ngược nghĩa. Đối chiếu nội dung thực trước khi quyết định đổi mapping, không đổi thuật toán trong lượt sửa giao diện.

## P04 — Biểu đồ

Ba biểu đồ: ngày sinh, họ tên, tổng hợp. Có nhãn từng biểu đồ và chú giải, không chỉ phân biệt bằng màu. Tái sử dụng cách bố trí ô và cách tính số lặp từ ChartDateName; không dựng số theo hình minh họa.
Phần dưới hiển thị giải thích ngày sinh/mũi tên từ DateToKnown và tổng hợp năng lượng từ ChartCombineEnergy. Giữ toàn bộ ý nghĩa và trường hợp thiếu số của repo.
Desktop biểu đồ có thể ba cột; mobile xếp dọc. Mỗi biểu đồ có mô tả văn bản để đọc bằng công cụ hỗ trợ.

## P05 — Đỉnh cao và thử thách

Hai nhóm rõ ràng: bốn đỉnh cao, bốn thử thách. Tái sử dụng `top4.top4_peak` và `top4.top4_challenge`.
Sơ đồ hình học là minh họa dữ liệu; dưới sơ đồ có bốn thẻ theo giai đoạn, số và tuổi/năm nếu thuật toán cung cấp, kèm diễn giải FourPeak/FourChallenge.
Không dùng sampleNumbers/sampleAges khai báo trong component làm dữ liệu thật. Không tự bịa tuổi hoặc năm còn thiếu.
Mobile xếp dọc sơ đồ và thẻ, không ép chữ nhỏ để vừa màn hình.

## P06 — Tổng kết

Hiển thị nguyên nội dung SummaryAll, chia đoạn và nhóm theo heading thực có. Có liên kết về các phần liên quan, nút Về đầu báo cáo và Tra cứu lại.
Không thêm xuất PDF, thanh toán, tài khoản hoặc AI chat trong phạm vi này.

## Dữ liệu và trạng thái

Luồng thực hiện: `FormInfor.onFinish` → hàm trong `src/service/numerlogy` → Redux `numberKarmaMain`/`numberName` → `Numerlogy` → OverviewNumber và DetailNumber → diễn giải từ Data/numerology.
Giữ nguyên cách rút gọn số và xử lý tên/ngày sinh. Không thay thuật toán khi thay CSS/layout.
Repo hiện chặn báo cáo khi không có số đường đời. Mở trực tiếp hoặc refresh mất Redux: hiển thị “Bạn chưa có dữ liệu báo cáo” + nút “Nhập thông tin” về `/`; không tự sinh báo cáo mẫu.
Thiếu một trường diễn giải: hiển thị thông báo chưa có nội dung cho mục đó, phần khác vẫn đọc được. Không truy cập thuộc tính của undefined.
Tra cứu lại về `/`; nếu dữ liệu còn trong phiên có thể điền lại form để sửa, không tự lưu thông tin cá nhân ra dịch vụ khác.

## Tiêu chí nghiệm thu

1. Chạy đúng repo/branch; không có logo Chạm hoặc màn đăng nhập.
2. Form hợp lệ tạo cùng kết quả như trước thay đổi; so sánh ít nhất ba bộ tên/ngày sinh trước/sau, gồm tên tiếng Việt có dấu.
3. Form rỗng, ngày không hợp lệ/tương lai và mở trực tiếp báo cáo đều có trạng thái đúng.
4. Tất cả chỉ số, ba biểu đồ, năng lượng, đỉnh cao, thử thách và tổng kết còn đầy đủ.
5. Mọi liên kết mục lục hoạt động, heading không bị header che; nút tra cứu lại hoạt động.
6. Kiểm tra desktop 1440px, tablet 768px, mobile 390px và 360px; không tràn ngang, chữ đọc được.
7. Kiểm tra keyboard/focus, tương phản và reduced motion; chạy build theo package.json.
8. Ảnh chỉ để so phong cách; số, đồ thị và nội dung thật luôn lấy từ code/dữ liệu.

## Prompt dùng với AI khác

Sao chép đoạn dưới và gửi kèm toàn bộ thư mục này cùng source repo:

> Hãy triển khai thiết kế tím huyền bí cho repo LongC1019I1/ThanSoHoc nhánh master. Đọc README.md gốc, hướng dẫn AGENTS.md nếu có, rồi docs/mystic-purple/README.md và flow.mmd. Xem toàn bộ ảnh trong docs/mystic-purple/images. Xác nhận đúng remote trước khi sửa: ứng dụng cần làm là trang tra cứu công khai, không phải Chạm. Ưu tiên đặc tả và dữ liệu source hơn chữ/số minh họa trong ảnh. Giữ hai route / và /detail-number; chia báo cáo bằng anchor theo bảng P01–P06. Giữ thuật toán và nội dung numerology.js. Triển khai lần lượt P01, P02, P03, P04, P05, P06; sau mỗi phần kiểm tra giao diện desktop/mobile và báo cáo file đã sửa. Không tạo tính năng ngoài phạm vi. Kiểm tra đầy đủ tiêu chí nghiệm thu, ghi rõ phần chưa xong. Không push/deploy nếu chưa được yêu cầu.

Sơ đồ luồng hỗ trợ hiểu hành vi; ảnh mô tả thẩm mỹ; tài liệu này xác định quy tắc; source cung cấp logic và nội dung. Cần gửi đủ bốn thứ. AI chỉ đọc văn bản vẫn có thể dùng đặc tả, nhưng mức độ giống ảnh không được đảm bảo nếu không xem được ảnh.
