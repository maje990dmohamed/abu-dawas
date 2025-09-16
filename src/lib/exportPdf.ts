import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export const exportPdf = async (
  firstPageElementId: string,
  secondPageElementId: string,
  fileName = "document.pdf"
) => {
  const inputFirstPage = document.getElementById(firstPageElementId);
  const inputSecondPage = document.getElementById(secondPageElementId);
  if (!inputFirstPage || !inputSecondPage) return;

  // ---- FIRST PAGE ----
  const canvasFirstPage = await html2canvas(inputFirstPage, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
  });
  const imgDataFirstPage = canvasFirstPage.toDataURL("image/png");

  // ---- SECOND PAGE ----
  const canvasSecondPage = await html2canvas(inputSecondPage, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
  });
  const imgDataSecondPage = canvasSecondPage.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "p",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20; // هامش صغير للتنسيق

  // ✅ الصفحة الأولى - بالطول الكامل أو أقل قليلاً
  const imgPropsFirstPage = pdf.getImageProperties(imgDataFirstPage);
  const contentWidth = pageWidth - 2 * margin;
  
  // حساب النسب للصفحة الأولى
  const widthRatioFirst = contentWidth / imgPropsFirstPage.width;
  const heightRatioFirst = (pageHeight - 2 * margin) / imgPropsFirstPage.height;
  const ratioFirst = Math.min(widthRatioFirst, heightRatioFirst);
  
  const scaledWidthFirstPage = imgPropsFirstPage.width * ratioFirst;
  const scaledHeightFirstPage = imgPropsFirstPage.height * ratioFirst;
  
  const xFirstPage = (pageWidth - scaledWidthFirstPage) / 2;
  const yFirstPage = margin;

  pdf.addImage(
    imgDataFirstPage,
    "PNG",
    xFirstPage,
    yFirstPage,
    scaledWidthFirstPage,
    scaledHeightFirstPage
  );

  // ✅ الصفحة الثانية - بحجم صفحة أقل في العرض والارتفاع
  const imgPropsSecondPage = pdf.getImageProperties(imgDataSecondPage);
  
  // تقليل عرض الصفحة (80% من العرض الأصلي)
  const customPageWidth = pageWidth * 1.1;
  const customContentWidth = customPageWidth - 2 * margin;
  
  // حساب الأبعاد للصورة الثانية
  const scaledWidthSecondPage = customContentWidth;
  const scaledHeightSecondPage = (imgPropsSecondPage.height * customContentWidth) / imgPropsSecondPage.width;
  
  // إضافة صفحة بحجم مخصص (عرض وارتفاع أقل)
  pdf.addPage([customPageWidth, scaledHeightSecondPage + 2 * margin]);
  
  const xSecondPage = margin;
  const ySecondPage = margin;

  pdf.addImage(
    imgDataSecondPage,
    "PNG",
    xSecondPage,
    ySecondPage,
    scaledWidthSecondPage,
    scaledHeightSecondPage
  );

  // ---- DOWNLOAD ----
  const pdfBlob = pdf.output("blob");
  if ((window as any).navigator?.msSaveOrOpenBlob) {
    (window as any).navigator.msSaveOrOpenBlob(pdfBlob, fileName);
  } else {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfBlob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }
};