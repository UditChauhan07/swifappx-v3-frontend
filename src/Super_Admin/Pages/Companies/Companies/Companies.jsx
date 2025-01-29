import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaInfoCircle, FaEdit, FaClipboardList } from "react-icons/fa";
import Header from "../../../../Components/Header/Header";
import { getCompanyListApi } from "../../../../lib/store";
import { BeatLoader } from "react-spinners";

const Companies = () => {
  const [companyList, setCompanyList] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("UserToken"));
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  console.log("Loadingg", isLoading);
  const rowsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCompanyListApi(token);
        if (response.success === true) {
          setCompanyList(response.data || []);
          console.log("ress", response);
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Handle page change (next/previous)
  const handlePageChange = (direction) => {
    if (
      direction === "next" &&
      currentPage * rowsPerPage < companyList.length
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get current rows to display based on pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = companyList.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <h2 className="mb-4">Companies</h2>
          <div className="">
            <Table
              hover
              responsive
              className="align-middle "
              style={{ minWidth: "1650px",  }}
            >
              <thead>
                <tr style={{ backgroundColor: "#E7EAF3", color: "#3C3C3C" }}>
                  <th
                    style={{
                      width: "26%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    Company Name & Address
                  </th>
                  <th
                    style={{
                      width: "20%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    Admin
                  </th>
                  <th
                    style={{
                      width: "10%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    Creation
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "7%", background: "#e5e5e5" }}
                  >
                    Field Users
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "7%", background: "#e5e5e5" }}
                  >
                    Office Users
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "7%", background: "#e5e5e5" }}
                  >
                    Customers
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "7%", background: "#e5e5e5" }}
                  >
                    Quotations
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "7%", background: "#e5e5e5" }}
                  >
                    Contracts
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "10%", background: "#e5e5e5" }}
                  >
                    Work Orders
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "10%", background: "#e5e5e5" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="10" className="text-center py-5">
                      <BeatLoader size={12} color={"#3C3C3C"} style={{
                        display:"flex",
                        justifyContent:"center"
                      }} />
                      <p className="mt-2">Loading...</p>
                    </td>
                  </tr>
                ) : (
                  currentRows.map((item, index) => (
                    <tr
                      key={index}
                      style={{ backgroundColor: "#fff", borderRadius: "10px" }}
                    >
                      <td
                        style={{
                          textAlign: "left",
                          padding: "15px",
                          fontSize: "0.9rem",
                          color: "#4B5563",
                        }}
                      >
                        <strong>{item.company_name}</strong>
                        <br />
                        <span style={{ color: "gray", fontSize: "0.9rem" }}>
                          {item.address_line_1},{item.address_line_2},
                          {item.city},{item.zip_postal_code}
                        </span>
                      </td>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "15px",
                          fontSize: "0.9rem",
                          color: "#4B5563",
                        }}
                      >
                        {item.adminName || "null"} [
                        {item.adminContact || "null"},{" "}
                        {item.adminEmail || "null"}]
                      </td>

                      <td
                        style={{
                          textAlign: "left",
                          padding: "15px",
                          fontSize: "0.9rem",
                          color: "#4B5563",
                        }}
                      >
                        28, Jan 2025
                      </td>
                      <td className="text-center">0</td>
                      <td className="text-center">0</td>
                      <td className="text-center">0</td>
                      <td className="text-center">0</td>
                      <td className="text-center">0</td>
                      <td className="text-center">0</td>
                      <td className="text-center">
                        <div className="d-flex gap-2 justify-content-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            style={{
                              borderRadius: "50%",
                              width: "35px",
                              height: "35px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaInfoCircle />
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            style={{
                              borderRadius: "50%",
                              width: "35px",
                              height: "35px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="success"
                            size="sm"
                            style={{
                              borderRadius: "50%",
                              width: "35px",
                              height: "35px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaClipboardList />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end mt-3">
              <Button
                variant="outline-secondary"
                size="sm"
                className="me-2"
                onClick={() => handlePageChange("previous")}
                disabled={currentPage === 1}
              >
                &laquo; Previous
              </Button>
              <Button variant="outline-secondary" size="sm" className="me-2">
                {currentPage}
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handlePageChange("next")}
                disabled={currentPage * rowsPerPage >= companyList.length}
              >
                Next &raquo;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;
