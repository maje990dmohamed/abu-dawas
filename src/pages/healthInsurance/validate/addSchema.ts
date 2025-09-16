import * as yup from "yup";

export const addHealthInsuranceSchema = yup.object().shape({
  idNumber: yup.string()
    .required(("رقم الهوية مطلوب ")),

  name: yup
    .string()
    .required("الاسم مطلوب"),

  photoUrl: yup
    .mixed()
    .test("fileRequired", "الصورة مطلوبة", (value) => {
      return value !== null && value !== undefined && value !== "";
    }),

  nationality: yup
    .string()
    .required("الجنسية مطلوبة"),

  programExpiry: yup
    .string()
    .required("تاريخ انتهاء البرنامج مطلوب"),

  job: yup
    .string()
    .required("الوظيفة مطلوبة"),

  programType: yup
    .string()
    .required("نوع البرنامج مطلوب"),

  certificateNumber: yup.string()
    .required(("رقم الشهادة مطلوب")),



  amana: yup
    .string()
    .required("الأمانة مطلوبة"),

  municipality: yup
    .string()
    .required("البلدية مطلوبة"),

  gender: yup
    .string()
    .required("الجنس مطلوب"),

  issueCerDateHijri: yup
    .string()
    .required("تاريخ إصدار الشهادة (هجري) مطلوب"),

  issueCerDate: yup
    .string()
    .required("تاريخ إصدار الشهادة (ميلادي) مطلوب"),

  expiryCerDateHijri: yup
    .string()
    .required("تاريخ انتهاء الشهادة (هجري) مطلوب"),

  expiryCerDate: yup
    .string()
    .required("تاريخ انتهاء الشهادة (ميلادي) مطلوب"),

  FirmLicenseNum: yup.string()
    .required(("رقم الرخصة مطلوب ")),

  FirmNum: yup.string()
    .required(("رقم المنشأة مطلوب ")),

  firmName: yup
    .string()
    .required("اسم المنشأة مطلوب"),
});
