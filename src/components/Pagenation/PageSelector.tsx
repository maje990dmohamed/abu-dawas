import React from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { useSearchParams } from "react-router-dom";

interface PageSelectorProps {
  totalPages?: number; // هنبعتله من بره عدد الصفحات فقط
}

const PageSelectorContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

const PageButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active }) => ({
  minWidth: "32px",
  height: "32px",
  borderRadius: "10px",
  fontSize: "14px",
  backgroundColor: active ? "#9C00C9" : "#FFF", 
  color: active ? "#FFF" : "#000",
  fontWeight: active ? 700 : 700,
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  textTransform: "none",
  border: "1px solid #E0E0E0",
  "&:hover": {
    backgroundColor: active ? "#B833DA" : "#F2F2F2", 
  },
}));

const Ellipsis = styled(Typography)({
  minWidth: "50px",
  height: "50px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#000",
  fontSize: "16px",
  fontWeight: "700",
});

const NavButton = styled(Button)(({ disabled }) => ({
  minWidth: "60px",
  height: "50px",
  borderRadius: "10px",
  backgroundColor: "#FFF",
  color: disabled ? "#BDBDBD" : "#000",
  fontWeight: 700,
  textTransform: "none",
  cursor: disabled ? "not-allowed" : "pointer",
  "&:hover": {
    backgroundColor: disabled ? "#FFF" : "#F2F2F2",
  },
}));

const PageSelector: React.FC<PageSelectorProps> = ({ totalPages = 10 }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams.toString());
      newParams.set("page", page.toString());
      return newParams;
    });
  };
  
  const generatePagination = (current: number, total: number): number[] => {
    if (total <= 1) return [1];
    const delta = 2;
    const range: number[] = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);

    if (left > 2) range.push(-1);

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) range.push(-2);

    range.push(total);

    return range;
  };
  console.log("fjn-213", generatePagination(currentPage, totalPages));

  return (
    <PageSelectorContainer>
      <NavButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"السابق"}
      </NavButton>

      {generatePagination(currentPage, totalPages).map((page, index) =>
        page < 0 ? (
          <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>
        ) : (
          <PageButton
            key={index}
            active={currentPage === page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PageButton>
        )
      )}

      <NavButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {"التالي"}
      </NavButton>
    </PageSelectorContainer>
  );
};

export default PageSelector;
