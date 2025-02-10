import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Header from "../../../../Components/Header/Header";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";

const ImportFieldUser = () => {
  const { t } = useTranslation();
  const [excelData, setExcelData] = useState([]);

  // Sample Data
  const sampleData = [
    {
      name: "Shorya asdasda",
      username: "sadaddad",
      contact_number: "222222222222",
      email: "aasddddsadmin@ddd.com",
      password: "222222222222",
      profilePicture: "null",
      country: "Andorra",
      address: "asd",
      company_id: "oiJ40pPOVHYVDbw6yKwY",
      created_by: "Rams",
      created_by_id: "sGSRbVKfnoqHytG4w8rY",
    },
  ];

  // Function to generate and download a sample Excel file
  const handleDownloadSample = () => {
    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample Data");

    XLSX.writeFile(workbook, "Sample_Field_Users.xlsx");
  };

  // Function to handle file upload
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        // Create a Uint8Array from the ArrayBuffer
        const data = new Uint8Array(evt.target.result);
        // Read the workbook using the 'array' type
        const wb = XLSX.read(data, { type: "array" });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        // Convert worksheet to JSON with header row
        const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
        setExcelData(jsonData);
      };
      reader.readAsArrayBuffer(file); // Use ArrayBuffer instead of binary string
    }
  };

  // Function to send data to an API
  const handleUpload = async () => {
    if (excelData.length === 0) {
      alert("Please upload a file first.");
      return;
    }

    const formattedData = excelData.slice(1).map((row) => {
      return {
        name: row[0],
        username: row[1],
        contact_number: row[2],
        email: row[3],
        password: row[4],
        profilePicture: row[5],
        country: row[6],
        address: row[7],
        company_id: row[8],
        created_by: row[9],
        created_by_id: row[10],
      };
    });

    try {
      const response = await fetch("https://your-api-url.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("Error uploading file.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          {/* Form Header */}
          <div
            className="form-header mb-4"
            style={{
              backgroundColor: "#2e2e32",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            <h4 className="mb-0">{t("Import Field Agent")}</h4>
          </div>

          {/* File Upload Section */}
          <div
            className="border p-4 rounded"
            style={{ backgroundColor: "#f8fff8" }}
          >
            <h4 className="text-center mb-4">{t("Import Field Agent")}</h4>
            <div
              className="border rounded p-4 mb-4"
              style={{ borderStyle: "dashed", textAlign: "center" }}
            >
              <p>{t("Drag & drop any file here")}</p>
              <p>
                or <span className="text-primary">{t("browse file")}</span>{" "}
                {t("from device")}
              </p>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={handleFile} />
              </Form.Group>
            </div>
            <div className="text-center">
              <Button
                variant="success"
                className="px-5 me-3"
                onClick={handleDownloadSample}
              >
                {t("Download Sample")}
              </Button>
              <Button variant="primary" className="px-5" onClick={handleUpload}>
                {t("Upload")}
              </Button>
            </div>
          </div>

          {/* Display Sample Data */}
          <div className="border-top mt-4 pt-3">
            <h5 className="text-center">{t("Sample Data Preview")}</h5>
            <div
              style={{
                overflowX: "auto",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#f8fff8",
              }}
            >
              <Table bordered responsive>
                <thead style={{ backgroundColor: "#2196F3", color: "white" }}>
                  <tr>
                    {Object.keys(sampleData[0]).map((key, index) => (
                      <th key={index}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          {/* Display Uploaded Excel Data */}
          <div className="border-top mt-4 pt-3">
            <h5 className="text-center">{t("Uploaded Excel Data")}</h5>
            <div className="mt-3">
              {excelData.length > 0 ? (
                <div
                  style={{
                    overflowX: "auto",
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#f8fff8",
                  }}
                >
                  <Table bordered responsive>
                    <thead
                      style={{ backgroundColor: "#4caf50", color: "white" }}
                    >
                      <tr>
                        {excelData[0].map((col, index) => (
                          <th key={index}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {excelData.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center">
                  <p>{t("No Excel data to display")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportFieldUser;
