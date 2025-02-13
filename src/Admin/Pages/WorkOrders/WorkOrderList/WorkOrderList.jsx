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
import { usePermissions } from "../../../../context/PermissionContext";

const WorkOrderList = () => {
  const { hasPermission } = usePermissions();
  const userRole = localStorage.getItem("Role");
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("UserToken");
  const company_id = localStorage.getItem("companyId") || null;
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = () => {
    fetchWorkOrderList(company_id, token)
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

  const filteredtable = tableData.filter((row) => {
    const idMatch = row.id
      .toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const customerMatch =
      row.customerDetailSection?.CustomerName?.toLowerCase().includes(
        searchQuery.toLowerCase()
      );
    const statusMatch = row.status
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const workerMatch =
      row.basicWorkorderDetails?.WorkerName?.toLowerCase().includes(
        searchQuery.toLowerCase()
      );
    const workItemMatch = row.workorderDetails
      .map((item) => item.workItem)
      .join(", ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return (
      idMatch || customerMatch || statusMatch || workerMatch || workItemMatch
    );
  });

  console.log("dasdasd", filteredtable);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredtable.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredtable.length / itemsPerPage);

  const handleToPreview = async (workOrder) => {
    navigate("/workorder/list/details", { state: { workOrder } });
  };

  const handleDelete = async (id) => {
    // Show confirmation modal
    const confirmResult = await Swal.fire({
      title: t("Are you sure?"),
      text: t("You won't be able to revert this!"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("Yes, delete it!"),
      cancelButtonText: t("Cancel"),
      reverseButtons: true,
    });

    if (confirmResult.isConfirmed) {
      try {
        // Show loading modal
        Swal.fire({
          title: t("Deleting..."),
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Call the delete API
        const apiResult = await workOrderDeleteApi(id, token, company_id);

        // Close the loading modal
        Swal.close();

        if (apiResult.status === true) {
          // Show success message
          await Swal.fire(
            t("Deleted!"),
            t("Your work order has been deleted."),
            "success"
          );
          setTableData((prevList) =>
            prevList.filter((order) => order.id !== id)
          );
        } else {
          // Show error message from API
          await Swal.fire("Error", apiResult.message, "error");
        }
      } catch (error) {
        // Close loading modal and show generic error
        Swal.close();
        await Swal.fire("Error", t("An unexpected error occurred."), "error");
      }
    }
  };

  const handleEdit = (row) => {
    navigate("/workorder/list/edit", { state: { row } });
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableHeaders = [
    "Work Order Num",
    "Date & Time",
    "Customer Name",
    "Work Item Name",
    "Status",
    "Worker Name",
    "Action",
  ];

  const convertToISOFormatIfNeeded = (dateString) => {
    // Regular expression to match DD-MM-YYYY format
    const regex = /^\d{2}-\d{2}-\d{4}$/;

    // Check if the input matches the format
    if (regex.test(dateString)) {
      const [day, month, year] = dateString.split("-");
      return `${year}-${month}-${day}`;
    }

    // Return the input unchanged if it doesn't match the expected format
    return dateString;
  };

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
                <tbody>
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
                </tbody>
              ) : (
                <tbody>
                  {currentItems?.length > 0 ? (
                    currentItems?.map((row, index) => (
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
                          <div>{row.id}</div>
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            padding: "15px",
                            fontSize: "0.9rem",
                            color: "#4B5563",
                          }}
                        >
                          {convertToISOFormatIfNeeded(
                            row?.basicWorkorderDetails?.startDate
                          )}{" "}
                          & {row?.basicWorkorderDetails?.startTime}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            padding: "15px",
                            fontSize: "0.9rem",
                            color: "#4B5563",
                          }}
                        >
                          {row?.customerDetailSection?.CustomerName}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            padding: "15px",
                            fontSize: "0.9rem",
                            color: "#4B5563",
                          }}
                          title={row?.workorderDetails
                            .map((item) => item.workItem)
                            .join(", ")}
                        >
                          {row?.workorderDetails
                            .slice(0, 2)
                            .map((item, index) => (
                              <span key={index}>
                                {item.workItem}
                                {index < 1 && row?.workorderDetails.length > 2
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
                          {row?.basicWorkorderDetails?.WorkerName}
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
                            {(userRole === "Admin" ||
                              hasPermission(
                                `Company Work Order Module`,
                                `Delete`
                              )) && (
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
                            )}
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
              )}
            </Table>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span>
                Showing {filteredtable.length === 0 ? 0 : indexOfFirstItem + 1}{" "}
                to{" "}
                {indexOfLastItem > filteredtable.length
                  ? filteredtable.length
                  : indexOfLastItem}{" "}
                of {filteredtable.length} items
              </span>
              <div className="d-flex align-items-center">
                <Button
                  variant="light"
                  className="me-1"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  &laquo;
                </Button>
                {/* Numbered page buttons */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index}
                    variant={currentPage === index + 1 ? "primary" : "light"}
                    className="me-1"
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  variant="light"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
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
