import { FaFlag, FaSave } from 'react-icons/fa'
import { GrCertificate, GrUserWorker } from 'react-icons/gr'
import { HiIdentification } from 'react-icons/hi2'
import { IoPerson } from 'react-icons/io5'
import ImageInput from '../../../components/common/inputs/ImageInput'
import InputWithIcon from '../../../components/common/inputs/InputWithIcon'
import PageHeader from '../../../components/common/PageHeader'
import ViewLayout from '../../../components/common/ViewLayout'
import Button from '../../../components/common/Button'
import useEditHealthInsurance from '../hooks/useEditHealthInsurance'
import { CgGenderMale } from 'react-icons/cg'
import SelectMenu from '../../../components/common/inputs/SelectMenu'
import { MdDateRange } from 'react-icons/md'


const EditHealthInsurance = () => {

    const { formData, handleFieldChange, submitting, errors, handleSubmit, genderOptions } = useEditHealthInsurance();

    return (
        <div className="space-y-6">
            <PageHeader title="تعدبل تأمين" />
            <ViewLayout>
                <form onSubmit={handleSubmit} className=" flex flex-col gap-5">


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon isRequired
                            error={errors?.certificateNumber}
                            icon={<GrCertificate size={20} />}
                            onChange={(e: any) => handleFieldChange("certificateNumber", e?.target?.value)}
                            value={formData?.certificateNumber} label="رقم الشهادة" />

                        <InputWithIcon isRequired
                            error={errors?.amana}
                            icon={<GrCertificate size={20} />}
                            onChange={(e: any) => handleFieldChange("amana", e?.target?.value)}
                            value={formData?.amana} label="الامانة" />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon isRequired
                            error={errors?.municipality}
                            icon={<GrCertificate size={20} />}
                            onChange={(e: any) => handleFieldChange("municipality", e?.target?.value)}
                            value={formData?.municipality} label="البلدية" />

                        <InputWithIcon
                            isRequired
                            error={errors?.nationality}
                            icon={<FaFlag size={20} />}
                            value={formData?.nationality}
                            onChange={(e) => handleFieldChange("nationality", e?.target?.value)}
                            label="الجنسية" />

                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon isRequired
                            error={errors?.programType}
                            icon={<GrCertificate size={20} />}
                            onChange={(e: any) => handleFieldChange("programType", e?.target?.value)}
                            value={formData?.programType} label="نوع البرنامج" />

                        <InputWithIcon isRequired
                            error={errors?.FirmLicenseNum}
                            icon={<GrCertificate size={20} />}
                            onChange={(e: any) => handleFieldChange("FirmLicenseNum", e?.target?.value)}
                            value={formData?.FirmLicenseNum} label="رقم الرخصة" />
                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">


                        <ImageInput error={errors?.photoUrl}
                            image={formData?.photoUrl as string} label="صورة"
                            isRequired
                            setImage={(e) => handleFieldChange("photoUrl", e)} />
                        <InputWithIcon
                            isRequired
                            error={errors?.name}
                            icon={<IoPerson size={20} />}
                            onChange={(e) => handleFieldChange("name", e?.target?.value)}
                            value={formData?.name} label="الاسم" />

                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon
                            isRequired
                            error={errors?.firmName}
                            icon={<IoPerson size={20} />}
                            onChange={(e) => handleFieldChange("firmName", e?.target?.value)}
                            value={formData?.firmName} label="اسم المنشأة" />

                        <InputWithIcon
                            isRequired
                            error={errors?.FirmNum}
                            icon={<IoPerson size={20} />}
                            onChange={(e) => handleFieldChange("FirmNum", e?.target?.value)}
                            value={formData?.FirmNum} label="رقم المنشأة" />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon icon={<MdDateRange size={20} />} isRequired error={errors?.programExpiry}
                            onChange={(e: any) => handleFieldChange("programExpiry", e.target.value)}
                            value={formData?.programExpiry}
                            label="تاريخ انتهاء البرنامج" />
                        <InputWithIcon
                            isRequired
                            error={errors?.idNumber}
                            icon={<HiIdentification size={20} />}
                            onChange={(e) => handleFieldChange("idNumber", e?.target?.value)}
                            type="number"
                            value={formData?.idNumber != undefined ? formData.idNumber : ""}
                            label="رقم الهوية" />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon icon={<MdDateRange size={20} />} isRequired error={errors?.expiryCerDateHijri}
                            onChange={(e: any) => handleFieldChange("expiryCerDateHijri", e.target.value)}
                            value={formData?.expiryCerDateHijri}
                            label="تاريخ انتهاء الشهادة هجري" />

                        <InputWithIcon icon={<MdDateRange size={20} />} isRequired error={errors?.issueCerDate}
                            onChange={(e: any) => handleFieldChange("issueCerDate", e.target.value)}
                            value={formData?.issueCerDate}
                            label="تاريخ اصدار الشهادة ميلادي " />


                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <InputWithIcon icon={<MdDateRange size={20} />} isRequired error={errors?.issueCerDateHijri}
                            onChange={(e: any) => handleFieldChange("issueCerDateHijri", e.target.value)}
                            value={formData?.issueCerDateHijri}
                            label="تاريخ اصدار الشهادة هجري " />



                        <InputWithIcon icon={<MdDateRange size={20} />} isRequired error={errors?.expiryCerDate}
                            onChange={(e: any) => handleFieldChange("expiryCerDate", e.target.value)}
                            value={formData?.expiryCerDate}
                            label=" تاريخ انتهاء الشهادة ميلادي " />
                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-center items-center">
                        <SelectMenu isRequired error={errors?.gender} icon={<CgGenderMale size={20} />} options={genderOptions} value={formData?.gender} onChange={(e) => handleFieldChange("gender", e)} label="الجنس" />
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

export default EditHealthInsurance