import { forwardRef } from "react";

const SecondPageContent = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      id="certificateText"
      ref={ref}
      style={{
        width: '210mm',
        height: 'fit-content', // يتكيف مع المحتوى فقط
        padding: '25mm 25mm 10mm 25mm', // تقليل الـ padding السفلي أكثر
        fontFamily: 'Arial, sans-serif',
        direction: 'rtl',
        boxSizing: 'border-box',
        margin: 0, // إزالة أي margins
      }}

    >
      {/* النصوص الإرشادية */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        <p style={{
          fontSize: '35px', // زيادة حجم الخط من 16px إلى 35px
          fontWeight: '600',
          textAlign: 'justify',
          fontFamily: "Cairo",
          margin: '0',
          padding: "0",
          lineHeight: '1.2', // زيادة المسافة بين الأسطر
          color: 'black',
        }}>
          * حامل هذه الشهادة حاصل على تقرير طبي يثبت خلوه من الأمراض
          المعدية وأجريت له التطعيمات التي تخوله للعمل في محلات الأغذية
          والصحة العامة
        </p>

        <p style={{
          fontSize: '35px',
          fontWeight: '600',
          textAlign: 'justify',
          fontFamily: "Cairo",
          margin: '0',
          padding: "0",

          lineHeight: '1.2',
          color: 'black',
        }}>
          * تشغيل عمال ليس لديهم شهادات صحية أو لديهم شهادات
          صحية منتهية يعاقب عليها النظام بغرامة مالية عن كل عامل
        </p>

        <p style={{
          fontSize: '35px',
          fontWeight: '600',
          textAlign: 'justify',
          fontFamily: "Cairo",

          margin: '0',
          padding: "0",
          lineHeight: '1.2',
          color: 'black',
        }}>
          * تجديد هذه الشهادة قبل انتهائها بثلاثين يوماً
        </p>

        <p style={{
          fontSize: '35px',
          fontWeight: '600',
          textAlign: 'justify',
          fontFamily: "Cairo",

          margin: '0',
          padding: "0",
          lineHeight: '1.2',
          color: 'black',
        }}>
          * لا تعتبر هذه الشهادة إثباتاً هوياً لحاملها
        </p>

        <p style={{
          fontSize: '35px',
          fontWeight: '600',
          textAlign: 'justify',
          fontFamily: "Cairo",

          margin: '0',
          padding: "0",
          lineHeight: '1.2',
          color: 'black',
        }}>
          * للتأكد من سلامة الشهادة يرجى زيارة موقع أمانة منطقة الرياض
        </p>

      </div>
    </div>
  );
});

SecondPageContent.displayName = 'SecondPageContent';

export default SecondPageContent;