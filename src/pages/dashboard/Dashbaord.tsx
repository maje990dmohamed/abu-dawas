import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "../../components/common/Link";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/Table/table";
import useIndexPersons from "./Persons/hooks/useIndexPersons";
import { IoAdd } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

export const Dashboard = () => {
    const { getAllPersons, data, loading , setData } = useIndexPersons();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // الحصول على معاملات البحث من URL
    const searchTerm = searchParams.get("search") || "";
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const itemsPerPage = parseInt(searchParams.get("per_page") || "10", 10);

    const handleView = (item: any) => {
        navigate(`/view-person/${item.idNumber}`);
    };
    const handleEdit = (item: any) => {
        navigate(`/edit-person/${item.idNumber}`);
    };

    useEffect(() => {
        getAllPersons();
    }, []);

    // تصفية البيانات بناءً على البحث
    const filteredData = useMemo(() => {
        if (!data) return [];

        return data.filter((person: any) => {
            return (
                person.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                person.certificateNumber?.includes(searchTerm) ||
                person.idNumber?.includes(searchTerm)
            );
        });
    }, [data, searchTerm]);

    // حساب البيانات للصفحة الحالية
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    // إجمالي عدد الصفحات
    const totalPages = useMemo(() => {
        return Math.ceil(filteredData.length / itemsPerPage);
    }, [filteredData, itemsPerPage]);

    // تحديث معاملات البحث في URL
    const updateSearchParams = (updates: { search?: string; page?: number; per_page?: number }) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev.toString());

            if (updates.search !== undefined) {
                if (updates.search) {
                    newParams.set("search", updates.search);
                } else {
                    newParams.delete("search");
                }
                newParams.set("page", "1"); // العودة للصفحة الأولى عند البحث
            }

            if (updates.page !== undefined) {
                newParams.set("page", updates.page.toString());
            }

            if (updates.per_page !== undefined) {
                newParams.set("per_page", updates.per_page.toString());
                newParams.set("page", "1"); // العودة للصفحة الأولى عند تغيير عدد العناصر
            }

            return newParams;
        });
    };

    // useEffect(() => {
    //     if (filteredData.length === 0 && searchTerm !== "") {
    //         toast.info('لم يتم العثور على نتائج', {
    //             position: "top-right",
    //             rtl: true,
    //         });
    //     }
    // }, [filteredData, searchTerm]);


       const filterDeletedData = (selectedIDS:string[]) => { 
        const newData = data.filter((item:any) => !selectedIDS.includes(String(item.idNumber)));
        setData(newData);
      }
    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <PageHeader title="الشهادات الصحية" className=" !w-fit" isBackButton={false} />
                    <Link className="p-5 rounded-2xl  w-fit flex items-center gap-1 ms-auto" to="/add-new-person"> 
                        <IoAdd className=" font-bold text-xl" /> 
                        اضافة شهادة صحية 
                    </Link>
                </div>

                {/* إضافة حقل البحث */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <label htmlFor="search" className="text-lg font-medium">بحث:</label>
                        <input
                            id="search"
                            type="text"
                            placeholder="ابحث بالاسم أو رقم الشهادة أو رقم الهوية..."
                            value={searchTerm}
                            onChange={(e) => updateSearchParams({ search: e.target.value })}
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => updateSearchParams({ search: "" })}
                                className="px-4 py-2 bg-gray-200 cursor-pointer text-gray-700 rounded-md hover:bg-gray-300"
                            >
                                مسح البحث
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <Table
                        data={paginatedData}
                        loading={loading}
                        headers={[
                            { label: " رقم الشهادة الصحية", key: "certificateNumber" },
                            { label: "الاسم", key: "name" },
                            { label: "الجنسية", key: "nationality" },
                            { label: "رقم الهوية", key: "idNumber" },
                            { label: "الجنس", key: "gender" },
                            { label: "مكان الاصدار", key: "issuePlace" },
                            { label: "نهاية الصلاحية", key: "expiryDate" },
                            { label: "المهنة", key: "job" },
                            { label: "اسم المنشأة", key: "firmName" },
                            { label: "رقم رخصة المنشأة", key: "FirmLicenseNum" },
                            { label: "تاريخ الاصدار", key: "issueDate" },
                            { label: "تاريخ انتهاء البرنامج التثقيبي", key: "programExpiry" },
                            { label: "البرنامج التثقيبي", key: "programType" },
                            { label: "الصورة", key: "photoUrl" },
                        ]}
                        isView
                        // isDelete
                        totalPages={totalPages}
                        isEdit
                        isDelete
                        deleteTitle={'حذف الشهادة الصحية'}
                        deleteSubTitle={'هل أنت متأكد من حذف هذه الشهادة؟'}
                        deleteTitleAfterAccept={'تم الحذف بنجاح'}
                        onEdit={handleEdit}
                        onView={handleView}
                        filterDeletedData={filterDeletedData}
                        collectionName={"persons"}
                    />
                </div>
                
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};