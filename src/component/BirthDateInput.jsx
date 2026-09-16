import { useEffect, useRef } from "react";
import { FiCalendar } from "react-icons/fi";
import {
  BIRTH_DATE_MIN_YEAR,
  birthDateToIso,
  formatBirthDateInput,
  isoToBirthDate,
  todayIso,
  validateBirthDate,
} from "../service/birthDate";

// Vị trí con trỏ tính theo số chữ số đứng trước nó, để bỏ qua các dấu "/" do tự thêm.
const caretAfterDigits = (text, digits) => {
  if (digits <= 0) return 0;
  let seen = 0;
  for (let index = 0; index < text.length; index += 1) {
    if (text[index] >= "0" && text[index] <= "9") {
      seen += 1;
      if (seen === digits) return index + 1;
    }
  }
  return text.length;
};

const countDigits = (text) => (text.match(/\d/g) || []).length;

// Ô nhập ngày sinh: gõ số tự thêm "/", có nút mở lịch của trình duyệt.
function BirthDateInput({
  id = "date",
  value = "",
  onChange,
  onBlur,
  invalid = false,
  describedBy,
  inputRef,
}) {
  const pickerRef = useRef(null);
  const localRef = useRef(null);
  const pendingCaret = useRef(null);
  const parsed = validateBirthDate(value);

  const setRef = (node) => {
    localRef.current = node;
    if (inputRef) inputRef.current = node;
  };

  useEffect(() => {
    const caret = pendingCaret.current;
    pendingCaret.current = null;
    const element = localRef.current;
    if (caret == null || !element || document.activeElement !== element) return;
    element.setSelectionRange(caret, caret);
  }, [value]);

  const handleChange = (event) => {
    const raw = event.target.value;
    const caret = event.target.selectionStart ?? raw.length;
    const isDeleting = raw.length < value.length;

    // Xóa dấu "/" thì xóa luôn chữ số ngay trước nó, nếu không dấu sẽ hiện lại ngay.
    const removedSeparator = isDeleting && value.length - raw.length === 1 && value[caret] === "/";
    const source = removedSeparator
      ? raw.slice(0, Math.max(0, caret - 1)) + raw.slice(caret)
      : raw;
    const caretInSource = removedSeparator ? Math.max(0, caret - 1) : caret;

    const formatted = formatBirthDateInput(source, { appendSeparator: !isDeleting });
    pendingCaret.current = caretAfterDigits(formatted, countDigits(source.slice(0, caretInSource)));
    onChange?.(formatted);
  };

  const openPicker = () => {
    const picker = pickerRef.current;
    if (!picker) return;
    picker.value = parsed.error ? "" : birthDateToIso(parsed);
    try {
      picker.showPicker();
    } catch {
      // Trình duyệt không hỗ trợ mở lịch bằng script: giữ focus ở ô nhập tay.
      localRef.current?.focus();
    }
  };

  const handlePick = (event) => {
    const text = isoToBirthDate(event.target.value);
    if (!text) return;
    // Không gọi onBlur ở đây: nó sẽ kiểm tra giá trị cũ. Lỗi được xóa khi onChange chạy.
    onChange?.(text);
    localRef.current?.focus();
  };

  return (
    <div className="birth-date-field">
      <div className={`field-control${invalid ? " is-invalid" : ""}`}>
        <input
          id={id}
          ref={setRef}
          type="text"
          className="field-input"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          inputMode="numeric"
          autoComplete="bday"
          placeholder="dd/mm/yyyy"
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
        />
        <button
          type="button"
          className="calendar-button"
          onClick={openPicker}
          aria-label="Chọn ngày sinh trên lịch"
        >
          <FiCalendar aria-hidden="true" />
        </button>
      </div>
      <input
        ref={pickerRef}
        type="date"
        className="native-date-picker"
        tabIndex={-1}
        aria-label="Chọn ngày sinh trên lịch"
        min={`${BIRTH_DATE_MIN_YEAR}-01-01`}
        max={todayIso()}
        onChange={handlePick}
      />
      {!invalid && (
        <p className="birth-date-hint">
          {parsed.error
            ? "Chỉ cần gõ số, dấu “/” sẽ tự thêm."
            : `Ngày ${parsed.day} tháng ${parsed.month} năm ${parsed.year}`}
        </p>
      )}
    </div>
  );
}

export default BirthDateInput;
