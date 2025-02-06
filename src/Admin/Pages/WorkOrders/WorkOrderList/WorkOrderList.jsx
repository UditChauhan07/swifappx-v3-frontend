import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import Header from "../../../../Components/Header/Header";
import {
  delete_FieldUser,
  fetch_FieldUserOfCompany,
  fetchWorkOrderList,
  workOrderDeleteApi,
} from "../../../../lib/store";
import { FaInfoCircle, FaEdit, FaClipboardList } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const WorkOrderList = () => {
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  console.log("tabledata", tableData);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("UserToken");
  const company_id = localStorage.getItem("companyId") || null;
  const navigate = useNavigate();

  const fetchData = () => {
    const response = fetchWorkOrderList(company_id, token)
      .then((response) => {
        if (response.success === true) {
          setTableData(response?.workOrders);
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
    "Work Order Num",
    "Date & Time",
    "Custome Name & Address",
    "Work Item Name",
    "Status",
    "Worker Name",
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
  const handleToPreview = async (workOrder) => {
    navigate("/workorder/list/details", { state: { workOrder } });
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
        workOrderDeleteApi(id, token).then((result) => {
          if (result.status === true) {
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
    navigate("/workorder/list/edit", { state: { row } });
  };

  // const filteredtable = tableData.filter(
  //   (tableData) =>
  //     tableData.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     tableData.email.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const handleClear = () => {
    setSearchQuery("");
  };
  // console.log("filterDataa", filteredtable);

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
              <h4 className="mb-0">{t("Work Order List")}</h4>
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
                    {tableData.length > 0 ? (
                      tableData.map((row, index) => (
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
                              {/* <strong>{row.name}</strong> */}
                              {row.id}
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
                            {row.basicWorkorderDetails.startDate} &{" "}
                            {row.basicWorkorderDetails.startTime}
                          </td>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "15px",
                              fontSize: "0.9rem",
                              color: "#4B5563",
                            }}
                          >
                            {row.customerDetailSection.CustomerName} , `[
                            {row.customerDetailSection.CustomerAddress}]`
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              padding: "15px",
                              fontSize: "0.9rem",
                              color: "#4B5563",
                            }}
                            title={row.workorderDetails
                              .map((item) => item.workItem)
                              .join(", ")} 
                          >
                            {row.workorderDetails
                              .slice(0, 2)
                              .map((item, index) => (
                                <span key={index}>
                                  {item.workItem}
                                  {index < 1 && row.workorderDetails.length > 2
                                    ? ", ..."
                                    : ""}
                                </span>
                              ))}
                          </td>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "15px",
                              fontSize: "0.9rem",
                              color: "#4B5563",
                            }}
                          >
                            {row.status}
                          </td>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "15px",
                              fontSize: "0.9rem",
                              color: "#4B5563",
                            }}
                          >
                            {row.basicWorkorderDetails.WorkerName}
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
                              {/* <Button
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
                              </Button> */}
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
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </>
              )}
            </Table>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span>Showing 1 to 1 of 1 items</span>
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

export default WorkOrderList;
