import { forwardRef } from "react";
import QRCode from "react-qr-code";

import milt from "../../../../assets/icons/3milt.png";
import baladya from "../../../../assets/icons/2baladya.png";

import logo1 from "../../../../assets/icons/صورة_امانة_الرياض2.png";
import logo2 from "../../../../assets/icons/امانة_جدة2.png";
import logo3 from "../../../../assets/icons/امانة_منطقة_الشرقية2.png";
import logo4 from "../../../../assets/icons/امانة_مكة_المقدسة2.png";

import logo5 from "../../../../assets/icons/assir.png";
import logo6 from "../../../../assets/icons/almadinah.png";

import background from "../../../../assets/icons/real-back.png";

import contactImage from "../../../../assets/icons/contact.png";
import footerImg from "../../../../assets/icons/footerImage.png";

const CardUI = forwardRef<HTMLDivElement, any>(({ data }: any, ref: any) => {
  return (
    <div
      ref={ref}
      style={{
        width: "990px",
        backgroundColor: "#EDEDED",
        fontFamily: "Arial, sans-serif",
        direction: "rtl",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* الجزء العلوي الأخضر */}
      <div
        id="HealthCareCard"
        style={{
          direction: "rtl",
          backgroundImage: `url(${background})`,
          backgroundSize: "100% auto",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          boxSizing: "border-box",
        }}
        className=" !font-kufi "
      >
        <div
          style={{
            color: "white",
            padding: "15px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* الشعارات على اليمين */}
          <div className=" flex items-center gap-1 z-10">
            <div className=" flex items-center gap-1">
              <img
                src={milt}
                style={{ width: "100px", height: "100px" }}
                className=" border-l border-gray-300 pl-1"
              />
              <img
                src={baladya}
                style={{ width: "90px", height: "100px" }}
                className={` ${
                  data?.insurance && data?.insurance?.length > 0
                    ? "border-l border-gray-300 pl-1"
                    : ""
                }`}
              />
            </div>
            {data?.insurance && data?.insurance?.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* يمكنك إضافة الشعارات هنا */}
                {data?.insurance && data.insurance.length > 0 && (
                  <div className=" h-[80px] flex items-center gap-1">
                    {data.insurance.some((ins: any) => ins.id === "1") && (
                      <img
                        src={logo1}
                        alt="أمانة الرياض"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                    {data.insurance.some((ins: any) => ins.id === "2") && (
                      <img
                        src={logo2}
                        className=" "
                        alt="أمانة جدة"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                    {data.insurance.some((ins: any) => ins.id === "3") && (
                      <img
                        src={logo3}
                        className=" "
                        alt="أمانة الشرقية"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                    {data.insurance.some((ins: any) => ins.id === "4") && (
                      <img
                        src={logo4}
                        className=" "
                        alt="أمانة مكة"
                        style={{ width: "80px", height: "100px" }}
                      />
                    )}
                    {data.insurance.some((ins: any) => ins.id === "5") && (
                      <img
                        src={logo5}
                        className=" "
                        alt="أمانة عسير"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                    {data.insurance.some((ins: any) => ins.id === "6") && (
                      <img
                        src={logo6}
                        className=" "
                        alt="أمانة المدينة"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            style={{
              fontSize: "35px",
              fontWeight: 500,
              padding: "10px 20px",
              paddingLeft: "70px",
              paddingRight: "70px",
              zIndex: 100,
              backgroundColor: "#0E726F",
              marginLeft: "-20px",
            }}
            className=" !text-5xl  !font-kufi"
          >
            الشهادة الصحية الموحدة
          </div>
        </div>

        {/* الجزء الأبيض الرئيسي */}
        <div
          style={{
            flex: 1,
            padding: "0 20px",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* الجزء العلوي - الصورة والكيو آر كود على اليسار والمعلومات على اليمين */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              zIndex: 100,
              marginBottom: "0px",
            }}
          >
            {/* الجانب الأيمن - المعلومات */}
            <div
              style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px",
                alignContent: "start",
              }}
            >
              {/* الاسم - يأخذ العمود الكامل */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "right",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#207373",
                    fontFamily: "Noto Kufi Arabic, sans-serif",
                  }}
                >
                  {data?.name || ""}
                </label>
              </div>
              {/* رقم الهوية */}
              <div style={{ textAlign: "right" }}>
                <label
                  className=" !text-xl !font-normal"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "black",
                    fontFamily: "Noto Kufi Arabic, sans-serif",
                  }}
                >
                  رقم الهوية
                </label>
                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "0",
                    padding: "5px",
                    fontSize: "16px",
                    // fontFamily: 'Cairo, Arial',
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  {data?.idNumber || ""}
                </div>
              </div>
              {/* الجنسية */}
              <div style={{ textAlign: "right" }}>
                <label
                  className=" !text-xl !font-normal"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "black",
                    fontFamily: "Noto Kufi Arabic, sans-serif",
                  }}
                >
                  الجنسية
                </label>
                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "0",
                    padding: "5px",
                    fontSize: "16px",
                    // fontFamily: 'Cairo, Arial',
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  {data?.nationality || ""}
                </div>
              </div>
              {/* رقم الشهادة الصحية */}
              <div style={{ textAlign: "right" }}>
                <label
                  className=" !text-xl !font-normal"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "black",
                    fontFamily: "Noto Kufi Arabic, sans-serif",
                  }}
                >
                  رقم الشهادة الصحية
                </label>
                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "0",
                    padding: "5px",
                    fontSize: "16px",
                    // fontFamily: 'Cairo, Arial',
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  {data?.certificateNumber || ""}
                </div>
              </div>
              {/* المهنة */}
              <div style={{ textAlign: "right" }}>
                <label
                  className=" !text-xl !font-normal"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "black",
                    fontFamily: "Noto Kufi Arabic, sans-serif",
                  }}
                >
                  المهنة
                </label>
                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "0",
                    padding: "5px",
                    fontSize: "16px",
                    // fontFamily: 'Cairo, Arial',
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  {data?.job || ""}
                </div>
              </div>
              {/* تاريخ إصدار الشهادة الصحية */}
              <div style={{ textAlign: "right" }}>
                <label
                  className=" !text-xl !font-normal"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "black",
                    fontFamily: "Noto Kufi Arabic, sans-serif",
                  }}
                >
                  تاريخ إصدار الشهادة الصحية
                </label>
                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "0",
                    padding: "5px",
                    fontSize: "16px",
                    // fontFamily: 'Cairo, Arial',
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  {data?.issueCerDateHijri || ""}
                </div>
              </div>
              {/* تاريخ نهاية الشهادة الصحية */}
              <div style={{ textAlign: "right" }}>
                <label
                  className=" !text-xl !font-normal"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "black",
                    fontFamily: "Noto Kufi Arabic, sans-serif",
                  }}
                >
                  تاريخ نهاية الشهادة الصحية
                </label>
                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "0",
                    padding: "5px",
                    fontSize: "16px",
                    // fontFamily: 'Cairo, Arial',
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  {data?.expiryCerDateHijri || ""}
                </div>
              </div>
              {/* نوع البرنامج التثقيفي */}
              <div style={{ textAlign: "right" }}>
                <label
                  className=" !text-xl !font-normal"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "black",
                    fontFamily: "Noto Kufi Arabic, sans-serif",
                  }}
                >
                  نوع البرنامج التثقيفي
                </label>
                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "0",
                    padding: "5px",
                    fontSize: "16px",
                    // fontFamily: 'Cairo, Arial',
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  {data?.programType || ""}
                </div>
              </div>
              {/* تاريخ نهاية البرنامج التثقيفي */}
              <div style={{ textAlign: "right" }}>
                <label
                  className=" !text-xl !font-normal"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "black",
                    fontFamily: "Noto Kufi Arabic, sans-serif",
                  }}
                >
                  تاريخ انتهاء البرنامج التثقيفي
                </label>
                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "0",
                    padding: "5px",
                    fontSize: "16px",
                    // fontFamily: 'Cairo, Arial',
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  {data?.programExpiry || ""}
                </div>
              </div>
            </div>
            {/* الجانب الأيسر - الصورة والكيو آر كود */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "-25px",
                gap: "20px",
                alignItems: "center",
                height: "fit-content",
              }}
            >
              {/* الصورة الشخصية */}
              <div
                style={{
                  border: "2px solid #8AC458",
                  padding: "10px",
                  width: "185px",
                  height: "185px",
                  // backgroundColor: "white",
                }}
              >
                {data?.photoUrl ? (
                  <img
                    src={data.photoUrl}
                    alt="صورة شخصية"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#F0F0F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    صورة شخصية
                  </div>
                )}
              </div>
              {/* الكيو آر كود */}
              {!(data?.preventScan == true) && (
                <div style={{ padding: "10px", border: "2px solid #8AC458" }}>
                  <div
                    style={{
                      padding: "20px",
                      backgroundColor: "white",
                    }}
                  >
                    <QRCode
                      value={`https://abudawaswebsitescanqecodewebview.vercel.app/viewSpecificInsuranceProtected/${data.idNumber}`}
                      size={125}
                      level={"H"}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <img src={contactImage} alt="" />
      </div>

      {/* معلومات الاتصال في الأسفل */}
      <div id="footerImage" className=" max-w-full">
        <img src={footerImg} className=" !w-fit !w-" alt="" />
      </div>
    </div>
  );
});

export default CardUI;
