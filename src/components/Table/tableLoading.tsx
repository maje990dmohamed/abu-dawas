

const TableSkeleton = ({ rows = 10 }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse">
        {/* <thead>
          <tr className="bg-gray-200">
            {["#", "User Name", "Email", "Phone Number", "Status", "Photo", "Action"].map((header, idx) => (
              <th key={idx} className="text-left p-2 text-sm font-semibold text-gray-700">{header}</th>
            ))}
          </tr>
        </thead> */}
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index} className="animate-pulse border-b border-gray-200">
              <td className="p-2">
                <div className="h-4 w-4 bg-gray-300 rounded" />
              </td>
              <td className="p-2">
                <div className="h-4 w-24 bg-gray-300 rounded" />
              </td>
              <td className="p-2">
                <div className="h-4 w-40 bg-gray-300 rounded" />
              </td>
              <td className="p-2">
                <div className="h-4 w-28 bg-gray-300 rounded" />
              </td>
              <td className="p-2">
                <div className="h-6 w-20 bg-gray-300 rounded-full" />
              </td>
              <td className="p-2">
                <div className="h-10 w-10 bg-gray-300 rounded-full" />
              </td>
              <td className="p-2 flex gap-2">
                <div className="h-6 w-12 bg-gray-300 rounded-md" />
                <div className="h-6 w-12 bg-gray-300 rounded-md" />
                <div className="h-6 w-14 bg-gray-300 rounded-md" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
