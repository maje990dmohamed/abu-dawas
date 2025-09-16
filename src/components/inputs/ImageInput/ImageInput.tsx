import { Box, Typography } from "@mui/material";
import upload_icon from "../../../assets/icons/feather_upload-cloud.svg";
import delete_icon from "../../../assets/icons/material-symbols_delete.svg";
import eye_icon from "../../../assets/icons/mdi_show.svg";
import { useState } from "react";
import ImageModal from "../../Modals/ImageModal";
import { ErrorTooltip } from "../../ui/ValidationToolTip";
import Button from "../Button";

export interface UploadedImage {
  file: File;
  url: any;
}

interface ImageInputProps {
  error?: string;
  label: string;
  isRequired?: boolean;
  image: string | UploadedImage | null;
  setImage: (val: string | UploadedImage | null) => void;
}

function ImageInput({
  error,
  label,
  isRequired = false,
  image,
  setImage,
}: ImageInputProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const newImage: UploadedImage = {
      file,
      url: URL.createObjectURL(file),
    };

    setImage(newImage);
  };
  const previewUrl =
    image && typeof image !== "string" ? image.url : image ?? null;

  return (
    <ErrorTooltip title={error ? error : ""}>
      <div className="flex flex-col">
        <label className="text-[20px] ms-1 font-[500] mb-2">
          {label} :
          {isRequired && (
            <span className="text-red-500 ps-2 text-[20px] font-[500]">*</span>
          )}
        </label>

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
                Attach Image
              </Typography>
              <Typography variant="body2" color="text.secondary">
                JPG or PNG, file size no more than 10MB
              </Typography>
            </Box>
          </Box>

          <div className="flex items-center justify-center">
            {/* <div className="border border-[#0096FF] text-[#0096FF] px-2 min-w-[102px] h-[35px] flex items-center justify-center rounded-md cursor-pointer relative"> */}
              <Button variant="secondary" className="relative text-[14px] cursor-pointer min-w-[102px] h-[35px]" >
                <span className="font-[400]  cursor-pointer text-[var(--primary)]">{("Select file")}</span>
                <input
                  type="file"
                  accept=".jpeg,.png,.jpg"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </Button>
            {/* </div> */}
            {image && (
              <div className="flex justify-center items-center">
                <img
                  onClick={() => setImage(null)}
                  src={delete_icon}
                  alt={("delete_icon")}
                  className="ms-3 cursor-pointer"
                />
                <img
                  onClick={() => setOpen(true)}
                  src={eye_icon}
                  alt={("eye_icon")}
                  className="ms-3 cursor-pointer"
                />
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
