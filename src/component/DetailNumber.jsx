import sochudao from "../assets/img/sochudao.png";
import { NUMEROLOGY_KARMA } from "../Data/numerology";
import parse from "html-react-parser";
function DetailNumber() {
  return (
    <div id="detail_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          1{") "} Con số chủ đạo của bạn là:
          <span className="text-danger">
            {" "}
            Số {NUMEROLOGY_KARMA[9].SO_CHU_DAO}
          </span>
        </h1>
        <img className=" my-1 w-100" src={sochudao} />

        <section className="mt-4">
          <h4 className="uppercase fw-bold my-4">🔥 Đặc điểm nổi bật</h4>
          {parse(NUMEROLOGY_KARMA[9].DAC_DIEM)}
        </section>

        <section className="mt-4">
          Rung động cân bằng – Khi số 9 phát triển hài hòa
          <ul>
            <li>🔹 Yêu tự do, thích trải nghiệm...</li>
            <li>🔹 Yêu thương, ấm áp và dễ gần...</li>
            <li>🔹 Trách nhiệm và cẩn thận...</li>
            <li>🔹 Nhìn nhận quan sát, trực giác mạnh mẽ...</li>
          </ul>
        </section>

        <section className="mt-4">
          <h4>3️⃣ Rung động yếu – Khi số 9 mất cân bằng</h4>
          <ul>
            <li>🔻 Cục cằn, thô lỗ...</li>
            <li>🔻 Nóng nảy, dễ bị kích động...</li>
            <li>🔻 Quá cứng nhắc, bảo thủ...</li>
          </ul>
        </section>

        <section className="mt-4">
          <h4>4️⃣ Rung động quá mạnh – Khi số 9 bị mất kiểm soát</h4>
          <ul>
            <li>✨ Vui vẻ, hòa đồng nhưng dễ bị cảm xúc chi phối...</li>
            <li>
              ✨ Giàu lòng nhân ái, nhưng dễ đặt kỳ vọng quá lớn vào người
              khác...
            </li>
          </ul>
        </section>

        <section className="mt-4">
          <h4>5️⃣ Tóm tắt các tầng phát triển dành cho số 9</h4>
          <ul>
            <li>🔴 Tầng chưa phát triển: Dễ nóng nảy, bảo thủ...</li>
            <li>🟠 Tầng cơ bản: Có lý tưởng, nhưng thiếu thực tế...</li>
            <li>🟢 Tầng phát triển: Mạnh mẽ, vững vàng...</li>
            <li>🔵 Tầng dẫn đầu: Người có thể chuyển hóa tâm thức...</li>
          </ul>
        </section>

        <section className="mt-4 text-center">
          <h4>🔹 Kết luận</h4>
          <p>Người có số đường đời 9 mang trong mình sứ mệnh cao cả...</p>
          <blockquote className="text-success fw-bold">
            "Hãy học cách yêu thương và giúp đỡ đúng cách, để vừa giúp người,
            vừa hoàn thiện chính mình."
          </blockquote>
        </section>
      </div>
    </div>
  );
}

export default DetailNumber;
