import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { db } from "../../../../firebase";
// import { hijriConverter } from "../../../../lib/DateConverter";
import { isPhotoFile } from "../../../../lib/helpers";
import type { EditedPersonType, PersonType } from "../../../../types/types";
import { addPersonSchema } from "../validate/addSchema";


const useEditPerson = () => {
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [docId, setDocId] = useState<any>(null);
    const { idNumber } = useParams();

    useEffect(() => {
        if (idNumber)
            getPerson(idNumber)
    }, [idNumber])

    const genderOptions = [
        { id: 1, name: "ذكر" },
        { id: 2, name: "أنثي" }
    ];

    const [formData, setFormData] = useState<PersonType>({
        idNumber: 0,
        name: "",
        photoUrl: "",
        nationality: "",
        gender: 0,
        expiryDate: "",
        job: "",
        issuePlace: "",
        certificateNumber: "",
        programType: "",
        programExpiry: "",
        issueDate: "",
        firmName: "",
        FirmLicenseNum: ""
    })
    const [errors, setErrors] = useState({
        idNumber: "",
        name: "",
        photoUrl: "",
        nationality: "",
        gender: "",
        expiryDate: "",
        job: "",
        issuePlace: "",
        certificateNumber: "",
        programType: "",
        programExpiry: "",
        issueDate: "",
        firmName: "",
        FirmLicenseNum: ""
    })

    const getPerson = async (idNumber: string) => {

        setLoading(true)
        try {
            const collRef = collection(db, "persons");
            const q = query(collRef, where("idNumber", "==", idNumber));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];
                const docData = docSnap.data() as any;
                const docId = docSnap.id;
                setDocId(docId);

                // تحويل التواريخ الهجرية
                // const expiryDate = hijriConverter(docData.expiryDate);
                // const programExpiry = docData.programExpiry ? hijriConverter(docData.programExpiry) : "";
                // const issueDate = docData.issueDate ? hijriConverter(docData.issueDate) : "";

                setFormData({ 
                    ...docData, 
                    gender: docData.gender == "ذكر" ? 1 : 2, 
                    // expiryDate: expiryDate,
                    // programExpiry: programExpiry,
                    // issueDate: issueDate
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

    const handleFieldChange = (field: keyof any, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
        setErrors((prev: any) => ({ ...prev, [field]: "" })); // مسح الخطأ
    };

    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await addPersonSchema.validate(formData, { abortEarly: false });
            const stringGender = formData.gender == 1 ? "ذكر" : "أنثي";

            const payload: EditedPersonType = { 
                ...formData, 
                gender: stringGender, 
            }

            await storeToFirebase(payload);

        } catch (err: any) {
            if (err.inner) {
                const newErrors: any = {};
                err.inner.forEach((error: any) => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors);
            }
            setSubmitting(false);
        } finally {
        }
    };


    const navigate = useNavigate();

    const storeToFirebase = async (payload: EditedPersonType) => {
        try {
            let latestPayload = { ...payload };

            if (isPhotoFile(formData.photoUrl)) {
                const reader = new FileReader();
                reader.readAsDataURL(formData.photoUrl.file);
                reader.onload = async () => {
                    const base64String = reader.result as string; // This is your "URL"
                    latestPayload.photoUrl = base64String;
                    // Save directly to Firestore
                    const collRef = collection(db, "persons");
                    if (docId) {
                        const docRef = doc(collRef, docId);
                        await updateDoc(docRef, latestPayload);
                    } else {
                        await addDoc(collRef, latestPayload);
                    }
                    setTimeout(() => {
                        navigate(-1)
                    }, 300);
                    setTimeout(() => {
                        toast.success("تم تعديل الشخص بنجاح");
                    }, 1000);
                };

                reader.onerror = (error) => {
                    console.error("❌ Error converting image:", error);
                };
            } else if (typeof formData.photoUrl === "string") {
                const collRef = collection(db, "persons");
                if (docId) {
                    const docRef = doc(collRef, docId);
                    await updateDoc(docRef, latestPayload);
                } else {
                    await addDoc(collRef, latestPayload);
                }
                setTimeout(() => {
                    navigate(-1)
                }, 300);
                setTimeout(() => {
                    toast.success("تم تعديل الشخص بنجاح");
                }, 1000);
            } else {
                toast.success("اختر صورة صالحة");
            }
        } catch (error) {
            console.error("❌ Error adding person:", error);
            toast.error('حدث خطأ ما !')
        }
    };


    return { genderOptions, formData, setFormData, loading, getPerson, handleFieldChange, handleSubmit, errors, submitting };
}

export default useEditPerson