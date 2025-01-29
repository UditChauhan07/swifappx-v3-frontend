import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import Header from "../../../../Components/Header/Header";
import { Link } from "react-router-dom";

const Roles = () => {
  const [rolesList, setRolesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const rowsPerPage = 4;

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true);
      try {
        // Replace this with your actual API or static data
        const mockData = [
          {
            roleName: "commis aux comptes",
            roleLevel: "Company",
            roleDescription: "commis aux comptes commis aux comptes",
            numberOfUsers: 0,
          },
          {
            roleName: "HR USER",
            roleLevel: "Company",
            roleDescription: "THIS IS ROLE DESCRIPTION",
            numberOfUsers: 0,
          },
          {
            roleName: "Modren Complex",
            roleLevel: "SAAS",
            roleDescription: "na",
            numberOfUsers: 0,
          },
          {
            roleName: "view access",
            roleLevel: "Company",
            roleDescription: "na",
            numberOfUsers: 0,
          },
        ];
        setRolesList(mockData);
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
    if (direction === "next" && currentPage * rowsPerPage < rolesList.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rolesList.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <div className="mb-2">
            <Link to={'/settings/roles/create'}>
            <Button>Create</Button>
            </Link>
          </div>
          <h2 className="mb-4">SAAS Roles</h2>
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
                    Role Name
                  </th>
                  <th
                    style={{
                      width: "20%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    Role Level
                  </th>
                  <th
                    style={{
                      width: "30%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    Role Description
                  </th>
                  <th
                    className="text-center"
                    style={{ width: "10%", background: "#e5e5e5" }}
                  >
                    # of Users
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
                    <td colSpan="5" className="text-center py-5">
                      <BeatLoader size={12} color={"#3C3C3C"} />
                      <p className="mt-2">Loading...</p>
                    </td>
                  </tr>
                ) : (
                  currentRows.map((role, index) => (
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
                      <td className="text-center">{role.numberOfUsers}</td>
                      <td className="text-center">
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
                          <FaEdit />
                        </Button>
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
                disabled={currentPage * rowsPerPage >= rolesList.length}
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

export default Roles;
