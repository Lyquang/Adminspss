import React, { useEffect, useState } from "react";
import "./Overal.scss";
import axios from "axios";
import Background from "../images/bg.png"

const Overal = () => {
  const [numOfPrinter, setNumOfPrinter] = useState(null);
  const [numOfStudent, setNumOfStudent] = useState(null);
  const [numOfRequest0, setNumOfRequest0] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token is missing. Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:8080/admin/getOverall", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setNumOfPrinter(data.numOfPrinter);
        setNumOfStudent(data.numOfStudent);
        setNumOfRequest0(data.numOfRequest0);

        console.log("pass overall");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="frame">
      {/* Card 1 */}
      <div className="card">
        <div className="content">
          <div className="text">
            <div className="text2">Tổng số máy in</div>
          </div>
        </div>
        <div className="content2">
          <div className="text3">
            <strong>
              <div className="text4">{numOfPrinter !== null ? numOfPrinter : "Loading..."}</div>
            </strong>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card2">
        <div className="content">
          <div className="text">
            <div className="text6">Tổng số sinh viên</div>
          </div>
        </div>
        <div className="content2">
          <div className="text3">
            <strong>
              <div className="text7">{numOfStudent !== null ? numOfStudent : "Loading..."}</div>
            </strong>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="card">
        <div className="content">
          <div className="text">
            <div className="text2">Số yêu cầu chưa duyệt</div>
          </div>
        </div>
        <div className="content2">
          <div className="text3">
            <strong>
              <div className="text4">{numOfRequest0 !== null ? numOfRequest0 : "Loading..."}</div>
            </strong>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Overal;
