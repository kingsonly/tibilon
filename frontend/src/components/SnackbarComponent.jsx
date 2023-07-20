import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarComponent(props) {
  const { status, show, message } = props;

  return (
    <>
      <Snackbar open={show} autoHideDuration={6000}>
        <Alert severity={status} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
