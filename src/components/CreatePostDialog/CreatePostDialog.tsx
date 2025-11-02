import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import type { CreatePostDialogProps } from "./CreatePostDialog.types";

export default function CreatePostDialog({
  open,
  onClose,
  onCreate,
  loading = false,
}: CreatePostDialogProps) {
  const [form, setForm] = useState({ title: "", body: "", userId: 1 });
  const [errors, setErrors] = useState({
    title: false,
    body: false,
    userId: false,
  });

  const handleChange = (field: string, value: string | number) => {
    if (field === "userId" && typeof value === "number" && value < 0) return;
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: false });
  };

  const handleSubmit = () => {
    const newErrors = {
      title: !form.title.trim(),
      body: !form.body.trim(),
      userId: form.userId <= 0,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    onCreate(form);
    setForm({ title: "", body: "", userId: 1 });
  };
  const isDisabled =
    !form.title.trim() || !form.body.trim() || form.userId <= 0;

  return (
    <Dialog open={open} onClose={onClose} fullWidth disableScrollLock>
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Title"
          required
          error={errors.title}
          helperText={errors.title ? "This field is required" : ""}
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Body"
          multiline
          minRows={3}
          required
          error={errors.body}
          helperText={errors.body ? "This field is required" : ""}
          value={form.body}
          onChange={(e) => handleChange("body", e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="User ID"
          type="number"
          required
          error={errors.userId}
          helperText={errors.userId ? "Enter a valid positive number" : ""}
          value={form.userId}
          onChange={(e) => handleChange("userId", Number(e.target.value))}
          inputProps={{ min: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleSubmit}
          loading={loading}
          disabled={isDisabled || loading}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
