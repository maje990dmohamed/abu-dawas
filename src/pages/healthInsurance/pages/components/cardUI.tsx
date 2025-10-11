import { forwardRef } from 'react'
import QRCode from 'react-qr-code'

import milt from "../../../../assets/icons/3.png"
import baladya from "../../../../assets/icons/2.png"

import logo1 from "../../../../assets/icons/صورة_امانة_الرياض.png"
import logo2 from "../../../../assets/icons/امانة_جدة.png"
import logo3 from "../../../../assets/icons/امانة_منطقة_الشرقية.png"
import logo4 from "../../../../assets/icons/امانة_مكة_المقدسة.png"

import footerImg from '../../../../assets/icons/footerImg.png'

const CardUI = forwardRef<HTMLDivElement, any>(
    ({ data }: any, ref: any) => {
        // create vars like one = true or false -> four 
        // if data.insurance -> has item with id = 1 -> one = true and so on
        return (
            <div
                id="HealthCareCard"
                ref={ref}
                style={{
                    width: '250mm',
                    height: '310mm', // 337
                    backgroundColor: '#EDEDED',
                    fontFamily: 'Arial, sans-serif',
                    direction: 'rtl',
                    boxSizing: 'border-box',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: "hidden"
                }}
            >
                {/* الجزء العلوي الأخضر */}
                <div style={{
                    color: 'white',
                    padding: '15px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>

                    {/* الشعارات على اليمين */}
                    <div className=' flex items-center'>
                        <div className=' flex '>
                            <img src={milt} style={{ width: "70px", height: "70px" }} />
                            <img src={baladya} style={{ width: "70px", height: "70px" }} />
                        </div>
                        {data?.insurance && data?.insurance?.length > 0 &&
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                {/* يمكنك إضافة الشعارات هنا */}
                                {data?.insurance && data.insurance.length > 0 && (
                                    <>
                                        {data.insurance.some((ins: any) => ins.id === "1") && (
                                            <img src={logo1} className=' ' alt="أمانة الرياض" style={{ width: "75px", height: "60px" }} />
                                        )}
                                        {data.insurance.some((ins: any) => ins.id === "2") && (
                                            <img src={logo2} className=' ' alt="أمانة جدة" style={{ width: "70px", height: "70px" }} />
                                        )}
                                        {data.insurance.some((ins: any) => ins.id === "3") && (
                                            <img src={logo3} className=' ' alt="أمانة الشرقية" style={{ width: "70px", height: "70px" }} />
                                        )}
                                        {data.insurance.some((ins: any) => ins.id === "4") && (
                                            <img src={logo4} className=' ' alt="أمانة مكة" style={{ width: "60px", height: "50px" }} />
                                        )}

                                    </>
                                    // <div
                                    //     style={{
                                    //         display: "flex",
                                    //         alignItems: "center",
                                    //     }}

                                )}
                            </div>}
                    </div>

                    <div style={{
                        fontSize: '35px',
                        fontWeight: 600,
                        padding: "10px 20px",

                        backgroundColor: '#207373',
                        fontFamily: "Noto Kufi Arabic, sans-serif"


                    }}>
                        الشهادة الصحية الموحدة
                    </div>


                </div>

                {/* الجزء الأبيض الرئيسي */}
                <div style={{
                    flex: 1,
                    padding: '0 20px',
                    backgroundColor: '#EDEDED',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* الجزء العلوي - الصورة والكيو آر كود على اليسار والمعلومات على اليمين */}
                    <div style={{
                        display: 'flex',
                        gap: '6px',
                        marginBottom: '0px'
                    }}>


                        {/* الجانب الأيمن - المعلومات */}
                        <div style={{
                            flex: 1,
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '6px',
                            alignContent: 'start'
                        }}>
                            {/* الاسم - يأخذ العمود الكامل */}
                            <div style={{
                                gridColumn: '1 / -1',
                                textAlign: 'right'
                            }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '32px',
                                    fontWeight: 600,
                                    color: '#207373',
                                    fontFamily: "Noto Kufi Arabic, sans-serif"

                                }}>
                                    {data?.name || ''}

                                </label>
                            </div>

                            {/* رقم الهوية */}
                            <div style={{ textAlign: 'right' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: 'black',
                                    fontFamily: "Noto Kufi Arabic, sans-serif"
                                }}>
                                    رقم الهوية
                                </label>
                                <div style={{
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '0',
                                    padding: '5px',
                                    fontSize: '16px',
                                    // fontFamily: 'Cairo, Arial',
                                    color: 'black',
                                    fontWeight: '900'
                                }}>
                                    {data?.idNumber || ''}
                                </div>
                            </div>

                            {/* الجنسية */}
                            <div style={{ textAlign: 'right' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: 'black',
                                    fontFamily: "Noto Kufi Arabic, sans-serif"
                                }}>
                                    الجنسية
                                </label>
                                <div style={{
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '0',
                                    padding: '5px',
                                    fontSize: '16px',
                                    // fontFamily: 'Cairo, Arial',
                                    color: 'black',
                                    fontWeight: '900'
                                }}>
                                    {data?.nationality || ''}
                                </div>
                            </div>





                            {/* رقم الشهادة الصحية */}
                            <div style={{ textAlign: 'right' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: 'black',
                                    fontFamily: "Noto Kufi Arabic, sans-serif"
                                }}>
                                    رقم الشهادة الصحية
                                </label>
                                <div style={{
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '0',
                                    padding: '5px',
                                    fontSize: '16px',
                                    // fontFamily: 'Cairo, Arial',
                                    color: 'black',
                                    fontWeight: '900'
                                }}>
                                    {data?.certificateNumber || ''}
                                </div>
                            </div>


                            {/* المهنة */}
                            <div style={{ textAlign: 'right' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: 'black',
                                    fontFamily: "Noto Kufi Arabic, sans-serif"
                                }}>
                                    المهنة
                                </label>
                                <div style={{
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '0',
                                    padding: '5px',
                                    fontSize: '16px',
                                    // fontFamily: 'Cairo, Arial',
                                    color: 'black',
                                    fontWeight: '900'
                                }}>
                                    {data?.job || ''}
                                </div>
                            </div>



                            {/* تاريخ إصدار الشهادة الصحية */}
                            <div style={{ textAlign: 'right' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: 'black',
                                    fontFamily: "Noto Kufi Arabic, sans-serif"
                                }}>
                                    تاريخ إصدار الشهادة الصحية
                                </label>
                                <div style={{
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '0',
                                    padding: '5px',
                                    fontSize: '16px',
                                    // fontFamily: 'Cairo, Arial',
                                    color: 'black',
                                    fontWeight: '900'
                                }}>
                                    {data?.issueCerDateHijri || ''}
                                </div>
                            </div>

                            {/* تاريخ نهاية الشهادة الصحية */}
                            <div style={{ textAlign: 'right' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: 'black',
                                    fontFamily: "Noto Kufi Arabic, sans-serif"
                                }}>
                                    تاريخ نهاية الشهادة الصحية
                                </label>
                                <div style={{
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '0',
                                    padding: '5px',
                                    fontSize: '16px',
                                    // fontFamily: 'Cairo, Arial',
                                    color: 'black',
                                    fontWeight: '900'
                                }}>
                                    {data?.expiryCerDateHijri || ''}
                                </div>
                            </div>

                            {/* نوع البرنامج التثقيفي */}
                            <div style={{ textAlign: 'right' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: 'black',
                                    fontFamily: "Noto Kufi Arabic, sans-serif"
                                }}>
                                    نوع البرنامج التثقيفي
                                </label>
                                <div style={{
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '0',
                                    padding: '5px',
                                    fontSize: '16px',
                                    // fontFamily: 'Cairo, Arial',
                                    color: 'black',
                                    fontWeight: '900'
                                }}>
                                    {data?.programType || ''}
                                </div>
                            </div>

                            {/* تاريخ نهاية البرنامج التثقيفي */}
                            <div style={{ textAlign: 'right' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: 'black',
                                    fontFamily: "Noto Kufi Arabic, sans-serif"
                                }}>
                                    تاريخ نهاية البرنامج التثقيفي
                                </label>
                                <div style={{
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '0',
                                    padding: '5px',
                                    fontSize: '16px',
                                    // fontFamily: 'Cairo, Arial',
                                    color: 'black',
                                    fontWeight: '900'
                                }}>
                                    {data?.programExpiry || ''}
                                </div>
                            </div>
                        </div>

                        {/* الجانب الأيسر - الصورة والكيو آر كود */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                            alignItems: 'center',
                            backgroundColor: 'rgba(130, 209, 171, 0.5)',
                            padding: "5px",
                            height: 'fit-content'
                        }}>
                            {/* الصورة الشخصية */}
                            <div style={{
                                border: '3px solid #4A9B8E',
                                width: '160px',
                                height: '160px',
                                backgroundColor: 'white'
                            }}>
                                {data?.photoUrl ? (
                                    <img
                                        src={data.photoUrl}
                                        alt="صورة شخصية"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#F0F0F0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        color: '#666'
                                    }}>
                                        صورة شخصية
                                    </div>
                                )}
                            </div>

                            {/* الكيو آر كود */}
                            {!(data?.preventScan == true) && <div style={{
                                border: '2px solid #333',
                                padding: '5px',
                                backgroundColor: 'white'
                            }}>
                                <QRCode
                                    value={`https://abudawaswebsitescanqecodewebview.vercel.app/viewSpecificInsuranceProtected/${data.idNumber}`}
                                    size={150}
                                    level={"H"}
                                />
                            </div>}
                        </div>

                    </div>
                </div>

                {/* معلومات الاتصال في الأسفل */}
                <div style={{
                    backgroundColor: 'white',
                    // padding: '15px',
                    borderRadius: '10px',
                    // border: '2px solid #333',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    fontSize: '14px',
                    // fontFamily: 'Cairo, Arial',
                    marginTop: ''
                }}>
                    <img src={footerImg} style={{ width: "100%" }} alt="" />
                </div>


            </div>
        );
    }
);

export default CardUI;