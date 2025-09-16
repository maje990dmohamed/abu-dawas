import { collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router';
import { db } from '../../../firebase';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

const useViewHealthInsurance = () => {
    const [loading, setLoading] = useState(false);
    const certificateRef = useRef(null);
    // const textRef = useRef(null);
    const { idNumber } = useParams();


    const genderOptions = [
        { id: 1, name: "ذكر" },
        { id: 2, name: "أنثي" }
    ]
    useEffect(() => {
        console.log(idNumber, '555');



        if (idNumber)
            getPerson(idNumber)
    }, [idNumber])

    // const genderOptions = [
    //     {id: 1, name : "ذكر"},
    //     {id: 2, name : "أنثي"}
    // ]

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
        firmName: ""
    })

    const getPerson = async (idNumber: string) => {
        console.log("idNumber -> ", idNumber);

        setLoading(true)
        try {
            const collRef = collection(db, "healthCertificates");
            const q = query(collRef, where("idNumber", "==", idNumber));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docData = querySnapshot.docs[0].data() as any;


                console.log(docData, '555555555555555555555');


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
            setLoading(false)
        }
    };

    const handleOpenPDF = async () => {
        const element: any = document.getElementById("HealthCareCard");
        const canvas = await html2canvas(element,
            {
                scale: 2, // تحسين الجودة
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            }
        );
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save(`${formData.name}.pdf`);
    };


    return { formData, setFormData, loading, certificateRef, getPerson, handleOpenPDF, genderOptions };

}

export default useViewHealthInsurance