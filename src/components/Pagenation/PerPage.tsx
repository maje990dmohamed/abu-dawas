import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const PerPage: React.FC = () => {
  const [SearchParam, setSearchParams] = useSearchParams();
  const initialPerPage = parseInt(SearchParam.get("per_page") || "10", 10);
  const [selectedProductsNum, setSelectedProductsNum] =
    useState(initialPerPage);

  // const { t, i18n } = useTranslation();
  const PageProductsNums = [10, 20, 30, 40, 50];
  const theme = useTheme();
  // const isRTL = ["ar", "he", "fa", "ur"].includes(i18n.language);

  useEffect(() => {
    const currentPerPage = SearchParam.get("per_page");
    if (!currentPerPage || currentPerPage !== selectedProductsNum.toString()) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams.toString());
        newParams.set("per_page", selectedProductsNum.toString());
        return newParams;
      });
    }
  }, [selectedProductsNum, setSearchParams]);

  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "40px",
        gap: "12px",
        direction: "rtl",
        paddingX: "4px",
        border: "1px solid #C0C0C0",
        borderRadius: "10px",
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 400,
          color: theme.palette.mode === "dark" ? "text.primary" : "#000",
        }}
      >
        {"العرض لكل صفحة"}
      </Typography>
      <Select
        value={selectedProductsNum}
        onChange={(e) => setSelectedProductsNum(e.target.value)}
        sx={{
          width: 56,
          height: 32,
          bgcolor: "#FFFFFF",
          border: "1px solid #C0C0C0",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: 500,
          color: "#000",
          "& .MuiSelect-select": {
            padding: "8px",
            display: "flex",
            alignItems: "center",
          },
          "& fieldset": {
            display: "none",
          },
          "& svg": {
            color: "#000",
          },
          "&:hover": {
            borderColor: "#C0C0C0",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "10px",
            },
          },
        }}
      >
        {PageProductsNums.map((num) => (
          <MenuItem key={num} value={num}>
            {num}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PerPage;
