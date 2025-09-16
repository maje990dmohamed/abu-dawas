import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"
import Button from "./Button"
import Title from "./Title"


type PageHeaderType = { 
    title : string
    isBackButton?:boolean
    className?:string
}
const PageHeader = ({title, isBackButton=true, className}: PageHeaderType ) => {
    const navigate = useNavigate();
  return (
    <div className={` w-full flex items-center justify-between ${className}`}>
        <Title title={title} />
        {
            isBackButton && 
            <Button variant="secondary" className=" flex items-center justify-center gap-1" onClick={() => {navigate(-1)}} >
                رجوع
                <ArrowLeft size={20} className=" mt-0.5" />
            </Button>
        }
    </div>
  )
}

export default PageHeader