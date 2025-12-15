import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { isPhotoFile } from "../../../lib/helpers";
import type {
  EditedPersonType,
  healthInsuranceType,
} from "../../../types/types";
import { toast } from "react-toastify";
import useInsurances from "../../../hooks/useInsurances";
import { useState } from "react";
import { addHealthInsuranceSchema } from "../../healthInsurance/validate/addSchema";
import { useNavigate } from "react-router";
import { db } from "../../../firebase";

const useAddHealthInsuranceSecondery = () => {
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<healthInsuranceType>({
    idNumber: "",
    name: "",
    photoUrl: "",
    nationality: "",
    programExpiry: "",
    job: "",
    programType: "",
    certificateNumber: "",
    amana: "",
    municipality: "",
    gender: undefined,
    issueCerDateHijri: "",
    issueCerDate: "",
    expiryCerDateHijri: "",
    expiryCerDate: "",
    FirmLicenseNum: "",
    FirmNum: "",
    firmName: "",
    insurance: [],
  });

  const [errors, setErrors] = useState<any>({
    idNumber: "",
    name: "",
    photoUrl: "",
    nationality: "",
    programExpiry: "",
    job: "",
    programType: "",
    certificateNumber: "",
    amana: "",
    municipality: "",
    gender: "",
    issueCerDateHijri: "",
    issueCerDate: "",
    expiryCerDateHijri: "",
    expiryCerDate: "",
    FirmLicenseNum: "",
    FirmNum: "",
    firmName: "",
  });

  const { insurances } = useInsurances();

  const genderOptions = [
    { id: 1, name: "ذكر" },
    { id: 2, name: "أنثي" },
  ];

  const handleFieldChange = (field: keyof any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(formData);

    try {
      await addHealthInsuranceSchema.validate(formData, { abortEarly: false });

      const stringGender = formData.gender == 1 ? "ذكر" : "أنثي";

      const payload: any = {
        ...formData,
        gender: stringGender,
      };

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

  console.log("data", formData);

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
      const latestPayload = { ...payload };

      if (isPhotoFile(formData.photoUrl)) {
        const collRef = collection(db, "healthCertificatesSecondery");
        const q = query(collRef, where("idNumber", "==", payload.idNumber));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          toast.error("يوجد شخص بهذه الهوية بالفعل!");
          return;
        }

        latestPayload.photoUrl = await getBase64(formData.photoUrl.file);

        await addDoc(collRef, latestPayload);
        setTimeout(() => navigate(-1), 300);
        setTimeout(() => toast.success("تم تسجيل التأمين بنجاح"), 1000);
      } else {
        toast.error("يرجى إضافة صورة صحيحة");
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("حجم الصورة كبير للغاية");

      toast.error("حدث خطأ ما !");
      return error;
    }
  };

  return {
    formData,
    setFormData,
    submitting,
    handleSubmit,
    errors,
    setErrors,
    handleFieldChange,
    genderOptions,
    insurances,
  };
};

export default useAddHealthInsuranceSecondery;
