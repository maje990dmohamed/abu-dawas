import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { IoClose } from "react-icons/io5";
// import { IoMdCloseCircleOutline } from "react-icons/io";

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string | null;
}

export default function ImageModal({
  open,
  onClose,
  imageUrl,
}: ImageModalProps) {
  if (!imageUrl) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.7)",
            },
          }}
          aria-label="close"
        >
          <IoClose size={30} />
        </IconButton>

        <img
          src={imageUrl}
          className="object-contain"
          alt="Preview"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "90vh",
            borderRadius: 8,
            display: "block",
          }}
        />
      </Box>
    </Dialog>
  );
}
