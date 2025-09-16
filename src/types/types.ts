export type PhotoFile = { file: File; url: string };
export type PersonType = {
    idNumber: number | undefined,
    name: string,
    photoUrl: string | PhotoFile,
    nationality: string,
    gender: any,
    expiryDate: string,
    job: string,
    issuePlace: string,
    certificateNumber: string
    programType: string,
    programExpiry: string,
    issueDate: string,
    firmName: string ,
    FirmLicenseNum: string

}
export type EditedPersonType = {
    idNumber: number | undefined,
    name: string,
    photoUrl: string | PhotoFile,
    nationality: string,
    gender: any,
    expiryDate: string,
    job: string,
    issuePlace?: string,
    certificateNumber: string,
    programType: string,
    programExpiry: string,
    issueDate: string,
    firmName: string,
    FirmLicenseNum: string
}


export type healthInsuranceType = {
    amana: string,
    name: string,
    municipality: string,
    idNumber: number | string | undefined,
    nationality: string,
     gender: any,
    job: string,
    certificateNumber: number | string,
    issueCerDateHijri: string,
    issueCerDate: string,
    expiryCerDateHijri: string,
    expiryCerDate: string,
    programType: string,
    programExpiry: string,
    FirmLicenseNum: number | string
    FirmNum: number | string
    firmName: string,
    photoUrl: string | PhotoFile,
}

  