/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dateee from "../../../assets/icons/Icons (1).svg";
import DateIcon from "../../../assets/icons/lets-icons_date-today.svg";
import ErrorInput from "../errorTooltip/ErrorInput";
export default function DateInput({
  required,
  label,
  value,
  onChange,
  error,
}: {
  required?: boolean;
  label?: string;
  value: any;
  onChange: any;
  error?: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      onChange(date.toISOString().split("T")[0]);
    }
  };

  return (
    <div className="w-full gap-2 flex flex-col rounded-[16px] relative">
      <h1 className="xl:text-[20px] lg:text-[16px] flex font-[500] my-1 text-[#071200] text-left ms-1">
        {label || "Date of Birth"} :{" "}
        <span className="text-[#E33629] ms-2">{required ? "*" : ""}</span>
      </h1>

      <div className="w-full flex flex-row items-center" >
        <div
          style={{
            borderRadius:'16px 0 0 16px'
          }}
          className={`bg-[var(--primary)] shadow-md ${error
            ? "border-[1.3px] border-[#E33629] border-r-0"
            : "border border-[#ccc]"
            } flex items-center justify-center w-[60px] h-[50px] rounded-l-[12px]`}
        >
          <img src={Dateee} alt="Phone Icon" className="w-[32px] h-[32px]" />
        </div>

        <div style={{
          direction: 'ltr'
        }} className="w-full">
          <DatePicker
            toggleCalendarOnIconClick
            selected={selectedDate}
            
            onChange={handleDateChange}
            placeholderText="Enter Date Of Birth"
            className={`w-full shadow-md h-[50px] text-black !pl-4  focus:outline-none ${error
              ? "border-[1.3px] border-[#E33629] border-l-0"
              : "border border-[#ccc]"
              } rounded-r-[12px] `}
            dateFormat="yyyy-MM-dd"
            icon={<img src={DateIcon} />}
            showIcon
            calendarIconClassName={"absolute right-[6px] top-[7px] w-[19px] h-[19px]"}
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
