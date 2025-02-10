import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import Header from "../../../../Components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { getRoles } from "../../../../lib/store";
import { useTranslation } from "react-i18next";


const AdminRoles = () => {
    const { t } = useTranslation(); 
  
  const navigate = useNavigate()
  const [rolesList, setRolesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setuserId] = useState(localStorage.getItem("userId"));
  const [token, settoken] = useState(localStorage.getItem("UserToken"));
  const [companyId, setcompanyId] = useState(localStorage.getItem("companyId"))
  const rowsPerPage = 4;

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true);
      try {
        const response = await getRoles(companyId,token);
        console.log("dasda", response);
        setRolesList(response?.data);
      } catch (error) {
        console.error("Error fetching roles data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, []);

  // Handle pagination
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage * rowsPerPage < rolesList?.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rolesList?.slice(indexOfFirstRow, indexOfLastRow);

  const handleEditAdminRoleClick = (role) => {
    navigate("/settings/admin/roles/edit", { state: { role } });
  };

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          
          <h2 className="mb-4">{t("Staff Roles")}</h2>
          <div className="">
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
                      width: "26%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    {t("Role Name")}
                  </th>
                  <th
                    style={{
                      width: "20%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    {t("Role Level")}
                  </th>
                  <th
                    style={{
                      width: "30%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    {t("Role Description")}
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "10%", background: "#e5e5e5" }}
                  >
                    # {t("of Users")}
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "10%", background: "#e5e5e5" }}
                  >
                    {t("Action")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <BeatLoader size={12} color={"#3C3C3C"} style={{
                        display:"flex",justifyContent:"center"
                      }}/>
                      <p className="mt-2">{t("Loading...")}</p>
                    </td>
                  </tr>
                ) : (
                  currentRows?.length>0 ?
                   currentRows?.map((role, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "15px",
                          fontSize: "0.9rem",
                          color: "#4B5563",
                        }}
                      >
                        {role.roleName}
                      </td>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "15px",
                          fontSize: "0.9rem",
                          color: "#4B5563",
                        }}
                      >
                        {role.roleLevel}
                      </td>
                      <td
                        style={{
                          textAlign: "left",
                          padding: "15px",
                          fontSize: "0.9rem",
                          color: "#4B5563",
                        }}
                      >
                        {role.roleDescription}
                      </td>
                      <td className="text-center">{role.userCount}</td>
                      <td className="text-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          style={{
                            borderRadius: "50%",
                            width: "35px",
                            height: "35px",
                          }}
                          onClick={()=>handleEditAdminRoleClick(role)}
                        >
                          <FaEdit />
                        </Button>
                      </td>
                    </tr>
                  ))
                  :
                  <tr>
                    <td colSpan="5" className="text-center py-5">{t("No roles found")}.</td>
                  </tr>
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
                disabled={currentPage * rowsPerPage >= rolesList?.length}
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

export default AdminRoles;
