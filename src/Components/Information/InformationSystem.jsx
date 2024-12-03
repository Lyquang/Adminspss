import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./TableIn";
import AddPrinterDialog from "./AddPrinter";
import { Button } from "@mui/material";

const InformationSystem = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [printers, setPrinters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrinters = async () => {
      setLoading(true);
      
      setError(null);
      

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token is missing. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/admin/getAllPrinter",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formattedData = response.data.map((printer) => ({
          id: printer.printer_id,
          name: printer.model,
          location: printer.building,
          date: new Date(printer.import_date),
          status: printer.state,
        }));
        setPrinters(formattedData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch printers.");
      } finally {
        setLoading(false);
      }
    };
    fetchPrinters();
  }, []);

  if (loading) {
    return <p>Hệ thống đang tải dữ liệu. Xin vui lòng chờ trong giây lát...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleAddPrinter = (newPrinter) => {
    setPrinters((prevPrinters) => [...prevPrinters, newPrinter]);
    setOpenDialog(false);
  };

  return (
    <>
      <h2 className="header-title">THÔNG TIN HỆ THỐNG</h2>
      <br />
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Thêm máy in
      </Button>
      <AddPrinterDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={handleAddPrinter}
      />
      <DataTable info={printers} />
    </>
  );
};

export default InformationSystem;
