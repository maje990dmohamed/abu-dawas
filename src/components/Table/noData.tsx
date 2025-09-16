
// import noData from "../../assets/icons/no-found-data.png"
export const NoData =({message="No Data Found"}:{message?:string})=>{
    return(

        <div className="flex flex-col w-full items-center justify-center h-full gap-4 p-10">
            <img src={''} alt="" />
            <span className="text-[20px] font-bold text-[#071200] ">{message}</span>
        </div>
    )
}