import PageSelector from "./PageSelector";
import PerPage from "./PerPage";

function Pagination({ totalPages }: { totalPages: number }) {
  return (
    <div className="flex w-full items-center justify-between">
      <PerPage />
      <PageSelector totalPages={totalPages} />
    </div>
  );
}

export default Pagination;
