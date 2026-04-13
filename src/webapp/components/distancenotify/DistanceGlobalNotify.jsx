import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeNotification } from "../../store/DistanceNotifySlice";

const DistanceGlobalNotify = () => {

  const dispatch = useDispatch();

//   const { open, message, severity } =
//     useSelector((state) => state.distanceNotify);

const notify = useSelector((state) => state.distanceNotify) || {};
const { open = false, message = "", severity = "info" } = notify;

  const handleClose = () => {
    dispatch(closeNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default DistanceGlobalNotify;