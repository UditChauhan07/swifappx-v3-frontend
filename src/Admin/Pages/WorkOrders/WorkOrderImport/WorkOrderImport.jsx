import React from "react";
import { Button, Form } from "react-bootstrap";
import Header from "../../../../Components/Header/Header";
import { useTranslation } from "react-i18next";

const WorkOrderImport = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <div
            className="form-header mb-4"
            style={{
              backgroundColor: "#2e2e32",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            <h4 className="mb-0">{t("Import Work Orders")}</h4>
          </div>
          <div
            className="border p-4 rounded"
            style={{ backgroundColor: "#f8fff8" }}
          >
            <h4 className="text-center mb-4">{t("Import Work Orders")}</h4>
            <div
              className="border rounded p-4 mb-4"
              style={{ borderStyle: "dashed", textAlign: "center" }}
            >
              <p>{t("Drag & drop any file here")}</p>
              <p>
                or <span className="text-primary">{t("browse file")}</span> {t("from device")}
              </p>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" />
              </Form.Group>
            </div>
            <div className="text-center">
              <Button variant="primary" className="px-5">
                {t("Upload")}
              </Button>
            </div>
          </div>
          <div className="border-top mt-4 pt-3">
            <h5 className="text-center">{t("Sample Field Users - Excel")}</h5>
            <div className="mt-3">
              <img
                src="/path/to/sample-excel-image.png" // Replace with actual path to the sample image
                alt="Sample Work Orders Excel"
                className="img-fluid border"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkOrderImport;
