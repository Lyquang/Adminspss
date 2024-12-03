import React, { useEffect, useState } from "react";
import TableHi from "./TableHi";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token is missing. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/admin/getAllPrintRequest",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        const format = response.data.map((his) => ({
          date: new Date(his.print_date),
          mssv: his.id,
          id: his.print_id,
          location: his.building,
          file_name: his.file_name,
          pageNum: his.nb_of_page_used,
          status: his.statuss,
        }));
        setHistory(format);
      } catch (err) {
        setError("Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <p>Hệ thống đang tải dữ liệu. Xin vui lòng chờ trong giây lát...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h2 className="header-title">LỊCH SỬ HỆ THỐNG</h2>
      <br />
      <TableHi hi={history}/>
    </>
  );
};

export default History;
