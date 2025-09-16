/* eslint-disable @typescript-eslint/no-explicit-any */


import ActionsTable from "./ActionsTable";

// تعريف نوع الدالة لتحويل البيانات
type TransformFunction = (key: string, value: any) => string | number;

interface DataTableProps {
  TABLE_HEAD: string[];
  table_body: any[];
  loading: boolean;
  table_Error?: string | null;
  filter_Key_Body: string[];
  isView?: boolean;
  handelView?: (data: any) => void;
  handelEdit?: (data: any) => void;
  handelDelete?: (data: any) => void;
  isEdit?: boolean;
  IsDelete?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  TABLE_HEAD,
  table_body,
  loading,
  table_Error,
  filter_Key_Body,
  isView,
  handelView,
  handelEdit,
  handelDelete,
  isEdit,
  IsDelete,
}) => {
  const transformData: TransformFunction = (key, value) => {
    const customMapping: Record<string, (val: any) => string | number> = {
      gender: (val) => (val === 0 ? "Male" : val === 1 ? "Female" : "N/A"),
      birth_date: (val) => new Date(val).toLocaleDateString(),
    };

    return customMapping[key] ? customMapping[key](value) : value ?? "N/A";
  };

  return (
    <div className="h-full w-full overflow-auto rounded-lg border border-gray-300 shadow-lg bg-white">
      {table_Error && (
        <h1 className="text-center my-3 font-semibold text-red-500 text-lg">
          Error while Getting Data
        </h1>
      )}

      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr className="bg-[#E6F7F9] text-black">
            {TABLE_HEAD.map((head, index) => (
              <th
                key={index}
                className="border-b border-blue-200 p-4 text-[14px] font-semibold text-tableText  tracking-wide"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {table_body.map((tData, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white hover:bg-gray-100 transition"
                >
                  {filter_Key_Body.map((key: string) => (
                    <td
                      key={key}
                      className="p-4 border-b border-blue-50 max-w-[120px] truncate text-tableText"
                    >
                      {key === "image" ? (
                        <img
                          src={tData[key]}
                          alt="Blog Image"
                          className="w-[40px] h-[40px] object-cover rounded-md"
                        />
                      ) : (
                        <p className="font-normal text-sm text-gray-700">
                          {transformData(key, tData[key] ?? "N/A")}
                        </p>
                      )}
                    </td>
                  ))}
                  <td className="p-4 border-b border-blue-50 text-center relative z-[99999]">
                    <div className="inline-block">
                      <ActionsTable
                        isView={isView}
                        handelView={handelView}
                        isEdit={isEdit}
                        IsDelete={IsDelete}
                        handelEdit={handelEdit}
                        handelDelete={handelDelete}
                        tData={tData} // ✅ إرسال بيانات الصف الصحيح هنا
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>

      {/* {loading && (
        <div className="w-full flex justify-center items-center py-6">

        </div>
      )} */}
    </div>
  );
};

export default DataTable;
