import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import Header from "../../../../../Components/Header/Header";
import { Alert } from "react-bootstrap";

const EditAdminRole = () => {
  const location = useLocation();
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
    { name: "Company Office User Module", actions: ["view", "create", "edit"] },
    {
      name: "Company Customers Module",
      actions: ["view", "create", "edit", "delete"],
    },
    {
      name: "Company Quotations Module",
      actions: ["view", "create", "edit", "delete"],
    },
    { name: "Company Contract Module", actions: ["view", "create", "edit"] },
    { name: "Company Work Order Module", actions: ["view", "create", "edit"] },
    {
      name: "Company Field User Module",
      actions: ["view", "create", "edit", "delete"],
    },
    {
      name: "Company Request Work Order Module (Rescheduled/Cancelled)",
      actions: ["view", "edit"],
    },
    { name: "Company Reports Module", actions: ["view", "create", "edit"] },
    {
      name: "Company Master Setting Module",
      actions: ["view", "create", "edit", "delete"],
    },
    {
      name: "Company HR Setting Module",
      actions: ["view", "create", "edit", "delete"],
    },
  ];

  // Render each module row with checkboxes disabled and checked based on permissions
  const renderModules = (modules) =>
    modules.map((module, index) => {
      // Find the permission for this module by matching module name
      const modulePermission = permissions.find(
        (p) => p.moduleName === module.name
      );

      return (
        <tr key={index}>
          <td>{module.name}</td>
          <td>
            {module.actions.includes("view") && (
              <Form.Check
                inline
                label="View"
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
                label="Create"
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
                label="Edit"
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
                label="Delete"
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
              backgroundColor: "#8d28dd",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            <h4 className="mb-0">View Staff Role Details</h4>
          </div>
          <Alert variant="danger" className="text-center fw-bold">
            ⚠️ You can't Edit! Default Role. You can create a new Role or
            contact Admin.
          </Alert>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Role Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Role Name"
                    value={roleName}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Role Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Role Description"
                    value={roleDescription}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <Table bordered>
              <thead>
                <tr>
                  <th>Module Name</th>
                  <th>Module Actions</th>
                </tr>
              </thead>
              <tbody>{renderModules(companyModules)}</tbody>
            </Table>
            <Button variant="primary" type="submit">
              Back
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default EditAdminRole;
