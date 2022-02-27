import { Alert } from "@mui/material";

const AlertMessage = ({ handleClose, severity, message }) => {
  return (
    <Alert onClose={handleClose} severity={severity} variant="standard">
      {message}
    </Alert>
  );
};

export default AlertMessage;
