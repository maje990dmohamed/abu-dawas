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
  const widthRatioFirst = (contentWidth / imgPropsFirstPage.width);
  const heightRatioFirst = ((pageHeight - 2 * margin) / imgPropsFirstPage.height);
  const ratioFirst = Math.min(widthRatioFirst, heightRatioFirst);

  const scaledWidthFirstPage = imgPropsFirstPage.width * ratioFirst;
  const scaledHeightFirstPage = imgPropsFirstPage.height * ratioFirst;

  const xFirstPage = (pageWidth - scaledWidthFirstPage) / 2;
  const yFirstPage = -20;

  pdf.addImage(
    imgDataFirstPage,
    "PNG",
    xFirstPage,
    yFirstPage,
    scaledWidthFirstPage,
    scaledHeightFirstPage
  );

  // ✅ الصفحة الثانية - بحجم صفحة أقل في العرض والارتفاع
  // const imgPropsSecondPage = pdf.getImageProperties(imgDataSecondPage);

  // تقليل عرض الصفحة (80% من العرض الأصلي)
  const secondPageWidth = pageWidth; // same as first page (A4 width = 595.28pt)
  const secondPageHeight = pageHeight; // 396pt

  // add second page with custom size
  pdf.addPage([secondPageWidth, secondPageHeight]);

  // image scaling for second page
  const imgPropsSecondPage2 = pdf.getImageProperties(imgDataSecondPage);

  const widthRatioSecond =
    (secondPageWidth - 2 * margin) / imgPropsSecondPage2.width;
  const heightRatioSecond =
    (secondPageHeight - 2 * margin) / imgPropsSecondPage2.height;
  const ratioSecond = Math.min(widthRatioSecond, heightRatioSecond);

  const scaledWidthSecondPage = imgPropsSecondPage2.width * ratioSecond;
  const scaledHeightSecondPage = imgPropsSecondPage2.height * ratioSecond;

  // ✅ push text slightly inside from left so it's not clipped
  const xSecondPage = margin; // keep margin instead of negative padding
  const ySecondPage = -30;

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