import Loader from "./Loader"

const PageLoading = () => {
  return (
    <div className="h-[calc(100vh-73px)] w-full flex items-center justify-center">
        <Loader className=" !w-20 !h-20 !border-[var(--primary)] !border-t-transparent  border-[6px] " />
    </div>
  )
}

export default PageLoading;