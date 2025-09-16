// import DateInput from "../../../../components/common/inputs/DateInput";
import ImageInput from "../../../../components/common/inputs/ImageInput";
import InputWithIcon from "../../../../components/common/inputs/InputWithIcon";
import SelectMenu from "../../../../components/common/inputs/SelectMenu";
import PageHeader from "../../../../components/common/PageHeader";
import ViewLayout from "../../../../components/common/ViewLayout";
import { GrCertificate } from "react-icons/gr";
import { MdDateRange, MdPlace } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { HiIdentification } from "react-icons/hi2";
import { FaFlag, } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { CgGenderMale } from "react-icons/cg";
import useAddNewPerson from "../hooks/useAddNewPerson";
import Button from "../../../../components/common/Button";
import { FaSave } from "react-icons/fa";


export const AddNewPerson = () => {
    const { genderOptions, formData, handleFieldChange, submitting, errors, handleSubmit } = useAddNewPerson();
    return (
        <div className="space-y-6">
            <PageHeader title="إضافة شهادة" />
            <ViewLayout>
                <form onSubmit={handleSubmit} className=" flex flex-col gap-5">

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">

                        <InputWithIcon isRequired error={errors?.certificateNumber} icon={<GrCertificate size={20} />} onChange={(e: any) => handleFieldChange("certificateNumber", e?.target?.value)} value={formData?.certificateNumber} label="رقم الشهادة" />
                        <InputWithIcon isRequired error={errors?.issuePlace} icon={<MdPlace size={20} />} onChange={(e: any) => handleFieldChange("issuePlace", e?.target?.value)} value={formData?.issuePlace} label="مكان الاصدار" />

                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon icon={<MdDateRange size={20} />}  isRequired error={errors?.expiryDate} onChange={(e: any) => handleFieldChange("expiryDate", e.target.value)} value={formData?.expiryDate} label="نهاية الصلاحية" />

                        <ImageInput error={errors?.photoUrl} image={formData?.photoUrl as string} label="صورة" isRequired setImage={(e) => handleFieldChange("photoUrl", e)} />

                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon isRequired error={errors?.name} icon={<IoPerson size={20} />} onChange={(e) => handleFieldChange("name", e?.target?.value)} value={formData?.name} label="الاسم" />
                        <InputWithIcon isRequired error={errors?.idNumber} icon={<HiIdentification size={20} />} onChange={(e) => handleFieldChange("idNumber", e?.target?.value)} type="number" value={formData?.idNumber != undefined ? formData.idNumber : ""} label="رقم الهوية" />

                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">

                        <InputWithIcon isRequired error={errors?.FirmLicenseNum} icon={<IoPerson size={20} />} onChange={(e) => handleFieldChange("FirmLicenseNum", e?.target?.value)} value={formData?.FirmLicenseNum} label="رقم رخصة المنشأة" />
                        <InputWithIcon isRequired error={errors?.firmName} icon={<HiIdentification size={20} />} onChange={(e) => handleFieldChange("firmName", e?.target?.value)} value={formData?.firmName} label="اسم المنشأة" />

                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">

                        <InputWithIcon isRequired error={errors?.programType} icon={<IoPerson size={20} />} onChange={(e) => handleFieldChange("programType", e?.target?.value)} value={formData?.programType} label="اسم البرنامج" />
                        <InputWithIcon  icon={<MdDateRange size={20} />}  isRequired error={errors?.programExpiry} onChange={(e: any) => handleFieldChange("programExpiry", e.target.value)} value={formData?.programExpiry} label=" نهاية الصلاحية البرنامج " />


                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon icon={<MdDateRange size={20} />}  isRequired error={errors?.issueDate} onChange={(e: any) => handleFieldChange("issueDate", e.target.value)} value={formData?.issueDate} label="تاريخ الاصدار " />
                        <SelectMenu isRequired error={errors?.gender} icon={<CgGenderMale size={20} />} options={genderOptions} value={formData?.gender} onChange={(e) => handleFieldChange("gender", e)} label="الجنس" />

                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">

                        <InputWithIcon isRequired error={errors?.nationality} icon={<FaFlag size={20} />} value={formData?.nationality} onChange={(e) => handleFieldChange("nationality", e?.target?.value)} label="الجنسية" />
                        <InputWithIcon isRequired icon={<GrUserWorker size={20} />} error={errors?.job} value={formData?.job} onChange={(e) => handleFieldChange("job", e?.target?.value)} label="المهنه" />

                    </div>


                    <Button loading={submitting} type="submit" className="mt-5" >
                        <FaSave className=" ml-2 mt-0.5" />
                        حفظ
                    </Button>
                </form>
            </ViewLayout>
        </div>
    )
}