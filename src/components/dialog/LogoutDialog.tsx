import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Typography,
} from "@mui/material";

import logoutLogo from "../../../src/assets/icons/deleteModel.svg"

type DeleteDialogProps = {
  open: boolean;
  setOpen: () => void;
logout:() => void 
};

const LogoutDialog = ({
  open,
  setOpen,
  logout
}: DeleteDialogProps) => {
    
  return (
    <Dialog
      open={open}
      onClose={setOpen}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: 2,
          minWidth: 400,
          backgroundColor: "#FFF3F3" ,
        },
      }}
    >
      <DialogContent>
        <Box display="flex" gap={2}>
          <img
            src={logoutLogo}
            alt="delete"
            width={60}
            height={60}
          />

          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="#E85D5D"
              gutterBottom
            >
              تسجيل الخروج
            </Typography>
            {(
              <Typography variant="body1" color="#8D8D8D" width={250}>
                هل أنت متأكد من تسجيل الخروج؟
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>

      {<DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#e0e0e0",
            color: "#00000061",
            px: 4,
            borderRadius: "8px",
            width: 140,
          }}
          className="!capitalize"
          onClick={logout}
        >
          {("تأكيد")}
        </Button>
        <Button
          variant="contained"
          onClick={setOpen}
          sx={{
            backgroundColor: "#E85D5D",
            "&:hover": { backgroundColor: "#d32f2f" },
            px: 4,
            borderRadius: "8px",
            width: 140,
          }}
          className="!capitalize"
        >
          {("الغاء")}
        </Button>
      </DialogActions>}
    </Dialog>
  );
};

export default LogoutDialog;
