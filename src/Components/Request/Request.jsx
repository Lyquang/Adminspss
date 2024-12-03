import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./Request.scss";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {

        const token = localStorage.getItem("token");
        
        if(! token){
          console.error("Token is missing. please log in");
        }

        

        const response = await axios.get("http://localhost:8080/admin/getAllPrintRequest", {
          headers : {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi lấy các yêu cầu in !!!");
        setLoading(false);
      }
    };
  
    fetchRequests();
  }, []);

  
  const handleAccept = async (index) => {
    const request = requests[index];
  
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token is missing. Please log in.");
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:8080/admin/acceptPrintRequest?orderNum=${request.order_num}&file_id=${request.file_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        // Update the status in the UI
        const updatedRequests = [...requests];
        updatedRequests[index].statuss = 2; // Status "accepted"
        setRequests(updatedRequests);
  
        console.log("Accepted request successfully:", response.data);
  
        // Download the file
        const downloadResponse = await axios.get(
          `http://localhost:8080/admin/downloadFile/${request.file_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob", // Ensure binary data
          }
        );
  
        // Create a download link
        const blob = new Blob([downloadResponse.data], {
          type: downloadResponse.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${request.file_name}`); // Use the file name from the request
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url); // Clean up URL object
      }
    } catch (error) {
      console.error("Error accepting request:", error.response?.data || error.message);
    }
  };
  
  
  
  const handleReject = async (index) => {
    const request = requests[index];

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token is missing. Please log in.");
      return;
    }
  
  
    try {
      const response = await axios.put(
        `http://localhost:8080/admin/refusePrintRequest?order_num=${request.order_num}&file_id=${request.file_id}`,
        {},
        {
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      if (response.status === 200) {
        const updatedRequests = [...requests];
        updatedRequests[index].statuss = 1; // Update status to "rejected"
        setRequests(updatedRequests);
        console.log("Rejected request successfully:", response.data);
      }
    } catch (error) {
      console.error(
        "Error rejecting request:",
        error.response?.data || error.message
      );
    }
  };
  

  if (loading) return <div>Hệ thống đang tải dữ liệu. Vui lòng chờ trong giây lát...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="request-container">
      <h1>Yêu cầu in ấn</h1>

      <div className="request-boxes">
        {requests.map((request, index) => (
          <div className="request-box" key={index}>
            <div className="request-content">
              <p>
                Sinh viên có ID <strong>{request.id}</strong> yêu cầu in file{" "}
                <strong>{request.file_name}</strong> có độ dài là{" "}
                <strong>{request.nb_of_page_used} trang</strong> từ máy in có ID{" "}
                <strong>{request.print_id}</strong> vào ngày{" "}
                <strong>{request.print_date}</strong>.
              </p>

              {request.statuss === 0 ? (
                // Chờ xét duyệt
                <div className="buttons">
                  <button className="accept-btn" onClick={() => handleAccept(index)}>
                    Chấp nhận và tải xuống
                  </button>
                  <button className="reject-btn" onClick={() => handleReject(index)}>
                    Từ chối
                  </button>
                </div>
              ) : request.statuss === 1 ? (
                // Đã từ chối
                <div className="status">
                  <FaTimes color="red" /> Đã từ chối
                </div>
              ) : request.statuss === 2 ? (
                // Đã chấp nhận
                <div className="buttons">
                  <FaCheck color="green" />  Đã tải xuống 
                </div>
                
                
              ) : (
                // Trường hợp không xác định (nếu có)
                <div className="status">Không xác định</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
