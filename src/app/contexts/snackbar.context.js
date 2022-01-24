import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

const SnackbarContext = React.createContext();

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  useEffect(() => {}, []);

  function showSnackbar(message, severity) {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setSeverity("success");
    setMessage("");
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  const value = {
    showSnackbar,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={severity} onClose={handleClose} action={action}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
