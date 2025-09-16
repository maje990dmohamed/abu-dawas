/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

const ActionsTable = ({
  isView,
  handelView,
  handelEdit,
  handelDelete,
  isEdit,
  IsDelete,
  tData,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  const handleViewClick = () => {
    if (handelView) {
      handelView(tData);
    } else {
      navigate(`${tData.id}`);
    }
  };

  return (
    <div
      ref={menuRef}
      className="relative flex justify-center items-center p-2 "
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <MdMoreHoriz className="text-2xl" />
      </button>
      {isOpen && (
        <div className="absolute top-8 end-8 mt-2 w-40 bg-white shadow-lg rounded-md  p-2 z-[999]">
          {isView && (
            <button
              onClick={handleViewClick}
              className="flex w-full items-center  gap-4 text-[#272A48] hover:bg-gray-200 focus:outline-none p-2 rounded-md"

            >
              <IoEyeOutline size={20} color="#272A48" />
              View
            </button>
          )}
          {isEdit && (
            <button
              onClick={() => handelEdit(tData)}
              className="flex w-full items-center gap-2 text-gray-600 hover:bg-gray-200 focus:outline-none p-2 rounded-md"
            >
              Edit
            </button>
          )}
          {IsDelete && (
            <button
              onClick={() => handelDelete(tData)}
              className="flex w-full items-center gap-2 text-gray-600 hover:bg-gray-200 focus:outline-none p-2 rounded-md"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionsTable;
