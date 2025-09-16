import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { db } from "../../../../firebase";
import { exportPdf } from "../../../../lib/exportPdf";
// import { hijriConverter } from "../../../../lib/DateConverter";
import type { PersonType } from "../../../../types/types";

const useViewPerson = () => {
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false); // إضافة state لتتبع حالة تحميل البيانات
    const certificateRef = useRef(null);
    const textRef = useRef(null);
    const { idNumber } = useParams();

    const genderOptions = [
        { id: 1, name: "ذكر" },
        { id: 2, name: "أنثي" }
    ];

    const [formData, setFormData] = useState<PersonType>({
        idNumber: undefined,
        name: "",
        photoUrl: "",
        nationality: "",
        gender: undefined,
        expiryDate: "",
        job: "",
        issuePlace: "",
        certificateNumber: "",
        programType: "",
        programExpiry: "",
        issueDate: "",
        firmName: "",
        FirmLicenseNum: ""
    });

    const getPerson = useCallback(async (idNumber: string) => {
        console.log("idNumber -> ", idNumber);
        
        setLoading(true);
        setDataLoaded(false); // reset data loaded state
        
        try {
            const collRef = collection(db, "persons");
            const q = query(collRef, where("idNumber", "==", idNumber));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docData = querySnapshot.docs[0].data() as any;
                console.log(docData);

                // تحويل التواريخ الهجرية إلى ميلادية للعرض
                // const expiryDate = docData.expiryDate ? hijriConverter(docData.expiryDate) : "";
                // const programExpiry = docData.programExpiry ? hijriConverter(docData.programExpiry) : "";
                // const issueDate = docData.issueDate ? hijriConverter(docData.issueDate) : "";

                const updatedFormData = {
                    ...docData,
                    gender: docData.gender == "ذكر" ? 1 : 2,
                    // expiryDate: expiryDate,
                    // programExpiry: programExpiry,
                    // issueDate: issueDate
                };

                setFormData(updatedFormData);
                setDataLoaded(true); // البيانات اتحملت بنجاح
                
                console.log("✅ Data loaded successfully:", updatedFormData);
            } else {
                console.warn("⚠️ No person found with ID:", idNumber);
                setDataLoaded(false);
            }
        } catch (error) {
            console.error("❌ Error fetching person:", error);
            setDataLoaded(false);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (idNumber) {
            console.log('Loading person data for ID:', idNumber);
            getPerson(idNumber);
        }
    }, [idNumber, getPerson]);

    // الحل الأول: handleOpenPDF محسن مع التحقق من البيانات
    const handleOpenPDF = useCallback(async () => {
        console.log("🔄 Attempting to generate PDF...");
        console.log("Current formData:", formData);
        console.log("Data loaded:", dataLoaded);
        console.log("Loading:", loading);

        // التحقق من وجود البيانات
        if (!dataLoaded || loading) {
            console.warn("⚠️ Data not ready yet, waiting...");
            
            // انتظار قصير للتأكد من اكتمال التحديث
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (!formData.name) {
                console.error("❌ No data available for PDF generation");
                alert("البيانات لم تُحمل بعد، يرجى المحاولة مرة أخرى");
                return;
            }
        }

        try {
            const filename = formData?.name ? `${formData.name}.pdf` : `certificate_${idNumber || 'unknown'}.pdf`;
            console.log("📄 Generating PDF with filename:", filename);
            
            exportPdf("certificate", "certificateText", filename);
        } catch (error) {
            console.error("❌ Error generating PDF:", error);
        }
    }, [formData, dataLoaded, loading, idNumber]);

    // الحل الثاني: دالة PDF منفصلة مع التحقق المتقدم
    const handleOpenPDFSafe = useCallback(async () => {
        console.log("🔒 Safe PDF generation attempt...");
        
        // إعادة تحميل البيانات إذا لم تكن موجودة
        if (!formData.name && idNumber) {
            console.log("🔄 Re-fetching data before PDF generation...");
            await getPerson(idNumber);
            
            // انتظار إضافي للتأكد
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // التحقق النهائي
        if (!formData.name) {
            console.error("❌ Still no data available after refresh");
            alert("فشل في تحميل البيانات، يرجى إعادة تحميل الصفحة");
            return;
        }

        const filename = `${formData.name}.pdf`;
        console.log("📄 Generating PDF with filename:", filename);
        
        try {
            exportPdf("certificate", "certificateText", filename);
        } catch (error) {
            console.error("❌ Error in PDF generation:", error);
        }
    }, [formData, idNumber, getPerson]);

    // دالة للتحقق من جاهزية البيانات
    const isDataReady = useCallback(() => {
        return dataLoaded && !loading && formData.name && formData.name.trim() !== "";
    }, [dataLoaded, loading, formData.name]);

    return { 
        genderOptions, 
        textRef, 
        formData, 
        setFormData, 
        loading, 
        dataLoaded,
        certificateRef, 
        getPerson, 
        handleOpenPDF, 
        handleOpenPDFSafe,
        isDataReady
    };
};

export default useViewPerson;