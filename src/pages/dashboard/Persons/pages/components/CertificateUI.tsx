import { forwardRef } from "react";
import type { PersonType } from "../../../../../types/types";
import QRCode from 'react-qr-code';
import logoPdf from '../../../../../assets/icons/logoPdf.png'


interface CertificateUIProps {
  data: PersonType;
}

const CertificateUI = forwardRef<HTMLDivElement, CertificateUIProps>(
  ({ data }: any, ref) => {

    const getGenderText = (gender: number | undefined) => {
      return gender === 1 ? "ذكر" : "أنثي";
    };


    return (
      <div
        id="certificate"
        ref={ref}
        style={{
          width: '210mm',
          height: '370mm',
          backgroundColor: 'white',
          fontFamily: 'Arial, sans-serif',
          direction: 'rtl',
          boxSizing: 'border-box',
          margin: 0,
          paddingBottom: '20mm',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header - الشعار والعنوان */}
        <div style={{
          width: "100%",
          height: "auto",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '10px',
          paddingTop: '20mm',
        }}>
          <img src={logoPdf} alt="Baladya Logo" style={{
            width: '700px',
            height: 'auto',
            objectFit: 'contain',
          }} />
        </div>

        {/* Photo, QR Code and Title Section */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginBottom: '5px',
          gap: '3px'
        }}>
          {/* QR Code على اليسار */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '25px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <QRCode
                value={`https://abudawaswebsitescanqecodewebview.vercel.app/viewSpecificCertificateProtected/${data.idNumber}`}
                size={220}
                level={"H"}
              />
            </div>
          </div>

          {/* الصورة على اليمين */}
          <div style={{ flex: '0 0 auto' }}>
            {data.photoUrl && (
              <img
                src={data.photoUrl}
                alt="صورة شخصية"
                style={{
                  width: '220px',
                  height: '220px',
                  border: '2px solid #666',
                  objectFit: 'cover'
                }}
              />
            )}
          </div>
        </div>

        {/* العنوان */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            fontFamily: "Cairo",
            color: '#2E8C44',
          }}>
            شهادة صحية
          </h2>
        </div>

        {/* Certificate Details في صندوق */}
        <div style={{
          border: '4px solid #666',
          borderRadius: '15px',
          backgroundColor: '#ffffff',
        }}>
          {/* الجزء العلوي - بيانات الشهادة */}
          <div style={{
            backgroundColor: '#f5f5f5',
            borderBottom: '3px solid #666',
            borderRadius: '11px 11px 0 0',
            padding: '25px'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: "Cairo"
            }}>
              <tbody>
                <tr>
                  <td style={{
                    fontWeight: 'bold',
                    fontSize: '34px',
                    padding: '12px 0',
                    width: '250px',
                    verticalAlign: 'top'
                  }}>
                    رقم الشهادة
                  </td>
                  <td style={{
                    fontSize: '34px',
                    fontWeight: 'bold',
                    padding: '12px 0',
                    paddingRight: '40px',
                    verticalAlign: 'top'
                  }}>
                    {data.certificateNumber || ''}
                  </td>
                </tr>
                <tr>
                  <td style={{
                    fontWeight: 'bold',
                    fontSize: '34px',
                    padding: '12px 0',
                    verticalAlign: 'top'
                  }}>
                    مكان الإصدار
                  </td>
                  <td style={{
                    fontSize: '34px',
                    padding: '12px 0',
                    paddingRight: '40px',
                    verticalAlign: 'top',
                    fontWeight: "bold"
                  }}>
                    {data.issuePlace || 'أمانة الرياض'}
                  </td>
                </tr>
                <tr>
                  <td style={{
                    fontWeight: 'bold',
                    fontSize: '34px',
                    padding: '12px 0',
                    verticalAlign: 'top'
                  }}>
                    نهاية الصلاحية
                  </td>
                  <td style={{
                    fontSize: '34px',
                    padding: '12px 0',
                    paddingRight: '40px',
                    verticalAlign: 'top',
                    fontWeight: "bold"
                  }}>
                    {data?.expiryDate || ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* الجزء السفلي - البيانات الشخصية */}
          <div style={{ padding: '30px' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: "Cairo"
            }}>
              <tbody>
                <tr>
                  <td style={{
                    fontWeight: 'bold',
                    fontSize: '34px',
                    padding: '12px 0',
                    width: '250px',
                    verticalAlign: 'top'
                  }}>
                    الاسم
                  </td>
                  <td style={{
                    fontSize: '34px',
                    padding: '12px 0',
                    paddingRight: '40px',
                    verticalAlign: 'top',
                    fontWeight: "bold"
                  }}>
                    {data.name || ''}
                  </td>
                </tr>
                <tr>
                  <td style={{
                    fontWeight: 'bold',
                    fontSize: '34px',
                    padding: '12px 0',
                    verticalAlign: 'top',

                  }}>
                    رقم الهوية
                  </td>
                  <td style={{
                    fontSize: '34px',
                    padding: '12px 0',
                    paddingRight: '40px',
                    verticalAlign: 'top',
                    fontWeight: "bold"
                  }}>
                    {data.idNumber || ''}
                  </td>
                </tr>
                <tr>
                  <td style={{
                    fontWeight: 'bold',
                    fontSize: '34px',
                    padding: '12px 0',
                    verticalAlign: 'top'
                  }}>
                    الجنس
                  </td>
                  <td style={{
                    fontSize: '34px',
                    padding: '12px 0',
                    paddingRight: '40px',
                    verticalAlign: 'top',
                    fontWeight: "bold"
                  }}>
                    {getGenderText(data.gender) || ''}
                  </td>
                </tr>
                <tr>
                  <td style={{
                    fontWeight: 'bold',
                    fontSize: '34px',
                    padding: '12px 0',
                    verticalAlign: 'top'
                  }}>
                    الجنسية
                  </td>
                  <td style={{
                    fontSize: '34px',
                    padding: '12px 0',
                    paddingRight: '40px',
                    verticalAlign: 'top',
                    fontWeight: "bold"
                  }}>
                    {data.nationality || ''}
                  </td>
                </tr>
                <tr>
                  <td style={{
                    fontWeight: 'bold',
                    fontSize: '34px',
                    padding: '12px 0',
                    verticalAlign: 'top'
                  }}>
                    المهنة
                  </td>
                  <td style={{
                    fontSize: '34px',
                    padding: '12px 0',
                    paddingRight: '40px',
                    verticalAlign: 'top',
                    fontWeight: "bold"
                  }}>
                    {data.job || ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);

CertificateUI.displayName = 'CertificateUI';

export default CertificateUI;