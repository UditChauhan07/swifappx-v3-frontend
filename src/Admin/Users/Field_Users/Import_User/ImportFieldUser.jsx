import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import Header from "../../../../Components/Header/Header";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { importFieldAgent } from "../../../../lib/store";
import { useNavigate } from "react-router-dom";

const ImportFieldUser = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // We now use 'xlsxData' to hold the parsed data from the XLSX file.
  const [xlsxData, setXlsxData] = useState([]);
  const [token] = useState(localStorage.getItem("UserToken"));

  // Sample data that will be shown in its own table.
  const sampleData = [
    {
      name: "Shorya Verma",
      username: "shorya8699",
      contact_number: "8699777777",
      email: "shoryaverma.dx@gmail.com",
      password: "123456789",
      country: "India",
      address: "Gillco Valley",
    },
  ];

  // Download sample XLSX file using the xlsx library.
  // We create a worksheet from the sampleData, assign custom column widths,
  // add it to a new workbook, and then trigger a download.
  const handleDownloadSample = () => {
    // Create a worksheet from JSON data.
    const worksheet = XLSX.utils.json_to_sheet(sampleData, {
      header: Object.keys(sampleData[0]),
    });

    // Set custom column widths (wch: width in characters)
    worksheet["!cols"] = [
      { wch: 20 }, // name
      { wch: 15 }, // username
      { wch: 15 }, // contact_number
      { wch: 30 }, // email
      { wch: 15 }, // password
      { wch: 15 }, // country
      { wch: 40 }, // address
    ];

    // Create a new workbook and append the worksheet.
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook as a binary array.
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], {
      type: "application/octet-stream",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Sample_Field_Users.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Handle XLSX file upload and parsing.
  // We use a FileReader to read the file as a binary string and then parse it
  // using XLSX.read. The data is converted into an array-of-arrays (with header row).
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = evt.target.result;
        // Read the XLSX file data
        const workbook = XLSX.read(data, { type: "binary" });
        // Use the first sheet in the workbook
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        // Convert the worksheet into a JSON array (array of arrays)
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "",
        });
        setXlsxData(jsonData);
      };
      reader.readAsBinaryString(file);
    }
  };

  // Format the XLSX data and upload it to the API.
  // This code assumes the first row contains the headers.
  const handleUpload = async () => {
    if (xlsxData.length === 0) {
      Swal.fire({
        icon: "warning",
        title: t("No File Uploaded"),
        text: t("Please upload a file first."),
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: t("Confirm Upload"),
      text: t("Are you sure you want to upload the file?"),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: t("Yes, Upload"),
      cancelButtonText: t("Cancel"),
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    // Use the first row as headers and then format the remaining rows.
    const headers = xlsxData[0];
    const formattedData = xlsxData.slice(1).map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        // Convert each field value to a string
        obj[header] =
          row[index] !== undefined && row[index] !== null
            ? String(row[index])
            : "";
      });
      // Add additional properties.
      obj.profilePicture = null;
      obj.company_id = localStorage.getItem("companyId");
      obj.created_by = localStorage.getItem("name");
      obj.created_by_id = localStorage.getItem("userId");
      return obj;
    });

    console.log("Formatted Data:", formattedData);

    Swal.fire({
      title: t("Uploading..."),
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await importFieldAgent(formattedData, token);
      console.log("Response:", response);
      if (response.success === true) {
        let message = response.message || t("File uploaded successfully!");
        if (response.failedUsers && response.failedUsers.length > 0) {
          message +=
            "\n\nFailed Users:\n" +
            response.failedUsers
              .map((f) => `${f.email}: ${f.error}`)
              .join("\n");
          Swal.fire({
            icon: "warning",
            title: t("Partial Success"),
            text: message,
          }).then(() => {
            navigate("/users/field/list");
          });
        } else {
          Swal.fire({
            icon: "success",
            title: t("Success"),
            text: message,
          }).then(() => {
            navigate("/users/field/list");
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: t("Error"),
          text: response.message || t("Error uploading file."),
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire({
        icon: "error",
        title: t("Upload Error"),
        text: t("An error occurred while uploading the file."),
      });
    }
  };

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          {/* Import Section */}
          <div
            className="border p-4 rounded mb-4"
            style={{
              backgroundColor: "#f9f9f9",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">{t("Import Field Agent")}</h4>
              <div className="d-flex gap-2">
                <Button variant="primary" onClick={handleUpload}>
                  {t("Upload")}
                </Button>
              </div>
            </div>
            <div
              className="border rounded p-4 mb-3"
              style={{ borderStyle: "dashed", textAlign: "center" }}
            >
              <p>{t("Drag & drop any file here")}</p>
              <p>
                {t("or")}{" "}
                <span className="text-primary">{t("browse file")}</span>{" "}
                {t("from device")}
              </p>
              {/* Accept only XLSX files */}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={handleFile}
                />
              </Form.Group>
            </div>
          </div>

          {/* Uploaded XLSX Data Preview Table Section */}
          {xlsxData.length > 0 && (
            <div
              className="border p-4 rounded"
              style={{
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">{t("Uploaded XLSX Data")}</h4>
              </div>
              {xlsxData.length > 0 ? (
                <Table hover responsive className="align-middle">
                  <thead>
                    <tr
                      style={{ backgroundColor: "#E7EAF3", color: "#3C3C3C" }}
                    >
                      {xlsxData[0].map((header, index) => (
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
                    {xlsxData.slice(1).map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            style={{
                              textAlign: "left",
                              padding: "15px",
                              fontSize: "0.9rem",
                              color: "#4B5563",
                            }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-5">
                  {t("No XLSX data to display")}
                </div>
              )}
            </div>
          )}

          {/* Sample Data Table Section */}
          <div
            className="border p-4 rounded mb-4"
            style={{
              backgroundColor: "#f9f9f9",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">{t("Sample Data")}</h4>
              <Button variant="success" onClick={handleDownloadSample}>
                {t("Download Sample")}
              </Button>
            </div>
            <Table hover responsive className="align-middle">
              <thead>
                <tr style={{ backgroundColor: "#E7EAF3", color: "#3C3C3C" }}>
                  {Object.keys(sampleData[0]).map((header, index) => (
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
                {sampleData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {Object.values(row).map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        style={{
                          textAlign: "left",
                          padding: "15px",
                          fontSize: "0.9rem",
                          color: "#4B5563",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportFieldUser;
