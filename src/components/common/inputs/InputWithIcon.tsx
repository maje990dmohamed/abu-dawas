import { useState } from "react";
import eye from "../../../assets/icons/eye-off.svg";
import eyeoff from "../../../assets/icons/view-icon.svg";
import editIcon from "../../../assets/icons/edit.svg";
import ErrorInput from "./ErrorInput";

interface InputWithIconProps {
  label?: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  icon: string | React.ReactNode;
  placeholder?: string;
  className?: string;
  name?: string;
  error?: string;
  type?: string;
  setLocation?: (address: string) => void;
  disabled?: boolean;
  isLocation?: boolean;
  canToggleDisable?: boolean;
}

const InputWithIcon = ({
  
  label,
  isLocation,
  value,
  onChange,
  isRequired = false,
  icon,
  placeholder,
  className = "",
  name,
  error = "",
  type = "text",
  setLocation,
  disabled = false,
  canToggleDisable = false,
}: InputWithIconProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;
  const [isInputDisabled, setIsInputDisabled] = useState(disabled !== false);
  
  return (
    <>
      <div
        className={` 
          ${disabled ? "bg-transparent  " : "bg-transparent"}
         w-full gap-2 flex flex-col rounded-[16px] relative`}
      >
        {label  != "" && < h1 className="xl:text-[20px] lg:text-[16px] flex font-[500] my-1 text-[#071200] text-left ms-1">
          {label || "تاريخ الميلاد"} :{" "}
          <span className="text-[#E33629] ms-2">{isRequired ? "*" : ""}</span>
        </h1>}

        <div
          className={`flex items-center w-full "flex-row-reverse"`}
          style={{
            direction: "rtl",
          }}
        >
          {icon && <div
            className={`w-[59px] shadow-md h-[50px] bg-[var(--primary)] flex items-center justify-center p-4
            rounded-s-[16px] border-e-0
            ${error ? "border border-[#E33629]" : ""}
            `}
          >
            {
              typeof icon == "string" 
              ? <img src={icon} alt="" className="w-6 h-6" /> 
              : <span className="text-white">{icon}</span>
            }
          </div>}

          <div className="w-full h-full relative">
            <input 
              autoComplete="new-password"
              disabled={isInputDisabled}
              name={name}
              id={name}
              type={inputType}
              value={value}
              onChange={(e) => {
                if (isLocation && setLocation) {
                  setLocation(e.target.value);
                } else if (onChange) {
                  onChange(e);
                }
              }}
              dir={"rtl"}
              className={`border-1 w-full shadow-sm h-[50px] outline-none placeholder-[#A2A2A2]
              ${className}
              rounded-s-[0px] rounded-e-[16px] border-s-0 pr-4 pl-12 text-right 
              ${error ? "border-[#E33629]" : "border-[#C0C0C0]"}


              
              `}
              placeholder={placeholder || "اكتب هنا..."}
            />

            {isPasswordField && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={`cursor-pointer absolute top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors z-10 left-3`}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <img
                  src={showPassword ? eyeoff : eye}
                  alt={showPassword ? "Hide password" : "Show password"}
                  className="w-6 h-6"
                />
              </button>
            )}
            {canToggleDisable && (
              <button
                type="button"
                onClick={() => setIsInputDisabled((prev: any) => !prev)}
                className={`absolute top-1/2 transform -translate-y-1/2  w-8 h-8 rounded-[12px] flex items-center justify-center cursor-pointer left-5`}
                title={isInputDisabled ? "Enable" : "Disable"}
              >
                <img
                  src={editIcon}
                  className="text-gray-600 hover:text-black"
                />
              </button>
            )}
            
          </div>
        </div>
        
        <ErrorInput error={error ? error : ""} />
      </div>
    </>
  );
};
export default InputWithIcon;
