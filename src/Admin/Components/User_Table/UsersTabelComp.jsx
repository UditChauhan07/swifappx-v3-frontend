import React, { useState } from "react";
import { Table, Button, Row } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import { formatTimestamp } from "../../../utils/TimeStampConverter";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaInfoCircle, FaEdit, FaClipboardList } from "react-icons/fa";
import { delete_OfficeUser } from "../../../lib/store";
import { useTranslation } from "react-i18next";
import { usePermissions } from "../../../context/PermissionContext";


const UsersTabelComp = ({
  tableData,
  tableHeaders,
  roleName,
  isLoading,
  fetchData,
}) => {
  const token = localStorage.getItem("UserToken");
  const company_id = localStorage.getItem("companyId") || null;
  const navigate = useNavigate();
        const { t } = useTranslation(); 
  
  const [userRole, setuserRole] = useState(localStorage.getItem("Role"));

  const handleToPreview = async (row) => {
    navigate("/users/office/list/view", { state: { row } });
  };  
  const {hasPermission}=usePermissions();

  const handleDelete = (id) => {
    Swal.fire({
      title: t("Are you sure?"),
      text: t("You won't be able to revert this!"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("Yes, delete it!"),
      cancelButtonText: t("Cancel"),
      reverseButtons: true, // Reverse the order of the buttons (Cancel left, Confirm right)
    }).then((result) => {
      if (result.isConfirmed) {
        delete_OfficeUser(id, token).then((result) => {
          console.log("tableData", result);
          if (result.status === true) {
            fetchData();
          } else {
            Swal.fire("Error", result.message, "error");
          }
        });

        Swal.fire({
          title: t("Deleted!"),
          text: t("Office user has been deleted."),
          icon: "success",
          timer: 1400, // Time in milliseconds (1500 ms = 1.5 seconds)
          showConfirmButton: false, // Optional: Hide the confirm button
        });
      }
    });
  };

  const handleEdit = (row) => {
    navigate("/users/office/edit", { state: { row } });
  };

  return (
    <>
      <div className="">
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
              <td colSpan="5" className="text-center py-5">
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
                  tableData?.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <td>
                        {" "}
                        <div>
                          <strong>{row?.first_name}</strong>
                          <br />
                          {row?.city}
                        </div>
                      </td>
                      <td>{roleName}</td>
                      <td>{row?.email}</td>
                      <td>
                        {row.created_at ? formatTimestamp(row.created_at) : "-"}
                      </td>
                      <td>{row.isActive == 1 ? "Active" : "UnActive"}</td>
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
                          {(userRole == "Admin" ||
                              hasPermission(
                                "Company Office User Module", "Edit"
                              )) && (
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
                              )}

                        {(userRole == "Admin" ||
                        hasPermission(
                          "Company Office User Module", "Delete"
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
                  <td colSpan={6} align="center">
                    No Record Found
                  </td>
                )}
              </tbody>
            </>
          )}
        </Table>
      </div>
    </>
  );
};

export default UsersTabelComp;
