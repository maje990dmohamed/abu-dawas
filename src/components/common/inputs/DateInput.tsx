import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dateee from "../../../assets/icons/Icons (1).svg";
import DateIcon from "../../../assets/icons/lets-icons_date-today.svg";
import ErrorInput from "./ErrorInput";
export default function DateInput({
  required,
  label,
  value,
  onChange,
  error,
  disabled,
}: {
  required?: boolean;
  label?: string;
  value: any;
  onChange?: any;
  error?: string;
  disabled?:boolean;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );

  useEffect(() => {
    setSelectedDate(value ? new Date(value) : null);
  }, [value]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date && onChange) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      onChange(`${year}-${month}-${day}`);
    }
  };

  return (
    <div className={`w-full gap-2 flex flex-col rounded-[16px] relative ${disabled ? " pointer-events-none opacity-80" : ""}`}>
      <h1 className="xl:text-[20px] lg:text-[16px] flex font-[500] my-1 text-[#071200] text-left ms-1">
        {label || "تاريخ الميلاد"} :{" "}
        <span className="text-[#E33629] ms-2">{required ? "*" : ""}</span>
      </h1>

      <div className="w-full flex flex-row items-center" >
        <div
          style={{
            borderRadius: '0 16px 16px 0'
          }}
          className={`bg-[var(--primary)] shadow-md ${error
            ? "border-[1.3px] border-[#E33629] border-l-0"
            : "border border-[#ccc]"
            } flex items-center justify-center w-[60px] h-[50px] rounded-l-[12px]`}
        >
          <img src={Dateee} alt="Phone Icon" className="w-[32px] h-[32px]" />
        </div>

        <div style={{
          direction: 'rtl'
        }} className="w-full">
          <DatePicker
            toggleCalendarOnIconClick
            selected={selectedDate}
            
            onChange={handleDateChange}
            placeholderText="ادخل تاريخ الميلاد..."
            className={`w-full shadow-md h-[50px] text-black !pl-4  focus:outline-none ${error
              ? "border-[1.3px] border-[#E33629] border-r-0"
              : "border border-[#ccc]"
              } rounded-l-[12px] `}
            dateFormat="yyyy-MM-dd"
            icon={<img src={DateIcon} />}
            showIcon
            calendarIconClassName={"absolute left-[6px] top-[7px] w-[19px] h-[19px]"}
            wrapperClassName="w-full"
            shouldCloseOnSelect={true}
          />
        </div>
      </div>
      <div className="absolute -bottom-2 right-1/2 ">
      <ErrorInput error={error ? error : ""} />

      </div>

    </div>
  );
}