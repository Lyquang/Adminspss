import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./pageSetting.css";

function PageSetting() {
  const [sem, setSem] = useState("");
  const [defaultPageCount, setDefaultPageCount] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    if (!sem || !defaultPageCount) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/admin/new",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            semester: sem,
            numOfPaperDefault: defaultPageCount,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        alert("Hiệu chỉnh trang in thành công!");
      } else {
        alert("Hiệu chỉnh trang in thất bại!");
      }
    } catch (error) {
      console.error("Error adding page setting:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  return (
    <>
    <h2 className="header-title">HIỆU CHỈNH TRANG IN</h2>
    <br />
    <div className="form-container">   
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="outlined-required"
          label="Học kỳ"
          className="text-field"
          value={sem}
          onChange={(e) => setSem(e.target.value)}
        />
        <TextField
          id="standard-number"
          label="Số trang in mặc định"
          type="number"
          InputLabelProps={{ shrink: true }}
          className="text-field"
          value={defaultPageCount}
          onChange={(e) => setDefaultPageCount(e.target.value)}
        />
        <button type="submit" className="submit-button">
          HIỆU CHỈNH
        </button>
      </Box>
    </div>
    </>
   
  );
}

export default PageSetting;
