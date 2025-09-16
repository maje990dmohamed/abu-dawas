import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CgEye } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import TabelLayOut from "../../layouts/TabelLayOut";
import Pagination from "../Pagenation/Pagination";
import EmptyPage from "../common/EmptyPage";
import PageLoading from "../common/PageLoading";
import DeleteDialog from "../dialog/DeleteDialog";

type TableHeader = {
  label: string;
  key: string;
};

type TableProps = {
  headers: TableHeader[];
  data: any[];
  isEdit?: boolean;
  isDelete?: any;
  isView?: boolean;
  onEdit?: (item: any) => void;
  onView?: (item: any) => void;
  onDeleteConfirm?: (id: any) => void;
  onToggleStatus?: (id: string, isOn: boolean) => void;
  deleteMessage?: string;
  onSelectRows?: any;
  loading?: boolean;
  isSelect?: boolean;
  totalPages: number;
  selectedRows?: any;
  isEmail?: boolean;
  onEmail?: any;
  isReject?: any;
  isAccept?: any;
  deleteTitle: string;
  deleteSubTitle: string;
  deleteTitleAfterAccept: string;
  onReject?: any;
  onAccept?: any;
  deleteConfirmationMessag?: string;
  onActive?: (item: any) => void;
  onDisActive?: (item: any) => void;
  isPagination?: boolean;
  filterDeletedData: any
  collectionName: any

};

const Table: React.FC<TableProps> = ({
  headers,
  data: propData,
  isEdit,
  deleteSubTitle,
  deleteTitle,
  isDelete,
  isView,
  deleteTitleAfterAccept,
  onEdit,
  onView,
  // onDeleteConfirm,
  // deleteMessage,
  onSelectRows,
  loading = false,
  isEmail,
  isReject,
  isAccept,
  totalPages,
  isPagination = true,
  onEmail,
  filterDeletedData,
  collectionName

}) => {
  // const [selectedRow, setSelectedRow] = useState<any>({});
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [data, setData] = useState(propData || [])
  useEffect(() => {
    if (propData) {
      setData(propData)
    }
  }, [propData])
  // const [isopen, setIsOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState<any>(null);

  // const filterDeletedData = (selectedIDS:string[]) => { 
  //   const newData = data.filter((item:PersonType) => !selectedIDS.includes(String(item.idNumber)));
  //   setData(newData);
  // }

  useEffect(() => {
    onSelectRows?.(selectedIds);
  }, [selectedIds]);

  // const handleSelect = (id: number) => {
  //   const currentIds = selectedIds ?? [];
  //   const updatedIds = currentIds.includes(id)
  //     ? currentIds.filter((item: any) => item !== id)
  //     : [...currentIds, id];
  //   setSelectedIds?.(updatedIds);
  // };

  console.log("selected", selectedIds);
  // const handleSelectAll = () => {
  //   const allIds = data.map((row) => row.id);
  //   const currentIds = selectedIds ?? [];

  //   const isAllSelected = allIds.every((id) => currentIds.includes(id));
  //   setSelectedIds?.(isAllSelected ? [] : allIds);
  // };

  // const handleDeleteClick = (item: any) => {
  // setSelectedItem(item);
  // setOpen(true);
  // };

  // const handleConfirmDelete = () => {
  //   if (selectedItem) {
  //     onDeleteConfirm?.([selectedItem.id]);
  //     setOpen(false);
  //     setIsOpen(true);
  //   }
  // };

  // const CustomCheckbox = styled(Checkbox)(() => ({
  //   padding: 0,
  //   width: 20,
  //   height: 20,
  //   borderRadius: 6,
  //   backgroundColor: "var(--checkBox-bg)",
  //   border: "2px solid #0096FF",

  //   "&.Mui-checked": {
  //     backgroundColor: "var(--checkBox-bg)",
  //     border: "2px solid #0096FF",
  //     color: "#0096FF",
  //   },
  //   "&.Mui-focusVisible": {
  //     outline: "none",
  //     boxShadow: "none",
  //   },
  // }));

  // const CheckIconOnly = (
  //   <CheckIcon
  //     className="font-medium text-4xl"
  //     sx={{ fontSize: 16, color: "#0096FF", backgroundColor: "transparent" }}
  //   />
  // );

  const truncateText = (text: string, maxLength: number = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (
    <>
      {" "}
      <TabelLayOut>
        <div className="overflow-x-auto rounded-[8px] shadow border-[#EAECF0] w-full  ">


          {
            loading ? <div className="m-auto">
              <PageLoading />
            </div> :
              <table className="w-full text-sm text-center border dark:border-[#485261] border-[#EAECF0]">
                <thead className="bg-table-head text-foreground whitespace-nowrap">
                  <tr>
                    <th className="px-4 py-2 bg-table-head  ">
                      #
                    </th>
                    {headers.map((header, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-2 font-medium capitalize border dark:border-[#485261] border-[#EAECF0] "
                      >
                        {header.label}
                      </th>
                    ))}
                    {(isEdit ||
                      isDelete ||
                      isView ||
                      isEmail) && (
                        <th
                          className={`px-4 py-2 text-center font-medium   bg-table-head`}
                        >
                          {"الإجراءات"}
                        </th>
                      )}
                  </tr>
                </thead>

                <tbody className="whitespace-nowrap  ">
                  {data.length === 0  ? (
                    <tr>
                      <td colSpan={headers.length + 2}>
                        <EmptyPage />
                      </td>
                    </tr>
                  ) : (
                    data.map((row, rowIndex) => {
                      const isSelected = selectedIds?.includes(row.id);

                      return (
                        <tr
                          key={row.id}
                          className={`transition bg-table-body  ${isSelected
                            ? "bg-[#CDDAFF]"
                            : rowIndex % 2 === 0
                              ? "bg-white"
                              : "bg-white"
                            } hover:bg-[var(--primary)]/10`}
                        >
                          <td className="px-4 py-2 border dark:border-[#485261]  bg-table-body  ">
                            {rowIndex + 1}
                          </td>
                          {headers?.map((header, colIndex) => {
                            const cell = row[header.key];
                            return (
                              <td
                                key={colIndex}
                                className="px-4 py-2 border dark:border-[#485261] bg-table-body "
                              >
                                {header.key === "photoUrl" ? (
                                  <div className="flex justify-center items-center">
                                    <img
                                      src={cell}
                                      alt="image"
                                      className="w-10 h-10 rounded-full flex justify-center items-center "
                                    />
                                  </div>
                                ) : header.key === "rate" ? (
                                  <div className="flex justify-center items-center">
                                    <Stack spacing={1}>
                                      <Rating
                                        name="simple-controlled"
                                        value={cell}
                                        readOnly
                                      />
                                    </Stack>
                                  </div>
                                ) : header.key === "gender" ? (
                                  <div className="flex justify-center items-center">
                                    {row.gender}
                                  </div>
                                ) : header.key === "status" ? (
                                  <div className="flex justify-center items-center">
                                    <div
                                      className={`w-[100px] h-[24px] pe-[8px] py-[2px] rounded-[16px] flex items-center text-center justify-center

                          ${cell == 1
                                          ? " text-[var(--primary)] "
                                          : "bg-[#e85d5d3d] text-[#E85D5D]"
                                        } `}
                                    >
                                      <span className="flex items-center justify-center gap-0">
                                        <LuDot size={30} />

                                        {cell == 1 ? "Active" : "Disactive"}
                                      </span>
                                    </div>
                                  </div>
                                ) : header.key === "description" ? (
                                  <div>
                                    <div
                                      dangerouslySetInnerHTML={{ __html: cell }}
                                      className="max-w-xs  line-clamp-1 overflow-hidden truncate  "
                                    />
                                  </div>
                                ) : (
                                  truncateText(cell, 20)
                                )}
                              </td>
                            );
                          })}
                          {(isEdit ||
                            isDelete ||
                            isView ||
                            isAccept ||
                            isReject ||
                            isEmail) && (
                              <td
                                className={`px-4 py-3 flex gap-2 justify-center items-center border-t dark:border-[#485261] bg-table-body `}
                              >
                                {isEmail && (
                                  <button
                                    onClick={() => onEmail?.(row)}
                                    className="capitalize bg-[#647DC6] text-white min-w-[132px]  px-[12px] py-4 rounded-[8px] flex justify-center items-center gap-2 flex-row h-6 font-normal cursor-pointer"
                                  >
                                    <img
                                      src={''}
                                      alt="Edit"
                                      className="w-4 h-4"
                                    />
                                    {"Contact"}
                                  </button>
                                )}
                                {isView && (
                                  <button
                                    onClick={() => onView?.(row)}
                                    className=" text-white min-w-[95px] bg-[var(--secondary)] hover:opacity-90 transition-all border-[1px] border-[var(--secondary)] px-[12px] py-4 rounded-[8px] flex justify-center items-center gap-2 flex-row h-6 font-normal cursor-pointer"
                                  >
                                    <CgEye className=" mt-1" />
                                    {"عرض"}
                                  </button>
                                )}
                                {isEdit && (
                                  <button
                                    onClick={() => onEdit?.(row)}
                                    className="bg-purple-100 transition-all hover:bg-purple-200 min-w-[116px] text-[var(--primary)]  px-[12px] py-4 rounded-[8px] flex justify-center items-center  gap-2  flex-row h-6 font-normal  cursor-pointer"
                                  >
                                    <FaEdit />
                                    {"تعديل"}
                                  </button>
                                )}

                                {isDelete && (
                                  <button
                                    onClick={() => {
                                      // setSelectedRow(row);
                                      setSelectedIds([row?.idNumber]);
                                      setOpenDelete(true);
                                    }}
                                    className="bg-[#FEEEEE] min-w-[109px] transition-all hover:bg-red-100 text-[#AE3A3E] px-[12px] py-4 rounded flex gap-2  justify-center items-center  flex-row  h-6 font-normal cursor-pointer"
                                  >
                                    <Trash2Icon />
                                    {"حذف"}
                                  </button>
                                )}
                              </td>
                            )}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
          }


        </div>
      </TabelLayOut>

      <DeleteDialog
        title={deleteTitle}
        subTitle={deleteSubTitle}
        deleteTitleAfterAccept={deleteTitleAfterAccept}
        open={openDelete}
        filterAfter={filterDeletedData}
        setOpen={() => {
          setOpenDelete(false);
        }}
        selectedID={selectedIds}
        collectionName={collectionName}
      />{" "}

      {isPagination && (
        <div className="my-5 ">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
};

export default Table;
