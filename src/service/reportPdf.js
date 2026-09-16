// Tạo file PDF báo cáo từ dữ liệu Redux và nội dung src/Data/numerology.js.
// Module này được import động khi người dùng bấm tải, nên pdfmake không nằm trong bundle chính.
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import {
  NUMEROLOGY_KARMA,
  NUMERLOGY_COMMON,
  NUMEROLOGY_NAME,
  NUMEROLOGY_ATTITUDE,
  NUMEROLOGY_MATURITY,
  NUMEROLOGY_LIFE_PATH,
  NUMEROLOGY_BIRTHDAY_NUMBER,
  NUMEROLOGY_SOUL_NUMBER,
  INNER_NUMBER,
  EXPRESSION_NUMBER,
  ARROW,
  STRONG_NUMB,
  WEAK_NUMB,
  TOP_PEAK,
  TOP_CHALLENGE,
  NUMERLOGY_JOB,
  SOLUTION_NUMB,
} from "../Data/numerology";
import { INDEX_INTROS } from "../component/DetailNumber/indexIntros";

pdfMake.addVirtualFileSystem(vfsFonts);
pdfMake.addFonts({
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
});

const COLORS = {
  primary: "#4b2a9a",
  accent: "#7b4ae8",
  gold: "#8a6a2f",
  text: "#1f1830",
  muted: "#5d5470",
  faint: "#b9b0c9",
  border: "#dcd2f0",
  soft: "#f4effc",
};

const MISSING = "Chưa có nội dung diễn giải cho mục này.";
const PHASE_KEYS = ["top01", "top02", "top03", "top04"];
const GRID_ROWS = [
  [3, 6, 9],
  [2, 5, 8],
  [1, 4, 7],
];

// Font Roboto không có emoji (💡, 💼…) nên bỏ chúng để PDF không hiện ô vuông.
const stripEmoji = (text) =>
  String(text ?? "")
    .replace(/\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}]|️|‍|⃣/gu, "")
    .replace(/(>|^)[ \t]+/gm, "$1");

// html-to-pdfmake trả về một object khi HTML chỉ có một nút gốc, nên luôn chuẩn hóa về mảng.
const html = (source) => {
  if (!source) return [];
  const converted = htmlToPdfmake(stripEmoji(source), {
    window,
    removeExtraBlanks: true,
    defaultStyles: {
      p: { margin: [0, 2, 0, 6] },
      h3: { fontSize: 12, bold: true, color: COLORS.primary, margin: [0, 8, 0, 4] },
      h4: { fontSize: 11.5, bold: true, color: COLORS.primary, margin: [0, 8, 0, 4] },
      ul: { marginBottom: 6, marginLeft: 4 },
      li: { margin: [0, 1, 0, 1] },
      strong: { bold: true },
      b: { bold: true },
    },
  });
  return Array.isArray(converted) ? converted : [converted];
};

const heading = (text, options = {}) => ({ text, style: "h1", headlineLevel: 1, ...options });
const subheading = (text) => ({ text, style: "h2", headlineLevel: 1 });
const label = (text) => ({ text, style: "h3", headlineLevel: 1 });
const missing = (text = MISSING) => ({ text, style: "missing" });
const paragraphs = (text) =>
  stripEmoji(text)
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => ({ text: line, margin: [0, 0, 0, 6] }));

const countDigits = (value) => {
  const counts = {};
  for (const chr of String(value ?? "").replaceAll("0", "")) {
    counts[chr] = (counts[chr] || 0) + 1;
  }
  return counts;
};

const lightGrid = {
  hLineColor: () => COLORS.border,
  vLineColor: () => COLORS.border,
  hLineWidth: () => 0.8,
  vLineWidth: () => 0.8,
};

function indexArticle({ title, value, intro, body }) {
  return [
    subheading(value !== undefined && value !== "" ? `${title}: ${value}` : title),
    intro ? { text: intro, style: "intro" } : null,
    ...(body.length ? body : [missing()]),
  ].filter(Boolean);
}

function mainNumberBody(numberKarma) {
  const human = NUMERLOGY_COMMON.DUONG_DOI?.[numberKarma];
  const karma = NUMEROLOGY_KARMA[numberKarma];
  if (!human && !karma) return [];

  const lessonList = (title, text) => {
    const lines = String(text ?? "").split("\n").filter((line) => line.trim());
    return {
      stack: [label(title), lines.length ? { ul: lines, margin: [0, 0, 0, 4] } : missing()],
    };
  };

  // Tiêu đề khớp nội dung: HUONG_PT là hướng phát triển, KHAC_PHUC là khuynh hướng cần khắc phục.
  const readings = [
    ["Tính chất chung", human?.CHUNG],
    ["Mục đích sống", human?.MUC_DICH],
    ["Đặc điểm", human?.DAC_DIEM],
    ["Điều kiện phát triển", human?.DKPT],
    ["Hướng phát triển", human?.HUONG_PT],
    ["Khuynh hướng cần khắc phục", human?.KHAC_PHUC],
    ["Nghề nghiệp", human?.NGHE_NGHIEP],
  ];

  return [
    {
      columns: [lessonList("Bài học", karma?.BAI_HOC), lessonList("Môi trường", karma?.MOI_TRUONG)],
      columnGap: 20,
    },
    ...readings.flatMap(([title, text]) => {
      const body = paragraphs(text);
      return [label(title), ...(body.length ? body : [missing()])];
    }),
  ];
}

function digitGrid(title, subtitle, data) {
  const counts = countDigits(data);
  return {
    stack: [
      { text: title, style: "h3", margin: [0, 0, 0, 2] },
      { text: subtitle, style: "muted", margin: [0, 0, 0, 6] },
      {
        table: {
          widths: [44, 44, 44],
          body: GRID_ROWS.map((row) =>
            row.map((number) =>
              counts[number]
                ? {
                    stack: [
                      { text: String(number), bold: true, fontSize: 14, color: COLORS.primary },
                      { text: `×${counts[number]}`, fontSize: 8, color: COLORS.gold },
                    ],
                    alignment: "center",
                    fillColor: COLORS.soft,
                    margin: [0, 5, 0, 5],
                  }
                : { text: String(number), color: COLORS.faint, alignment: "center", margin: [0, 11, 0, 11] }
            )
          ),
        },
        layout: lightGrid,
      },
    ],
  };
}

function arrowItems(list, type) {
  return (list || []).flatMap((arr) => {
    const item = ARROW[arr]?.[type];
    const digits = String(arr).split("").join(", ");
    return [
      {
        text: [
          { text: item?.TEN ?? String(arr), bold: true },
          { text: `  (${type === 1 ? "Mũi tên đủ" : "Mũi tên trống"} · các số ${digits})`, color: COLORS.muted },
        ],
        margin: [0, 6, 0, 2],
      },
      ...(item?.Y_NGHIA ? html(item.Y_NGHIA) : [missing()]),
    ];
  });
}

function phaseSection({ title, intro, topFour, content, stageTitles, birthDayList }) {
  if (!topFour) return [subheading(title), missing()];
  const base = topFour.numberbase || {};
  return [
    subheading(title),
    { text: `Theo ngày sinh ${birthDayList}`, style: "muted", margin: [0, 0, 0, 4] },
    { text: intro, style: "intro" },
    {
      table: {
        headerRows: 1,
        widths: ["*", 60, 60, 60],
        body: [
          ["Giai đoạn", "Tuổi", "Năm", "Con số"].map((text) => ({ text, style: "tableHeader" })),
          ...PHASE_KEYS.map((key, index) => [
            stageTitles[index],
            String(topFour[key]?.age ?? ""),
            String(topFour[key]?.year ?? ""),
            { text: String(topFour[key]?.num ?? ""), bold: true, color: COLORS.primary },
          ]),
        ],
      },
      layout: lightGrid,
      margin: [0, 0, 0, 4],
    },
    {
      text: `Hàng đáy sau khi rút gọn: tháng ${base.num1}, ngày ${base.num2}, năm ${base.num3}.`,
      style: "muted",
      margin: [0, 0, 0, 8],
    },
    ...PHASE_KEYS.flatMap((key, index) => {
      const phase = topFour[key];
      if (!phase) return [];
      const text = content[phase.num]?.noidung;
      return [
        label(`${stageTitles[index]}: con số ${phase.num} (${phase.age} tuổi · năm ${phase.year})`),
        ...(text ? html(text) : [missing()]),
      ];
    }),
  ];
}

function summarySection(karmaState, nameState) {
  const strongNumb = karmaState.strong_list || [];
  const weakNumb = karmaState.weak_list || [];
  // Giữ danh sách thay vì gộp object: số cơ bản và số master dùng chung tên thuộc tính
  // nên cách gộp cũ làm mất nội dung (1 và 10, 7 và 11, 9 và 11).
  const strongTexts = [
    ...new Set(strongNumb.flatMap((numb) => Object.values(STRONG_NUMB[numb] ?? {}))),
  ];
  const strengths = [
    ...strongTexts.flatMap(html),
    ...(karmaState.arrow || []).map((arr) => ARROW[arr]?.[1]?.KET_LUAN).filter(Boolean).flatMap(html),
  ];
  const weaknesses = weakNumb.map((numb) => WEAK_NUMB[numb]?.noidung).filter(Boolean).flatMap(html);
  const motivations = [
    NUMEROLOGY_LIFE_PATH[nameState.destiny]?.tomtat,
    NUMEROLOGY_SOUL_NUMBER[nameState.soul]?.tomtat,
    NUMEROLOGY_SOUL_NUMBER[karmaState.number]?.tomtat,
  ]
    .filter(Boolean)
    .flatMap(html);
  const jobs = strongNumb.map((numb) => NUMERLOGY_JOB[numb]?.noidung).filter(Boolean).flatMap(html);
  // Dữ liệu chưa có gợi ý nghề nghiệp cho một số số mạnh (10, 20, 30): ghi rõ thay vì bỏ qua.
  const jobsMissing = strongNumb.filter((numb) => !NUMERLOGY_JOB[numb]?.noidung);
  if (jobsMissing.length) {
    jobs.push(missing(`Chưa có gợi ý nghề nghiệp cho số ${jobsMissing.join(", ")}.`));
  }
  const solutions = weakNumb.map((numb) => SOLUTION_NUMB[numb]?.noidung).filter(Boolean).flatMap(html);

  const block = (title, lead, body) => [
    subheading(title),
    { text: lead, style: "muted", margin: [0, 0, 0, 6] },
    ...(body.length ? body : [missing()]),
  ];

  return [
    ...block("Điểm mạnh của bạn", "Là tài năng, năng lực, khả năng, đặc điểm chủ đạo của bạn", strengths),
    ...block("Điểm yếu của bạn", "Là nhược điểm, bài học, khuyết điểm của bạn", weaknesses),
    ...block("Động lực thỏa mãn", "Là khao khát nội tâm, mong muốn, sứ mệnh", motivations),
    ...block(
      "Xu hướng nghề nghiệp",
      "Đây là gợi ý xu hướng nghề nghiệp dựa trên năng lượng thuần trong bộ số của Bạn, trong thực tế để chọn được nghề nghiệp phù hợp Bạn cần xét thêm những yếu tố khác như: Nguồn lực (tài năng thực tế) và lợi thế cạnh tranh (mối quan hệ, truyền thống, gia đình, tài chính, nơi ở ..vv) của Bạn để Bạn lựa chọn được nghề nghiệp phù hợp nhất.",
      jobs
    ),
    ...block("Lời khuyên và cách phát triển", "Là những đề xuất phát triển giúp bạn trở nên hoàn thiện hơn", solutions),
    {
      table: {
        widths: ["*"],
        body: [
          [
            {
              text: [
                { text: "Lưu ý: ", bold: true },
                "Những nghề nêu trên không phải bạn không làm được mà bạn cần phải nỗ lực nhiều hơn để bù đắp",
              ],
              fillColor: "#fbf5e8",
              margin: [8, 6, 8, 6],
            },
          ],
        ],
      },
      layout: { hLineColor: () => "#e6d3a8", vLineColor: () => "#e6d3a8" },
      margin: [0, 10, 0, 0],
    },
  ];
}

const formatDate = (date) =>
  `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

export function buildReportDocument(state, { generatedAt = new Date() } = {}) {
  const karma = state.numberKarmaMain;
  const names = state.numberName;
  const top4 = karma.top4 || {};
  const innerContents = String(names.inner ?? "")
    .split(/\s+/)
    .map((numb) => INNER_NUMBER[numb]?.noidung)
    .filter(Boolean)
    .flatMap(html);

  const overviewRows = [
    ["Số đường đời (Số chủ đạo)", karma.number],
    ["Số tên riêng", names.name],
    ["Số định mệnh", names.destiny],
    ["Số thái độ", karma.atitute],
    ["Số trưởng thành", names.mature],
    ["Số ngày sinh", karma.day_birth],
    ["Số linh hồn", names.soul],
    ["Số biểu đạt", names.express],
    ["Số nội cảm", names.inner || "Không có"],
  ];

  const indexArticles = [
    { title: "Số đường đời", value: karma.number, intro: INDEX_INTROS.main_number, body: mainNumberBody(karma.number) },
    { title: "Số tên riêng", value: names.name, intro: INDEX_INTROS.name_number, body: html(NUMEROLOGY_NAME[names.name]?.noidung) },
    { title: "Số định mệnh", value: names.destiny, intro: INDEX_INTROS.destiny_number, body: html(NUMEROLOGY_LIFE_PATH[names.destiny]?.noidung) },
    { title: "Số thái độ", value: karma.atitute, intro: INDEX_INTROS.atitute_number, body: html(NUMEROLOGY_ATTITUDE[karma.atitute]?.noidung) },
    { title: "Số trưởng thành", value: names.mature, intro: INDEX_INTROS.mature_number, body: html(NUMEROLOGY_MATURITY[names.mature]?.noidung) },
    { title: "Số ngày sinh", value: karma.day_birth, intro: INDEX_INTROS.birth_number, body: html(NUMEROLOGY_BIRTHDAY_NUMBER[karma.day_birth]?.noidung) },
    { title: "Số linh hồn", value: names.soul, intro: INDEX_INTROS.soul_number, body: html(NUMEROLOGY_SOUL_NUMBER[names.soul]?.noidung) },
    { title: "Số biểu đạt", value: names.express, intro: INDEX_INTROS.express_number, body: html(EXPRESSION_NUMBER[names.express]?.noidung) },
    {
      title: "Số nội cảm",
      value: names.inner || "Không có",
      intro: INDEX_INTROS.inner_number,
      body: innerContents.length
        ? innerContents
        : [missing("Họ tên của bạn không có số nào xuất hiện từ 3 lần trở lên, nên không có Số nội cảm để diễn giải.")],
    },
  ];

  const lackArrows = karma.lack_arrow || [];
  const fullArrows = karma.arrow || [];

  return {
    pageSize: "A4",
    pageMargins: [44, 50, 44, 50],
    info: {
      title: `Báo cáo thần số học - ${names.full_name_list}`,
      author: "Thần Số Học",
      subject: "Báo cáo thần số học Pythagoras",
    },
    defaultStyle: { font: "Roboto", fontSize: 10.5, lineHeight: 1.3, color: COLORS.text },
    styles: {
      h1: { fontSize: 20, bold: true, color: COLORS.primary, margin: [0, 0, 0, 10] },
      h2: { fontSize: 14.5, bold: true, color: COLORS.primary, margin: [0, 14, 0, 6] },
      h3: { fontSize: 11.5, bold: true, color: COLORS.gold, margin: [0, 8, 0, 4] },
      intro: { italics: true, color: COLORS.muted, fillColor: COLORS.soft, margin: [0, 0, 0, 8] },
      muted: { color: COLORS.muted, fontSize: 9.5 },
      missing: { italics: true, color: COLORS.muted, margin: [0, 2, 0, 6] },
      tableHeader: { bold: true, color: COLORS.primary, fillColor: COLORS.soft },
      "text-primary": { color: COLORS.accent },
      "text-danger": { color: "#b4233c" },
      "text-info": { color: "#1f6fa8" },
      subtitle: { bold: true, color: COLORS.gold },
      "weak-title": { bold: true, color: COLORS.gold },
    },
    pageBreakBefore: (currentNode, followingNodesOnPage) =>
      currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0,
    footer: (currentPage, pageCount) => ({
      columns: [
        { text: `Báo cáo thần số học · ${names.full_name_list}`, color: COLORS.muted, fontSize: 8 },
        { text: `Trang ${currentPage}/${pageCount}`, alignment: "right", color: COLORS.muted, fontSize: 8 },
      ],
      margin: [44, 16, 44, 0],
    }),
    content: [
      { text: "THẦN SỐ HỌC PYTHAGORAS", color: COLORS.gold, bold: true, fontSize: 9, characterSpacing: 2, margin: [0, 60, 0, 8] },
      { text: "Báo cáo thần số học", fontSize: 30, bold: true, color: COLORS.primary },
      { text: names.full_name_list, fontSize: 20, margin: [0, 16, 0, 4] },
      { text: `Ngày sinh: ${karma.birth_day_list}`, color: COLORS.muted },
      { text: `Ngày tạo báo cáo: ${formatDate(generatedAt)}`, color: COLORS.muted, fontSize: 9, margin: [0, 2, 0, 28] },
      {
        table: {
          widths: ["*", 110],
          body: [
            [{ text: "Chỉ số", style: "tableHeader" }, { text: "Giá trị", style: "tableHeader", alignment: "center" }],
            ...overviewRows.map(([name, value], index) => [
              { text: name, bold: index === 0, margin: [0, 3, 0, 3] },
              {
                text: String(value ?? ""),
                alignment: "center",
                bold: true,
                fontSize: index === 0 ? 16 : 12,
                color: COLORS.primary,
                margin: [0, index === 0 ? 1 : 3, 0, 3],
              },
            ]),
          ],
        },
        layout: lightGrid,
      },

      heading("1. Chi tiết các chỉ số", { pageBreak: "before" }),
      ...indexArticles.flatMap(indexArticle),

      heading("2. Biểu đồ và năng lượng", { pageBreak: "before" }),
      {
        text: "Mỗi ô là một con số. Ô tô nền ghi số lần xuất hiện (×n); ô chữ nhạt là số không có.",
        style: "muted",
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          digitGrid("Biểu đồ ngày sinh", `Ngày sinh ${karma.birth_day_list}`, karma.birth_day),
          digitGrid("Biểu đồ họ tên", "Chữ số quy đổi từ họ tên", names.full_name_number),
          digitGrid("Biểu đồ tổng hợp", "Gộp ngày sinh và họ tên", `${karma.birth_day}${names.full_name_number}`),
        ],
        columnGap: 14,
      },
      subheading("Tổng hợp năng lượng"),
      {
        columns: [
          { text: [{ text: "Số mạnh: ", bold: true }, (karma.strong_list || []).join(", ") || "Không có"] },
          { text: [{ text: "Số yếu: ", bold: true }, (karma.weak_list || []).join(", ") || "Không có"] },
        ],
      },
      subheading("Mật mã ngày sinh"),
      { text: INDEX_INTROS.date_to_known, style: "intro" },
      ...(lackArrows.length ? [label("Các mũi tên trống"), ...arrowItems(lackArrows, 0)] : []),
      ...(fullArrows.length ? [label("Các mũi tên đủ"), ...arrowItems(fullArrows, 1)] : []),
      ...(!lackArrows.length && !fullArrows.length
        ? [missing("Ngày sinh này không tạo thành mũi tên đủ hoặc mũi tên trống nào.")]
        : []),

      heading("3. Đỉnh cao và thử thách", { pageBreak: "before" }),
      ...phaseSection({
        title: "Các đỉnh cuộc đời",
        intro: INDEX_INTROS.four_peak,
        topFour: top4.top4_peak,
        content: TOP_PEAK,
        stageTitles: ["Đỉnh đầu tiên", "Đỉnh thứ hai", "Đỉnh thứ ba", "Đỉnh thứ tư"],
        birthDayList: karma.birth_day_list,
      }),
      ...phaseSection({
        title: "Các thử thách cuộc đời",
        intro: INDEX_INTROS.four_challenge,
        topFour: top4.top4_challenge,
        content: TOP_CHALLENGE,
        stageTitles: ["Thử thách đầu tiên", "Thử thách thứ hai", "Thử thách thứ ba", "Thử thách thứ tư"],
        birthDayList: karma.birth_day_list,
      }),

      heading("4. Xu hướng nghề nghiệp và tóm tắt về bạn", { pageBreak: "before" }),
      ...summarySection(karma, names),
    ],
  };
}

const slugify = (text) =>
  String(text ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

export const reportFileName = (state) =>
  `bao-cao-than-so-hoc-${slugify(state.numberName.full_name_list) || "ban"}-${String(
    state.numberKarmaMain.birth_day_list ?? ""
  ).replaceAll("/", "-")}.pdf`;

export async function downloadReportPdf(state) {
  await pdfMake.createPdf(buildReportDocument(state)).download(reportFileName(state));
}
