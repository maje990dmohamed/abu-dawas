import { CgGenderMale } from "react-icons/cg";
import { FaFlag, } from "react-icons/fa";
import { GrCertificate, GrDocumentPdf, GrUserWorker } from "react-icons/gr";
import { HiIdentification } from "react-icons/hi2";
import { IoPerson } from "react-icons/io5";
import { MdDateRange, MdPlace } from "react-icons/md";
import Button from "../../../../components/common/Button";
import ImageInput from "../../../../components/common/inputs/ImageInput";
import InputWithIcon from "../../../../components/common/inputs/InputWithIcon";
import SelectMenu from "../../../../components/common/inputs/SelectMenu";
import PageHeader from "../../../../components/common/PageHeader";
import PageLoading from "../../../../components/common/PageLoading";
import ViewLayout from "../../../../components/common/ViewLayout";
import useViewPerson from "../hooks/useViewPerson";
import CertificateUI from "./components/CertificateUI";
import SecondPageContent from "./components/SecondPageContent";


const ViewPerson = () => {
    const { genderOptions, formData, loading, certificateRef, textRef, handleOpenPDF } = useViewPerson();

    if (loading) {
        return <PageLoading />
    }
    return (
        <div className="space-y-6">
            <PageHeader title="عرض الشهادة" />
            <ViewLayout>
                <div className=" flex flex-col gap-5">

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon disabled icon={<GrCertificate size={20} />} value={formData?.certificateNumber} label="رقم الشهادة" />
                        <InputWithIcon disabled icon={<MdPlace size={20} />} value={formData?.issuePlace} label="مكان الاصدار" />

                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon disabled icon={<MdDateRange size={20} />} value={formData?.expiryDate} label="نهاية الصلاحية" />

                        <ImageInput isView image={formData?.photoUrl as string} label="صورة" disabled />

                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon disabled icon={<IoPerson size={20} />} value={formData?.name} label="الاسم" />
                        <InputWithIcon disabled icon={<HiIdentification size={20} />} type="number" value={formData?.idNumber as number} label="رقم الهوية" />

                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <SelectMenu disabled icon={<CgGenderMale size={20} />} options={genderOptions} value={formData?.gender} label="الجنس" />
                        <InputWithIcon disabled icon={<FaFlag size={20} />} value={formData?.nationality} label="الجنسية" />

                    </div>



                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon icon={<GrUserWorker size={20} />} disabled value={formData?.job} label="المهنه" />
                        <InputWithIcon icon={<IoPerson size={20} />} disabled value={formData?.FirmLicenseNum} label="رقم الشركه" />

                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon icon={<HiIdentification size={20} />} disabled value={formData?.firmName} label="اسم الشركة" />
                        <InputWithIcon icon={<IoPerson size={20} />} disabled value={formData?.programType} label="اسم البرنامج" />

                    </div>



                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon  icon={<MdDateRange size={20} />} isRequired disabled value={formData?.programExpiry} label=" نهاية الصلاحية البرنامج " />
                        <InputWithIcon  icon={<MdDateRange size={20} />} isRequired disabled value={formData?.issueDate} label="تاريخ الاصدار " />

                    </div>



                    <Button onClick={handleOpenPDF} className="mt-5" >
                        <GrDocumentPdf />
                        <span className="inline-block ms-2">طباعة</span>
                    </Button>
                    
                </div>
            </ViewLayout>
            {formData && <div style={{
                position: "absolute",
                left: "-9999px",
                top: "-9999px",
                zIndex: -1,
            }}>
                <CertificateUI ref={certificateRef} data={formData} />
            </div>}
            {formData && <div style={{
                position: "absolute",
                left: "-9999px",
                top: "-9999px",
                zIndex: -1,
            }}>
                <SecondPageContent ref={textRef} />
            </div>}
        </div>
    )
}



export default ViewPerson