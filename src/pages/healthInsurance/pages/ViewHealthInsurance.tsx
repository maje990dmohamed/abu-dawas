import PageHeader from '../../../components/common/PageHeader'
import ViewLayout from '../../../components/common/ViewLayout'
import InputWithIcon from '../../../components/common/inputs/InputWithIcon'
import { GrCertificate, GrDocumentPdf, GrUserWorker } from 'react-icons/gr'
import ImageInput from '../../../components/common/inputs/ImageInput'
import { IoPerson } from 'react-icons/io5'
import { HiIdentification } from 'react-icons/hi2'
import { FaFlag } from 'react-icons/fa'
import useViewHealthInsurance from '../hooks/useViewHealthInsurance'
import CardUI from './components/cardUI'
import PageLoading from '../../../components/common/PageLoading'
import SelectMenu from '../../../components/common/inputs/SelectMenu'
import { CgGenderMale } from 'react-icons/cg'
import Button from '../../../components/common/Button'
import { MdDateRange } from 'react-icons/md'

const ViewHealthInsurance = () => {
    const { formData, certificateRef, loading, genderOptions, handleOpenPDF } = useViewHealthInsurance();
    console.log("data", formData);
    
    if (loading)
        return <PageLoading />

    return (
        <div className="space-y-6">
            <PageHeader title="عرض البيانات" />
            <ViewLayout>
                <form className="flex flex-col gap-5">

                    {/* الصف الأول - معلومات الشهادة */}


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon
                            disabled
                            icon={<GrCertificate size={20} />}
                            value={formData?.certificateNumber}
                            label="رقم الشهادة"
                        />
                        <InputWithIcon
                            disabled
                            icon={<GrCertificate size={20} />}
                            value={formData?.amana}
                            label="الامانة"
                        />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon
                            disabled
                            icon={<GrCertificate size={20} />}
                            value={formData?.municipality}
                            label="البلدية"
                        />
                        <InputWithIcon
                            disabled
                            icon={<FaFlag size={20} />}
                            value={formData?.nationality}
                            label="الجنسية"
                        />


                    </div>




                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon
                            disabled
                            icon={<GrCertificate size={20} />}
                            value={formData?.programType}
                            label="نوع البرنامج"
                        />
                        <InputWithIcon
                            disabled
                            icon={<GrCertificate size={20} />}
                            value={formData?.FirmLicenseNum}
                            label="رقم الرخصة"
                        />
                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <ImageInput
                            image={formData?.photoUrl as string}
                            label="صورة"
                            disabled
                            isView
                        />
                        <InputWithIcon
                            disabled
                            icon={<IoPerson size={20} />}
                            value={formData?.name}
                            label="الاسم"
                        />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon
                            disabled
                            icon={<IoPerson size={20} />}
                            value={formData?.firmName}
                            label="اسم المنشأة"
                        />
                        <InputWithIcon
                            disabled
                            icon={<IoPerson size={20} />}
                            value={formData?.FirmNum}
                            label="رقم المنشأة"
                        />
                    </div>



                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon
                            disabled
                            icon={<HiIdentification size={20} />}
                            type="number"
                            value={formData?.idNumber != undefined ? formData.idNumber : ""}
                            label="رقم الهوية"
                        />
                        <InputWithIcon
                            disabled
                             icon={<MdDateRange size={20} />}
                            value={formData?.programExpiry}
                            label="تاريخ انتهاء البرنامج"
                        />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">


                        <InputWithIcon
                            disabled
                            value={formData?.expiryCerDateHijri != "" ? formData.expiryCerDateHijri : null}
                            label="تاريخ انتهاء الشهادة هجري"
                            icon={<MdDateRange size={20} />}

                        />
                        <InputWithIcon
                            disabled
                            value={formData?.expiryCerDate != "" ? formData.expiryCerDate : null}
                            label="تاريخ انتهاء الشهادة ميلادي"
                            icon={<MdDateRange size={20} />}

                        />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">

                        <InputWithIcon
                            disabled
                            value={formData?.issueCerDate != "" ? formData.issueCerDate : null}
                            label="تاريخ اصدار الشهادة ميلادي"
                            icon={<MdDateRange size={20} />}
                        />
                        <InputWithIcon
                            disabled
                            icon={<MdDateRange size={20} />}
                            value={formData?.issueCerDateHijri != "" ? formData.issueCerDateHijri : null}
                            label="تاريخ اصدار الشهادة هجري"
                        />
                    </div>



                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">

                        <SelectMenu
                            disabled
                            icon={<CgGenderMale size={20} />}
                            options={genderOptions}
                            value={formData?.gender}
                            label="الجنس"
                        />
                        <InputWithIcon
                            disabled
                            icon={<GrUserWorker size={20} />}
                            value={formData?.job}
                            label="المهنه"
                        />
                    </div>
                    <Button onClick={handleOpenPDF} className="mt-5" >
                        <GrDocumentPdf />
                        <span className="inline-block ms-2">طباعة</span>
                    </Button>

                </form>
            </ViewLayout>

            {/* الشهادة المخفية للطباعة */}
            {
                formData && (
                    <div style={{
                        // position: "absolute",
                        // left: "-9999px",
                        // top: "-9999px",
                        // zIndex: -1,
                    }}>
                        <CardUI ref={certificateRef} data={formData} />
                    </div>
                )
            }
        </div >
    )
}

export default ViewHealthInsurance