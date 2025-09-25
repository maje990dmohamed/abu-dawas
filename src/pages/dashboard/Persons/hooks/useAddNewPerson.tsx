import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../../firebase";
import { isPhotoFile } from "../../../../lib/helpers";
import type { EditedPersonType, PersonType } from "../../../../types/types";
import { addPersonSchema } from "../validate/addSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useAddNewPerson = () => {
    const [submitting, setSubmitting] = useState(false);

    const genderOptions = [
        { id: 1, name: "ذكر" },
        { id: 2, name: "أنثي" }
    ]
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
        programType: "-",
        programExpiry: "-",
        issueDate: "-",
        firmName: "مجمع عيادات مستوصف الحياة فرع الرمال",
        FirmLicenseNum: "-"

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

    const handleFieldChange = (field: keyof any, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
        setErrors((prev: any) => ({ ...prev, [field]: "" })); // مسح الخطأ
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await addPersonSchema.validate(formData, { abortEarly: false });
            const stringGender = formData.gender == 1 ? "ذكر" : "أنثي"
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
        } finally {
            setSubmitting(false);
        }
    };

    const navigate = useNavigate();

    const getBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const storeToFirebase = async (payload: EditedPersonType) => {
        try {
            let latestPayload = { ...payload };

            if (isPhotoFile(formData.photoUrl)) {
                const collRef = collection(db, "persons");
                const q = query(collRef, where("idNumber", "==", payload.idNumber));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    toast.error("يوجد شخص بهذه الهوية بالفعل!");
                    return;
                }

                latestPayload.photoUrl = await getBase64(formData.photoUrl.file);

                await addDoc(collRef, latestPayload);
                setTimeout(() => {
                    navigate(-1)
                }, 300);
                setTimeout(() => {
                    toast.success("تم تسجيل الشخص بنجاح");
                }, 1000);

            } else {
                toast.error("يرجى إضافة صورة صحيحة");
            }
        } catch (error) {
            console.error("❌ Error adding person:", error);
            toast.error("حدث خطأ ما !");
        }
    };


    return { genderOptions, formData, setFormData, submitting, handleSubmit, errors, setErrors, handleFieldChange };
}

export default useAddNewPerson