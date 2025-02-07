import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import Header from "../../../../../Components/Header/Header";
import { Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const EditAdminRole = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const [token, settoken] = useState(localStorage.getItem("UserToken"));

  const { role } = location.state || {};
  console.log("role", role);

  // Get role details from the role object
  const roleName = role?.roleName || "";
  const roleDescription = role?.roleDescription || "";
  // Note: permissions is coming as an array from your API, so we default to an empty array
  const permissions = role?.permissions || [];
  console.log("permissions", permissions);

  // Company modules data
  const companyModules = [
    {
      originalName: "Company Office User Module",
      name: t("Company Office User Module"), // Translated name
      actions: ["view", "create", "edit"],
    },
    {
      originalName: "Company Customers Module",
      name: t("Company Customers Module"), // Translated name
      actions: ["view", "create", "edit", "delete"],
    },
    {
      originalName: "Company Work Order Module",
      name: t("Company Work Order Module"), // Translated name
      actions: ["view", "create", "edit", "delete"],
    },
  ];

  // Render each module row with checkboxes disabled and checked based on permissions
  const renderModules = (modules) =>
    modules.map((module, index) => {
      // Find the permission for this module by matching the original English name
      const modulePermission = permissions.find(
        (p) => p.moduleName === module.originalName
      );

      return (
        <tr key={index}>
          <td>{module.name}</td> {/* Show translated name */}
          <td>
            {module.actions.includes("view") && (
              <Form.Check
                inline
                label={t("View")}
                type="checkbox"
                disabled
                checked={
                  modulePermission
                    ? modulePermission.actions.some(
                        (action) => action.toLowerCase() === "view"
                      )
                    : false
                }
              />
            )}
            {module.actions.includes("create") && (
              <Form.Check
                inline
                label={t("Create")}
                type="checkbox"
                disabled
                checked={
                  modulePermission
                    ? modulePermission.actions.some(
                        (action) => action.toLowerCase() === "create"
                      )
                    : false
                }
              />
            )}
            {module.actions.includes("edit") && (
              <Form.Check
                inline
                label={t("Edit")}
                type="checkbox"
                disabled
                checked={
                  modulePermission
                    ? modulePermission.actions.some(
                        (action) => action.toLowerCase() === "edit"
                      )
                    : false
                }
              />
            )}
            {module.actions.includes("delete") && (
              <Form.Check
                inline
                label={t("Delete")}
                type="checkbox"
                disabled
                checked={
                  modulePermission
                    ? modulePermission.actions.some(
                        (action) => action.toLowerCase() === "delete"
                      )
                    : false
                }
              />
            )}
          </td>
        </tr>
      );
    });

  return (
    <>
      <Header />
      <div className="main-header-box">
        <Container
          className="mt-4 pages-box"
          style={{
            backgroundColor: "white",
            borderRadius: "22px",
            padding: "25px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className="form-header mb-4"
            style={{
              backgroundColor: "#2e2e32",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            <h4 className="mb-0">{t("View Staff Role Details")}</h4>
          </div>
          <Alert variant="danger" className="text-center fw-bold">
            ⚠️{" "}
            {t(
              "You can't Edit! Default Role. You can create a new Role or contact Admin"
            )}
            .
          </Alert>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("Role Name")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("Enter Role Name")}
                    value={roleName}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("Role Description")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("Enter Role Description")}
                    value={roleDescription}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <Table bordered>
              <thead>
                <tr>
                  <th>{t("Module Name")}</th>
                  <th>{t("Module Actions")}</th>
                </tr>
              </thead>
              <tbody>{renderModules(companyModules)}</tbody>
            </Table>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                navigate("/settings/admin/roles"); // Replace "/home" with your desired URL
              }}
            >
              {t("Back")}
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default EditAdminRole;
