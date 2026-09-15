import { useRef } from "react";
import { Input } from "antd";
import { FiCalendar } from "react-icons/fi";
import {
  BIRTH_DATE_MIN_YEAR,
  birthDateToIso,
  formatBirthDateInput,
  isoToBirthDate,
  todayIso,
  validateBirthDate,
} from "../service/birthDate";

// Ô nhập ngày sinh dùng trong antd Form.Item: gõ số tự thêm "/", có nút mở lịch của trình duyệt.
function BirthDateInput({ value = "", onChange, onBlur, ...rest }) {
  const pickerRef = useRef(null);
  const parsed = validateBirthDate(value);

  const handleChange = (event) => {
    const raw = event.target.value;
    const isDeleting = raw.length < value.length;
    onChange?.(formatBirthDateInput(raw, { appendSeparator: !isDeleting }));
  };

  const openPicker = () => {
    const picker = pickerRef.current;
    if (!picker) return;
    picker.value = parsed.error ? "" : birthDateToIso(parsed);
    try {
      picker.showPicker();
    } catch {
      picker.focus();
    }
  };

  const handlePick = (event) => {
    const text = isoToBirthDate(event.target.value);
    if (!text) return;
    onChange?.(text);
    // Form.Item kiểm tra khi blur; gọi lại để xóa lỗi cũ sau khi chọn trên lịch.
    setTimeout(() => onBlur?.(), 0);
  };

  return (
    <div className="birth-date-field">
      <Input
        {...rest}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        size="large"
        inputMode="numeric"
        autoComplete="bday"
        maxLength={10}
        placeholder="dd/mm/yyyy"
        suffix={
          <button
            type="button"
            className="calendar-button"
            onClick={openPicker}
            aria-label="Chọn ngày sinh trên lịch"
          >
            <FiCalendar aria-hidden="true" />
          </button>
        }
      />
      <input
        ref={pickerRef}
        type="date"
        className="native-date-picker"
        tabIndex={-1}
        aria-hidden="true"
        min={`${BIRTH_DATE_MIN_YEAR}-01-01`}
        max={todayIso()}
        onChange={handlePick}
      />
      <p className="birth-date-hint" aria-live="polite">
        {parsed.error
          ? "Chỉ cần gõ số, dấu “/” sẽ tự thêm."
          : `Ngày ${parsed.day} tháng ${parsed.month} năm ${parsed.year}`}
      </p>
    </div>
  );
}

export default BirthDateInput;
