import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaInfoCircle, FaEdit, FaClipboardList } from "react-icons/fa";
import Header from "../../../../Components/Header/Header";
import { deleteCompanyApi, getCompanyListApi } from "../../../../lib/store";
import { BeatLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const Companies = () => {
  const { t } = useTranslation(); // ✅ Translation Hook

  const navigate = useNavigate();
  const [companyList, setCompanyList] = useState([]);
  console.log("cascasc",companyList)
  const [token, setToken] = useState(localStorage.getItem("UserToken"));
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const rowsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCompanyListApi(token);
        console.log("resss", response);
        if (response.status === true) {
          setCompanyList(response?.data || []);
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
  function formatTimestamp(timestamp) {
    const { _seconds, _nanoseconds } = timestamp;

    const date = new Date(_seconds * 1000 + _nanoseconds / 1000000);

    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    // Format the date
    return date.toLocaleDateString("en-US", options).replace(",", "");
  }

  const handleDetailsClick = (company) => {
    navigate("/company/companies/details", { state: { company } });
  };

  const handleEditCompanyClick = (company) => {
    navigate("/company/companies/edit", { state: { company } });
  };

  const hanldeDeleteCompany = async (item) => {
    // console.log("dddddd", item);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this company",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "No, cancel",
    });

    if (!result.isConfirmed) {
      console.log("Role creation was cancelled");
      return;
    }

    Swal.fire({
      title: "Deletingg...",
      text: "Deleting Company, please wait.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await deleteCompanyApi(item, token);
      Swal.close();

      if (response.status === true) {
        // Remove the deleted company from the companyList state
        setCompanyList((prevList) =>
          prevList.filter((company) => company.company.id !== item)
        );
        Swal.fire({
          title: "Success!",
          text: "Company Deleted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response.message || "There was an error Deleting company.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      // Close SweetAlert loading spinner and show error
      Swal.close();
      console.error("API Error:", error);

      Swal.fire({
        title: "API Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <h2 className="mb-4">{t("Companies")}</h2>
          <div className="">
            <Table
              hover
              responsive
              className="align-middle "
              style={{ minWidth: "1650px" }}
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
              {t("Company Name & Address")}
            </th>
            <th
              style={{
                width: "20%",
                textAlign: "left",
                background: "#e5e5e5",
              }}
            >
              {t("Admin")}
            </th>
              <th
                style={{
                  width: "10%",
                  textAlign: "left",
                  background: "#e5e5e5",
                }}
              >
                {t("Creation")}
              </th>
              <th className="text-center" style={{ width: "7%", background: "#e5e5e5" }}>
                {t("Field Users")}
              </th>
              <th className="text-center" style={{ width: "7%", background: "#e5e5e5" }}>
                {t("Office Users")}
              </th>
              <th className="text-center" style={{ width: "7%", background: "#e5e5e5" }}>
                {t("Customers")}
              </th>
              <th className="text-center" style={{ width: "10%", background: "#e5e5e5" }}>
                {t("Work Orders")}
              </th>
              <th className="text-center" style={{ width: "10%", background: "#e5e5e5" }}>
                {t("Action")}
              </th>
            </tr>

              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="10" className="text-center py-5">
                      <BeatLoader
                        size={12}
                        color={"#3C3C3C"}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />
                      <p className="mt-2">Loading...</p>
                    </td>
                  </tr>
                ) : companyList.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-5">
                      No Companies found
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
                        <strong>{item.company.company_name}</strong>
                        <br />
                        <span style={{ color: "gray", fontSize: "0.9rem" }}>
                          {item.company.address_line_1},
                          {item.company.address_line_2},{item.company.city},
                          {item.company.zip_postal_code}
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
                        {item?.user?.first_name || "null"} [
                        {item?.user?.contact_number || "null"},{" "}
                        {item?.user?.email || "null"}]
                      </td>

                      <td
                        style={{
                          textAlign: "left",
                          padding: "15px",
                          fontSize: "0.9rem",
                          color: "#4B5563",
                        }}
                      >
                        {formatTimestamp(item.company.created_at)}
                      </td>
                      <td className="text-center">{item.user_counts.field_user || 0}</td>
                      <td className="text-center">{item.user_counts.office_user || 0}</td>
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
                            onClick={() => handleDetailsClick(item)}
                          >
                            <FaInfoCircle />
                          </Button>
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
                            onClick={() => handleEditCompanyClick(item)}
                          >
                            <FaEdit />
                          </Button>
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
                            onClick={() => hanldeDeleteCompany(item.company.id)}
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
                &laquo; {t("Previous")}
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
                {t("Next")} &raquo;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;

