import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  styled,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import plusIcon from "../../../assets/icons/add.svg";
import React from "react";
import ErrorInput from "./ErrorInput";

interface SelectMenuProps {
  options: { id: string | number; name: string; image?: string }[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  isRequired?: boolean;
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
  name?: string;
  showOptionImage?: boolean;
  isAdd?: boolean;
  onAdd?: () => void;
}

const SelectMenu: React.FC<SelectMenuProps> = ({
  options,
  value,
  onChange,
  placeholder =  "اختر...",
  disabled = false,
  label,
  className,
  name,
  isRequired,
  error,
  icon,
  showOptionImage = false,
  isAdd = false,
  onAdd,
}) => {
  const StyledSelect = styled(Select)<{ error?: boolean }>(({ error }) => ({
    height: "50px",
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: "16px",
    border: "1px solid #C0C0C0",
    boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      height: "100%",
      padding: "0",
      paddingInlineStart: "60px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: error ? "#E33629" : "transparent",
      borderWidth: "1px",
      borderRadius: "16px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: error ? "#E33629" : "transparent",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: error ? "#E33629" : "transparent",
    },
  }));

  const StyledMenuItem = styled(MenuItem)(() => ({
    height: "48px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    borderRadius: "16px",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    "&.Mui-selected": {
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
    },
  }));

  
  const [open, setOpen] = React.useState(false);
  const position = isAdd ? "50px" : "16px";

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange?.(event.target.value as string | number);
  };

  const selectedOption = options.find(
    (option) => String(option.id) === String(value)
  );

  return (
    <>
      <FormControl
        fullWidth
        dir={'rtl'}
        sx={{ position: "relative", width: "100%", gap: "8px" }}
        className={className}
      >
        {label && (
          <label className="xl:text-[20px] lg:text-[16px] flex font-[500] my-1 text-[#071200] text-left ms-1">
            {label || "تاريخ الميلاد"} :{" "}
            <span className="text-[#E33629] ms-2">{isRequired ? "*" : ""}</span>
          </label>
        )}
        <Box sx={{ position: "relative", width: "100%" }}>
          <StyledSelect
            open={open}
            value={value?.toString() ?? ""}
            onChange={handleChange}
            displayEmpty
            name={name}
            disabled={disabled}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            IconComponent={() => null}
            error={Boolean(error)}
            fullWidth
            renderValue={() => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  height: "50px",
                  pl: "16px",
                  gap: 1.5,
                  // background: 'red',
                  paddingRight: '40px'
                }}
              >
                {showOptionImage && selectedOption?.image && (
                  <img
                    src={selectedOption.image}
                    alt="option"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <Typography className="!text-[#A2A2A2]">{selectedOption?.name ?? placeholder}</Typography>
              </Box>
            )}
          >
            {options.map((option) => (
              <StyledMenuItem key={option.id} value={option.id}>
                {showOptionImage && option.image && (
                  <img
                    src={option.image}
                    alt="option"
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                  />
                )}
                {option.name}
              </StyledMenuItem>
            ))}
          </StyledSelect>

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              ["left"]: position,
              pointerEvents: "none",
              zIndex: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Box>

          {isAdd && (
            <button
              type="button"
              onClick={onAdd}
              className= {`absolute top-1/2 left-2 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer`} 
            >
              <img src={plusIcon} className="rounded-[6px]" />
            </button>
          )}

          <Box
            sx={{
              position: "absolute",
              left: "auto",
              right: 0,
              top: 0,
              width: "60px",
              height: "100%",
              backgroundColor: "var(--primary)",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: "16px",
              borderBottomRightRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            {icon && (
              <Box
                sx={{
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {typeof icon === "string" ? (
                  <img
                    src={icon}
                    alt="icon"
                    style={{ width: "24px", height: "24px" }}
                  />
                ) : (
                  <span className=" text-white">{icon}</span>
                )}
              </Box>
            )}
          </Box>
        </Box>
        <ErrorInput error={error} />
      </FormControl>
    </>
  );
};

export default SelectMenu;
