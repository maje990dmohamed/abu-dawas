import { MenuItem, Select, Checkbox, ListItemText, Box } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ErrorInput from "../errorTooltip/ErrorInput";
import { IoMdClose } from "react-icons/io";
import CustomizedHook from "./SearchablemultiSelectMenu";

export interface OptionType {
  id: string | number;
  name: string;
  image?: string;
}

interface MultiSelectMenuProps {
  label: string;
  name: string;
  value: OptionType[];
  options: OptionType[];
  onChange: (selected: OptionType[]) => void;
  placeholder?: string;
  error?: string;
  icon?: string;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
  isSearch?: boolean;
  value2?: any[];
  handleParentsChange?: (value: any) => void;
  max_width?: string;
  handleEmailFieldChangeParent?: any;
  setErrorsParent?: any;
  setErrors?: any;
  formData?: any;
}

const MultiSelectMenu: React.FC<MultiSelectMenuProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  placeholder,
  icon,
  error,
  isRequired = false,
  disabled,
  isSearch,
  value2,
  handleParentsChange,
  // max_width,
  handleEmailFieldChangeParent,
  setErrors,
  formData,
}) => {
  const isRTL = true;

  const selectedIds = value?.map((v) => v.id);

  const handleChange: any = (
    event: React.ChangeEvent<{ value: (string | number)[] }>
  ) => {
    const ids = event.target.value as (string | number)[];
    const selected = options.filter((opt) => ids.includes(opt.id));
    onChange(selected);
  };

  const handleRemove = (idToRemove: string | number) => {
    onChange(value.filter((v) => v.id !== idToRemove));
  };

  const [open, setOpen] = useState(false);

  const availableOptions = options.filter(
    (opt) => !selectedIds?.includes(opt.id)
  );

  return (
    <>
      {isSearch ? (
        <CustomizedHook
          listOfParents={value2 || []}
          icon={icon}
          label={label}
          isRequired={isRequired}
          handleParentsChange={handleParentsChange}
          error={error}
          placeholder={"اختر من الأمانات..."}
          handleEmailFieldChangeParent={handleEmailFieldChangeParent}
          setErrors={setErrors}
          formData={formData}
          value={value}
        />
      ) : (
        <div className={`w-full gap-2  flex flex-col rounded-[16px] relative`}>
          <label
            className={`lg:text-[16px] font-[500] my-1 text-[#071200] dark:text-primary ${
              isRTL ? "text-right me-1" : "text-left ms-1"
            }`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {label} :
            {isRequired && (
              <span className={`text-[#E33629] ${isRTL ? "me-2" : "ms-2"}`}>
                *
              </span>
            )}
          </label>

          <div
            className={`flex items-center overflow-hidden !rounded-[16px] w-full ${
              isRTL ? "flex-row" : "flex-row"
            }`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div
              className={`w-[59px] shadow-md h-[48px] bg-[#9C00C9] flex items-center justify-center p-4
            rounded-s-[16px] border-s-0
            ${error ? "border border-[#E33629]" : ""}
          `}
            >
              <img src={icon} alt="" className="w-6 h-6" />
            </div>

            <div className="relative  w-full bg-black dark:!bg-table-body ">
              <Select
                multiple
                name={name}
                disabled={disabled}
                id={name}
                value={selectedIds}
                onChange={handleChange}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                displayEmpty
                renderValue={(selected) => {
                  if ((selected as any[])?.length === 0) {
                    return <span className="text-gray-500">{placeholder}</span>;
                  }

                  const selectedItems = options.filter((opt) =>
                    (selected as (string | number)[]).includes(opt.id)
                  );

                  return (
                    <div className="flex gap-2 overflow-x-auto scrollbar-thin  w-full max-w-[97%]   scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                      {selectedItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center bg-gray-200  rounded-full px-3 py-1 text-sm"
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          {item.name}
                          <IoMdClose
                            className="ml-2 text-red-500 cursor-pointer"
                            onClick={() => handleRemove(item.id)} // هنا مش محتاج stopPropagation تاني
                          />
                        </div>
                      ))}
                    </div>
                  );
                }}
                className="w-full !h-[48px] !rounded-e-[16px] !bg-[#F1F1F1] dark:!bg-table-head"
                sx={{
                  height: "49px",
                  borderRadius: isRTL ? "16px 0 0 16px" : "0 16px 16px 0",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                    borderColor: error ? "red" : "#ccc",
                    borderLeft: isRTL
                      ? `1px solid ${error ? "red" : "#ccc"}`
                      : "0",
                    borderRight: isRTL
                      ? "0"
                      : `1px solid ${error ? "red" : "#ccc"}`,
                  },

                  "& .MuiSvgIcon-root": {
                    display: "none",
                  },
                }}
                MenuProps={{
                  MenuListProps: {
                    sx: {
                      paddingY: "0px",
                    },
                  },
                }}
              >
                {availableOptions?.length > 0 ? (
                  availableOptions?.map((option) => (
                    <MenuItem
                      sx={{
                        // MuiList-padding MuiMenu-list
                        "& .MuiList-root": {
                          backgroundColor: "#000",
                        },
                        "& .MuiList-padding": {
                          backgroundColor: "#000",
                        },
                        "& .MuiMenu-list": {
                          backgroundColor: "#000",
                        },
                        direction: isRTL ? "rtl" : "ltr",
                      }}
                      key={option.id}
                      value={option.id}
                      className=" dark:!text-white dark:!bg-table-body dark:hover:!bg-table-head"
                    >
                      <Checkbox
                        checked={false}
                        className=" dark:!text-white  "
                      />
                      <ListItemText
                        sx={{ textAlign: isRTL ? "right" : "left" }}
                        primary={option.name}
                      />
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem
                    disabled
                    sx={{
                      "&.Mui-disabled": {
                        backgroundColor: "#000 !important",
                        color: "#fff !important",
                        opacity: 1,
                      },
                    }}
                    className={`${isRTL ? "text-right" : ""} !bg-table-head`}
                  >
                    <ListItemText
                      className=" text-black dark:text-white"
                      primary={"لا يوجد خيارات"}
                    />
                  </MenuItem>
                )}
              </Select>
              {}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  [isRTL ? "left" : "right"]: "16px",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Box>
            </div>
          </div>
          <div className="flex absolute top-[105%] overflow-x-auto max-w-full gap-1"></div>
          <ErrorInput error={error} />
        </div>
      )}
    </>
  );
};

export default MultiSelectMenu;
