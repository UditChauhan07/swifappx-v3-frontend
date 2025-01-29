import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";


const UsersTabelComp = ({ tableData, tableHeaders }) => {
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
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                {Object.entries(row).map(([key, value], cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      // textAlign: cellIndex === 0 ? "left" : "center",
                      padding: "15px",
                      fontSize: "0.9rem",
                      color: "#4B5563",
                    }}
                  >
                    {key === "status" ? (
                      <span
                        style={{
                          backgroundColor:
                            value === "Open"
                              ? "#E0F7FA"
                              : value === "Paid"
                              ? "#D1E7DD"
                              : "#EAEAEA",
                          color:
                            value === "Open"
                              ? "#00796B"
                              : value === "Paid"
                              ? "#155724"
                              : "#6C757D",
                          padding: "5px 10px",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                        }}
                      >
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
                <td style={{ textAlign: "center", padding: "15px" }}>
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
                    <FaUserEdit size={20}/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default UsersTabelComp;
