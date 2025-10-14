import { useEffect, useState } from 'react'
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { db } from '../../../firebase';
import { isPhotoFile } from '../../../lib/helpers';
import type { EditedPersonType } from '../../../types/types';
import { addHealthInsuranceSchema } from '../validate/addSchema';
import useInsurances from '../../../hooks/useInsurances';

const useEditHealthInsurance = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [docId, setDocId] = useState<any>(null);
  const { idNumber } = useParams();

  const { insurances } = useInsurances();

  const genderOptions = [
    { id: 1, name: "ذكر" },
    { id: 2, name: "أنثي" }
  ]
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
    insurance: []
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (idNumber) getPerson(idNumber);
  }, [idNumber]);

  const handleFieldChange = (field: keyof any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const getPerson = async (idNumber: string) => {
    setLoading(true);
    try {
      const collRef = collection(db, "healthCertificates");
      const q = query(collRef, where("idNumber", "==", idNumber));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const docData = docSnap.data() as any;
        const docId = docSnap.id;
        setDocId(docId);
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
  console.log("dataa", formData);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addHealthInsuranceSchema.validate(formData, { abortEarly: false });

      const stringGender = formData.gender == 1 ? "ذكر" : "أنثي";

      // تحويل كل التواريخ لهجري قبل التخزين
      const payload: EditedPersonType = {
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
      setSubmitting(false);
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
          const base64String = reader.result as string;
          latestPayload.photoUrl = base64String;
          const collRef = collection(db, "healthCertificates");
          if (docId) {
            const docRef = doc(collRef, docId);
            await updateDoc(docRef, latestPayload);
          } else {
            await addDoc(collRef, latestPayload);
          }
          setTimeout(() => navigate(-1), 300);
          setTimeout(() => toast.success("تم تعديل الشخص بنجاح"), 1000);
        };
        reader.onerror = (error) => {
          console.error("❌ Error converting image:", error);
        };
      } else if (typeof formData.photoUrl === "string") {
        const collRef = collection(db, "healthCertificates");
        if (docId) {
          const docRef = doc(collRef, docId);
          await updateDoc(docRef, latestPayload);
        } else {
          await addDoc(collRef, latestPayload);
        }
        setTimeout(() => navigate(-1), 300);
        setTimeout(() => toast.success("تم تعديل الشخص بنجاح"), 1000);
      } else {
        toast.error("اختر صورة صالحة");
      }
    } catch (error) {
      console.error("❌ Error adding person:", error);
      toast.error("حدث خطأ ما !");
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
    loading,
    genderOptions,
    insurances
  };
};

export default useEditHealthInsurance;
