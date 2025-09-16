
const ViewLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="bg-white p-2 sm:p-6 rounded-lg shadow">
        {children}
    </div>
  )
}

export default ViewLayout