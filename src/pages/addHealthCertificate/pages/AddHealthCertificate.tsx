import DateInput from "../../../components/inputs/DateInput/DateInput";
import ImageInput from "../../../components/inputs/ImageInput/ImageInput";
import InputWithIcon from "../../../components/inputs/InputWithIcon/InputWithIcon";
import SelectMenu from "../../../components/inputs/SelectMenu/SelectMenu";

const AddHealthCertificate = () => {
  const ops = [
    {id: 1, name : "Male"},
    {id: 2, name : "Female"}
  ]
  return (
    <div className=" w-full  text-black">
        <ImageInput image={''}  label="Image" setImage={() => {}} error="" />
        <InputWithIcon icon="" value={""} label="lol"  />
        <DateInput onChange={() => {}}  value={""}  />
          <SelectMenu options={ops} label="Choose Gender" />
    </div>
  )
}

export default AddHealthCertificate;