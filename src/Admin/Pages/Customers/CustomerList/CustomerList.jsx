import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import Header from "../../../../Components/Header/Header";
import { DeleteCustomerApi, getCustomerList } from "../../../../lib/store";
import { IoIosInformationCircle } from "react-icons/io";
import { FaAddressBook } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePermissions } from "../../../../context/PermissionContext";


const CustomerList = () => {
  const {hasPermission}=usePermissions();
    const userRole=localStorage.getItem('Role')
  const { t } = useTranslation(); 
  
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  // console.log("cussss", customers);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [token, settoken] = useState(localStorage.getItem("UserToken"));
  const rowsPerPage = 4;

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        const response = await getCustomerList(companyId, token); // Fetch customers from API
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

  const handleDetailsClick = (customer) => {
    navigate("/customers/list/details", { state: { customer } });
  };

  const handleEditCustomerClick = (customer) => {
    navigate("/customers/list/edit", { state: { customer } });
  };

  const hanldeDeleteCustomer = async (item) => {
    // console.log("dddddd", item);

    const result = await Swal.fire({
      title: t("Are you sure?"),
      text: t("You are about to delete this Customer"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("Yes, Delete it!"),
      cancelButtonText: t("No, cancel"),
    });

    if (!result.isConfirmed) {
      console.log("Customer Deletion was cancelled");
      return;
    }

    Swal.fire({
      title: t("Deletingg..."),
      text: t("Deleting Customer, please wait."),
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await DeleteCustomerApi(item, token);
      Swal.close();

      if (response.status === true) {
        // Remove the deleted company from the companyList state
        setCustomers((prevList) =>
          prevList.filter((customer) => customer.id !== item)
        );
        Swal.fire({
          title: t("Success!"),
          text: t("Customer Deleted successfully."),
          icon: "success",
          confirmButtonText: t("OK"),
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response.message || t("There was an error Deleting Customer."),
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      // Close SweetAlert loading spinner and show error
      Swal.close();
      console.error("API Error:", error);

      Swal.fire({
        title: t("API Error!"),
        text: t("Something went wrong. Please try again later."),
        icon: "error",
        confirmButtonText: t("OK"),
      });
    }
  };

  const handleClear = ()=>{
    setSearchQuery("")
  }

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">{t("Customer List")}</h4>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder={t("Search customers...")}
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
                  {t("Customer Id")}
                </th>
                <th
                  style={{
                    width: "22%",
                    textAlign: "left",
                    background: "#e5e5e5",
                  }}
                >
                  {t("Name")}
                </th>
                <th
                  style={{
                    width: "15%",
                    textAlign: "left",
                    background: "#e5e5e5",
                  }}
                >
                  {t("Phone Number")}
                </th>
                <th
                  style={{
                    width: "30%",
                    textAlign: "left",
                    background: "#e5e5e5",
                  }}
                >
                  {t("Email Address")}
                </th>
                <th
                  style={{
                    width: "15%",
                    textAlign: "left",
                    background: "#e5e5e5",
                  }}
                >
                  {t("Created By")}
                </th>
                <th
                  className="text-center"
                  style={{ width: "20%", background: "#e5e5e5" }}
                >
                  {t("Action")}
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
                    <p className="mt-2">{t("Loading...")}</p>
                  </td>
                </tr>
              ) : currentRows.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    {t("No customers found")}.
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
                      {customer.id}
                    </td>
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
                      {customer.phone}
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
                          onClick={() => handleDetailsClick(customer)}
                        >
                          <IoIosInformationCircle />
                        </Button>
                        {(userRole == "Admin" || hasPermission("Company Customers Module", "Edit")) &&(
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          style={{
                            borderRadius: "50%",
                            width: "35px",
                            height: "35px",
                          }}
                          onClick={() => handleEditCustomerClick(customer)}
                        >
                          <FaUserEdit />
                        </Button>
                        )}
                        {/* <Button
                          variant="outline-secondary"
                          size="sm"
                          style={{
                            borderRadius: "50%",
                            width: "35px",
                            height: "35px",
                          }}
                        >
                          <FaAddressBook />
                        </Button> */}
                        {(userRole == "Admin" || hasPermission("Company Customers Module", "Delete")) &&(
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          style={{
                            borderRadius: "50%",
                            width: "35px",
                            height: "35px",
                          }}
                          onClick={() => hanldeDeleteCustomer(customer.id)}
                        >
                          <MdDelete />
                        </Button>
                       )}
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
              disabled={currentPage * rowsPerPage >= filteredCustomers.length}
            >
              {t("Next")} &raquo;
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerList;
