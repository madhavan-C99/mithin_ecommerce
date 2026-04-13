import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from "@mui/material";

import { useState, useEffect } from "react";

const EditProfileDialog = ({ open, onClose, profile, onSave }) => {

  const [form, setForm] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        email: profile.email || ""
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

      <DialogTitle>Edit Profile</DialogTitle>

      <DialogContent>

        <Box sx={{ mt: 1 }}>

          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />

        </Box>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default EditProfileDialog;