import React, { useState } from "react";
import { Table, Button, Row } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import { formatTimestamp } from "../../../utils/TimeStampConverter";
import { BeatLoader } from "react-spinners";


const UsersTabelComp = ({ tableData, tableHeaders, roleName,isLoading }) => {
    console.log('tableData', tableData);
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
          {
          isLoading ?
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
           :
           <>
          <tbody>
            {tableData.length>0? tableData?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <td> <div>
                  <strong>{row?.first_name}</strong>
                    <br />
                  {row?.city}
                </div>
                </td>
                <td>{roleName}</td>
                <td>{row?.email}</td>
                <td>{row.created_at? formatTimestamp(row.created_at) :'-'}</td>
                <td>{row.isActive==1?"Active":"UnActive"}</td>
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
            ))
          :
          <td colSpan={6} align="center">No Record Found</td>
          }
          
          </tbody>
          </>
          }
        </Table>
      </div>
    </>
  );
};

export default UsersTabelComp;
