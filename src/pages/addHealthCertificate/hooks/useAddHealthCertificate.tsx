import { useState } from "react";

const useAddHealthCertificate = () => {

    const [formData, setFormData] = useState<any>({
        name: "",
        parent_id: null,
        status: null,
        gender: null,
        date_birth: "",
        age_stage: null,
        address: "",
        bulding_number: "",
        floor: "",
        subscription: null,
        image: null,
        record: null,
        governorate_id: null,
    });

  // Error state
  const [errors, setErrors] = useState<any>({
    name: "",
    parent_id: "",
    status: "",
    gender: "",
    date_birth: "",
    age_stage: "",
    address: "",
    bulding_number: "",
    floor: "",
    subscription: "",
    image: "",
    record: "",
  });

  const handleFieldChange = (field: keyof any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: "" })); 
  };
  return {errors, formData, handleFieldChange}
}

export default useAddHealthCertificate