import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import Header from "../../../../Components/Header/Header";
import {
  delete_FieldUser,
  fetch_FieldUserOfCompany,
} from "../../../../lib/store";
import { FaInfoCircle, FaEdit, FaClipboardList } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";


const FieldUserList = () => {
      const { t } = useTranslation(); 
  
  const [isLoading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  console.log("dadsaasd", tableData);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("UserToken");
  const company_id = localStorage.getItem("companyId") || null;
  const navigate = useNavigate();

  const fetchData = () => {
    const response = fetch_FieldUserOfCompany(company_id, token)
      .then((response) => {
        if (response.success === true) {
          setTableData(response.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const tableHeaders = [
    "Full Name & Location",
    "Email Address",
    "Username",
    "Status",
    "Country",
    "Created By",
    "Action",
  ];

  // const tableData = [
  //   {
  //     fullName: (
  //       <div>
  //         <strong>field user 1</strong>
  //         <br />
  //         Sukha enclave
  //       </div>
  //     ),
  //     email: "fielduser1@gmail.com",
  //     username: "fielduser1",
  //     status: (
  //       <Form.Check
  //         type="switch"
  //         id="status-switch"
  //         label="Active"
  //         defaultChecked
  //       />
  //     ),
  //     country: "India",
  //     createdBy: "new user",
  //     action: (
  //       <div className="d-flex gap-2 justify-content-center">
  //         <Button
  //           variant="outline-secondary"
  //           size="sm"
  //           style={{
  //             borderRadius: "50%",
  //             width: "35px",
  //             height: "35px",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <i className="bi bi-info-circle"></i>
  //         </Button>
  //         <Button
  //           variant="warning"
  //           size="sm"
  //           style={{
  //             borderRadius: "50%",
  //             width: "35px",
  //             height: "35px",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <i className="bi bi-pencil"></i>
  //         </Button>
  //         <Button
  //           variant="danger"
  //           size="sm"
  //           style={{
  //             borderRadius: "50%",
  //             width: "35px",
  //             height: "35px",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <i className="bi bi-trash"></i>
  //         </Button>
  //       </div>
  //     ),
  //   },
  // ];
  const handleToPreview = async (row) => {
    navigate("/users/field/list/view", { state: { row } });
  };

  const handleDelete = (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true, // Reverse the order of the buttons (Cancel left, Confirm right)
    }).then((result) => {
      if (result.isConfirmed) {
        delete_FieldUser(id, token).then((result) => {
          if (result.success === true) {
            fetchData();
          } else {
            Swal.fire("Error", result.message, "error");
          }
        });

        Swal.fire("Deleted!", "Your user has been deleted.", "success");
      }
    });
  };

  const handleEdit = (row) => {
    navigate("/users/field/edit", { state: { row } });
  };

  const filteredtable = tableData.filter(
    (tableData) =>
      tableData.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tableData.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClear = () => {
    setSearchQuery("");
  };
  console.log("filterDataa", filteredtable);

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <div
            className="border p-4 rounded"
            style={{
              backgroundColor: "#f9f9f9",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">{t("Field User List")}</h4>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder={t("Search...")}
                  className="me-2"
                  style={{ width: "200px" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="secondary" onClick={handleClear}>
                  {t("Clear")}
                </Button>
              </div>
            </div>
            <Table hover responsive className="align-middle">
              <thead>
                <tr style={{ backgroundColor: "#E7EAF3", color: "#3C3C3C" }}>
                  {tableHeaders.map((header, index) => (
                    <th
                      key={index}
                      style={{
                        textAlign: "left",
                        padding: "15px",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        color: "black",
                        background: "#e5e5e5",
                      }}
                    >
                      {t(header)}
                    </th>
                  ))}
                </tr>
              </thead>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <BeatLoader
                      size={12}
                      color={"#3C3C3C"}
                      style={{ display: "flex", justifyContent: "center" }}
                    />
                    <p className="mt-2">{t("Loading...")}</p>
                  </td>
                </tr>
              ) : (
                <>
                  <tbody>
                    {filteredtable.length > 0 ? (
                      filteredtable.map((row, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <td
                            style={{
                              textAlign: "left",
                              padding: "15px",
                              fontSize: "0.9rem",
                              color: "#4B5563",
                            }}
                          >
                            <div>
                              <strong>{row.name}</strong>
                              <br />
                              {row.address}
                            </div>
                          </td>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "15px",
                              fontSize: "0.9rem",
                              color: "#4B5563",
                            }}
                          >
                            {row.email}
                          </td>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "15px",
                              fontSize: "0.9rem",
                              color: "#4B5563",
                            }}
                          >
                            {row.username}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              padding: "15px",
                              fontSize: "0.9rem",
                              color: "#4B5563",
                            }}
                          >
                            <Form.Check
                              type="switch"
                              id="status-switch"
                              label={row.isActive == 1 ? "Active" : "Unactive"}
                              checked={
                                row.isActive == 1 ? "Active" : "Unactive"
                              }
                            />
                          </td>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "15px",
                              fontSize: "0.9rem",
                              color: "#4B5563",
                            }}
                          >
                            {row.country}
                          </td>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "15px",
                              fontSize: "0.9rem",
                              color: "#4B5563",
                            }}
                          >
                            {row.created_by}
                          </td>
                          <td style={{ textAlign: "center", padding: "15px" }}>
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
                                onClick={() => handleToPreview(row)}
                              >
                                <i className="bi bi-info-circle"></i>
                                <FaInfoCircle />
                              </Button>
                              <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleEdit(row)}
                                style={{
                                  borderRadius: "50%",
                                  width: "35px",
                                  height: "35px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <i className="bi bi-pencil"></i>
                                <FaEdit />
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(row.id)}
                                style={{
                                  borderRadius: "50%",
                                  width: "35px",
                                  height: "35px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <i className="bi bi-trash"></i>
                                <FaClipboardList />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-5">
                          {t("No data found")}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </>
              )}
            </Table>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span>{t("Showing 1 to 1 of 1 items")}</span>
              <div>
                <Button variant="light" className="me-1" disabled>
                  &laquo;
                </Button>
                <Button variant="light" disabled>
                  &raquo;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FieldUserList;
