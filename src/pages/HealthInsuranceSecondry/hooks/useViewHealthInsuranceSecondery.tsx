import { collection, getDocs, query, where } from "firebase/firestore";
import html2canvas from "html2canvas-pro";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../firebase";
import { useParams } from "react-router";
import jsPDF from "jspdf";

const useViewHealthInsuranceSecondery = () => {
  const [loading, setLoading] = useState(false);
  const certificateRef = useRef(null);
  // const textRef = useRef(null);
  const { idNumber } = useParams();

  const genderOptions = [
    { id: 1, name: "ذكر" },
    { id: 2, name: "أنثي" },
  ];
  useEffect(() => {
    if (idNumber) getPerson(idNumber);
  }, [idNumber]);

  const [formData, setFormData] = useState<any>({
    idNumber: 0,
    name: "",
    photoUrl: "",
    nationality: "",
    programExpiry: "",
    job: "",
    programType: "",
    certificateNumber: 0,
    amana: "",
    municipality: "",
    gender: undefined,
    issueCerDateHijri: "",
    issueCerDate: "",
    expiryCerDateHijri: "",
    expiryCerDate: "",
    FirmLicenseNum: 0,
    FirmNum: 0,
    firmName: "",
  });

  const getPerson = async (idNumber: string) => {
    console.log("idNumber -> ", idNumber);

    setLoading(true);
    try {
      const collRef = collection(db, "healthCertificates");
      const q = query(collRef, where("idNumber", "==", idNumber));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data() as any;
        console.log("docData:", docData);

        setFormData({
          ...docData,
          gender: docData.gender === "ذكر" ? 1 : 2,
        });
      } else {
        console.warn("⚠️ No person found with ID:", idNumber);
      }
    } catch (error) {
      console.error("❌ Error fetching person:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPDF = async () => {
    const element1 = document.getElementById("HealthCareCard");
    const element2 = document.getElementById("footerImage");
    if (!element1 || !element2) return;
    const shrink = 0.4;
    const scale = 2;
    const captureElement = async (el: HTMLElement) => {
      const canvas = await html2canvas(el, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pxWidth = canvas.width;
      const pxHeight = canvas.height;
      const mmWidth = (pxWidth * 25.4) / 96;
      const mmHeight = (pxHeight * 25.4) / 96;
      console.log("imgData:", imgData);

      return {
        imgData,
        width: mmWidth * shrink,
        height: mmHeight * shrink,
      };
    };

    const first = await captureElement(element1);
    const second = await captureElement(element2);
    const pdf = new jsPDF({
      orientation: first.width > first.height ? "l" : "p",
      unit: "mm",
      format: [first.width, first.height],
    });

    pdf.addImage(first.imgData, "PNG", 0, 0, first.width, first.height);
    pdf.addPage([second.width, second.height]);
    pdf.addImage(second.imgData, "PNG", 0, 0, second.width, second.height);
    pdf.save(`${formData.name || "document"}.pdf`);
  };

  return {
    formData,
    setFormData,
    loading,
    certificateRef,
    getPerson,
    handleOpenPDF,
    genderOptions,
  };
};

export default useViewHealthInsuranceSecondery;
