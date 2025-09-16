import * as yup from "yup";

export const addPersonSchema = yup.object().shape({
  idNumber: yup
    .string()
    .required("رقم الهوية مطلوب"),
  name: yup.string().required("الاسم مطلوب"),
  programType: yup.string().required("الاسم مطلوب"),
  photoUrl: yup
    .mixed()
    .test("fileRequired", "الصورة مطلوبة", (value) => {
      return value !== null && value !== undefined && value !== "";
    }),

  nationality: yup.string().required("الجنسية مطلوبة"),
  gender: yup.string().required("النوع مطلوب"),
  expiryDate:yup.string().required("تاريخ نهاية الصلاحية مطلوب"),

  issueDate: yup.string().required("تاريخ الاصدار مطلوب"),
  programExpiry: yup.string().optional(),

  job: yup.string().required("الوظيفة مطلوبة"),
  issuePlace: yup.string().required("مكان الإصدار مطلوب"),
  certificateNumber: yup.string().required("رقم الشهادة مطلوب"),
  firmName: yup.string().optional(),
  FirmLicenseNum: yup.string().required("رقم رخصة المنشأة مطلوب"),
});
