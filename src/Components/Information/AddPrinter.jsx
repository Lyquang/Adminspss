import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const AddPrinterDialog = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = async () => {
    if (!name || !location || !date) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    const newPrinter = {
      id: Date.now().toString(),
      name,
      location,
      date: new Date(date),
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/admin/insertNewPrinter",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            building: location,
            model: name,
            importDateString: date,
          },
        }
      );
      if (response.status === 200) {
        alert("Thêm máy in thành công!");
        onAdd(newPrinter);
        onClose();
      } else {
        alert("Thêm máy in thất bại!");
      }
    } catch (error) {
      console.error("Error adding printer:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm máy in</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Tên máy"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Địa điểm"
          fullWidth
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Ngày hoạt động"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleAdd}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPrinterDialog;
