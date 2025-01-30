import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import Header from "../../../../Components/Header/Header";
import { getCustomerList } from "../../../../lib/store"; 
import { IoIosInformationCircle } from "react-icons/io";
import { FaAddressBook } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setuserId] = useState(localStorage.getItem("userId"));
  const [token, settoken] = useState(localStorage.getItem("UserToken"));
  const rowsPerPage = 4;

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        const response = await getCustomerList(userId, token); // Fetch customers from API
        console.log("resss", response);
        setCustomers(response?.customers || []);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Handle pagination
  const handlePageChange = (direction) => {
    if (
      direction === "next" &&
      currentPage * rowsPerPage < filteredCustomers.length
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCustomers.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Customer List</h4>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Search customers..."
                className="me-2"
                style={{ width: "200px" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary">
                <i className="bi bi-search"></i>
              </Button>
            </div>
          </div>

          <Table
            hover
            responsive
            className="align-middle"
            style={{ minWidth: "1000px" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#E7EAF3", color: "#3C3C3C" }}>
                <th
                  style={{
                    width: "22%",
                    textAlign: "left",
                    background: "#e5e5e5",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    width: "15%",
                    textAlign: "left",
                    background: "#e5e5e5",
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    width: "30%",
                    textAlign: "left",
                    background: "#e5e5e5",
                  }}
                >
                  Email Address
                </th>
                <th
                  style={{
                    width: "15%",
                    textAlign: "left",
                    background: "#e5e5e5",
                  }}
                >
                  Created By
                </th>
                <th
                  className="text-center"
                  style={{ width: "20%", background: "#e5e5e5" }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <BeatLoader
                      size={12}
                      color={"#3C3C3C"}
                      style={{ display: "flex", justifyContent: "center" }}
                    />
                    <p className="mt-2">Loading...</p>
                  </td>
                </tr>
              ) : currentRows.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No customers found.
                  </td>
                </tr>
              ) : (
                currentRows.map((customer, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        textAlign: "left",
                        // padding: "15px",
                        fontSize: "0.9rem",
                        color: "#4B5563",
                      }}
                    >
                      {customer.name}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        // padding: "15px",
                        fontSize: "0.9rem",
                        color: "#4B5563",
                      }}
                    >
                      {customer.type}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        // padding: "15px",
                        fontSize: "0.9rem",
                        color: "#4B5563",
                      }}
                    >
                      {customer.email}
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        // padding: "15px",
                        fontSize: "0.9rem",
                        color: "#4B5563",
                      }}
                    >
                      {customer.created_by
                        ? customer.created_by.charAt(0).toUpperCase() +
                          customer.created_by.slice(1)
                        : ""}
                    </td>
                    <td className="text-center">
                      <div className="d-flex gap-2 justify-content-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          style={{
                            borderRadius: "50%",
                            width: "35px",
                            height: "35px",
                          }}
                        >
                          <IoIosInformationCircle />
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          style={{
                            borderRadius: "50%",
                            width: "35px",
                            height: "35px",
                          }}
                        >
                          <FaUserEdit />
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          style={{
                            borderRadius: "50%",
                            width: "35px",
                            height: "35px",
                          }}
                        >
                          <FaAddressBook />
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          style={{
                            borderRadius: "50%",
                            width: "35px",
                            height: "35px",
                          }}
                        >
                          <MdDelete />
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
              disabled={currentPage * rowsPerPage >= filteredCustomers.length}
            >
              Next &raquo;
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerList;
