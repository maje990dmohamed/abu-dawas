import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { collection, doc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import Loader from "../common/Loader";
import deleteICON from "../../assets/icons/deleteModel.svg"

type DeleteDialogProps = {
  title: string;
  subTitle: string;
  deleteTitleAfterAccept: string;
  open: boolean;
  selectedID: any;
  setOpen: () => void;
  filterAfter:(data:string[])=> void
  collectionName: any
};

const DeleteDialog = ({
  title,
  subTitle,
  open,
  setOpen,
  deleteTitleAfterAccept,
  selectedID,
  filterAfter,
  collectionName
}: DeleteDialogProps) => {

  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    if (!selectedID || selectedID.length === 0) return;
    setLoading(true);
    try {
      const collRef = collection(db, collectionName);
      const batch = writeBatch(db);

      for (const idNumber of selectedID) {
        const q = query(collRef, where("idNumber", "==", idNumber));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((docSnap) => {
          batch.delete(doc(db, collectionName, docSnap.id));
        });
      }

      await batch.commit();
      filterAfter(selectedID)
      toast.success(deleteTitleAfterAccept)
      setOpen();
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف!")
    } finally {
      setLoading(false);
    }
  };

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
            src={deleteICON}
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
              {title}
            </Typography>
            {(
              <Typography variant="body1" color="#8D8D8D" width={250}>
                {subTitle}
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
          onClick={onConfirm}
          disabled={loading}
        >
          {!loading ? ("تأكيد") : <div className="!py-1.5">
            <Loader className="" />
          </div> }
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
          disabled={loading}
          className="!capitalize"
        >
          {("الغاء")}
        </Button>
      </DialogActions>}
    </Dialog>
  );
};

export default DeleteDialog;
