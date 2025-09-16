import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { CgEye } from "react-icons/cg";
import upload_icon from "../../../assets/icons/feather_upload-cloud.svg";
import delete_icon from "../../../assets/icons/material-symbols_delete.svg";
import Button from "../Button";
import ImageModal from "./ImageModal";
import { ErrorTooltip } from "./ValidationToolTip";

export interface UploadedImage {
  file: File;
  url: any;
}

interface ImageInputProps {
  error?: string;
  label: string;
  isRequired?: boolean;
  image: string | UploadedImage | null;
  setImage?: (val: string | UploadedImage | null) => void;
  disabled?: boolean
  isView?: boolean
}

function ImageInput({
  error,
  label,
  isRequired = false,
  image,
  setImage,
  disabled = false,
  isView
}: ImageInputProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const newImage: UploadedImage = {
      file,
      url: URL.createObjectURL(file),
    };
    if (setImage)
      setImage(newImage);
  };
  const previewUrl =
    image && typeof image !== "string" ? image.url : image ?? null;

  return (
    <ErrorTooltip title={error ? error : ""}>
      <div className="flex flex-col">
        <h1 className="xl:text-[20px] lg:text-[16px] flex font-[500] my-1 text-[#071200] text-left ms-1">
          {label || "تاريخ الميلاد"} :{" "}
          <span className="text-[#E33629] ms-2">{isRequired ? "*" : ""}</span>
        </h1>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            border: error ? "1px dashed red" : "1px dashed var(--secondary)",
            borderRadius: 2,
            p: 2,
            height: "53px",
            width: "full",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={("uploaded")}
                className="w-[24px] h-[24px]"
              />
            ) : (
              <img src={upload_icon} className="w-[24px] h-[24px]" />
            )}
            <Box>
              <Typography fontWeight="400" fontSize="16px">
                اضف صورة
              </Typography>
              <Typography variant="body2" color="text.secondary" className="!text-xs !max-md:text-sm">
                JPG أو PNG، حجم الملف لا يزيد عن 10 ميجابايت
              </Typography>
            </Box>
          </Box>

          <div className="flex items-center justify-center">
            {/* <div className="border border-[#0096FF] text-[#0096FF] px-2 min-w-[102px] h-[35px] flex items-center justify-center rounded-md cursor-pointer relative"> */}

            {
              !isView && <Button variant="secondary" className={`relative text-[14px] cursor-pointer min-w-[102px] h-[35px] ${disabled ? " pointer-events-none  " : ""}`} >
                <span className="font-[400]  cursor-pointer text-[var(--primary)] ">{("اختر ملفًا")}</span>
                <input
                  type="file"
                  accept=".jpeg,.png,.jpg"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer z-0"
                />
              </Button>
            }

            {/* </div> */}
            {image && (
              <div className="flex justify-center items-center">
                {
                  !isView && <img
                    onClick={() => setImage && setImage("")}
                    src={delete_icon}
                    alt={("delete_icon")}
                    className="ms-3 cursor-pointer"
                  />
                }
                <CgEye className=" text-[var(--secondary)] cursor-pointer" onClick={() => setOpen(true)} />
              </div>
            )}
          </div>
        </Box>
      </div>
      <ImageModal
        open={open}
        onClose={() => setOpen(false)}
        imageUrl={previewUrl || image}
      />
    </ErrorTooltip>
  );
}

export default ImageInput;
