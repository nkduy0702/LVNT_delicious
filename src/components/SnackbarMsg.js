import React, { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";

function SnackbarMsg(props) {
  const [toastMsg, setToastMsg] = useState("");
  const [openToast, setOpenToast] = useState(false);

  useEffect(() => {
    setOpenToast(props.isOpen);
    setToastMsg(props.msg);
  }, [props.isOpen, props.msg]); // Đặt props.isOpen và props.msg vào mảng phụ thuộc

  return (
    <div>
      <Snackbar
        open={openToast}
        autoHideDuration={2000}
        onClose={() => setOpenToast(false)}
        message={toastMsg}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
}

export default SnackbarMsg;
