import React from "react";
import { Card, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Header from "../../../../Components/Header/Header";

const CompanyAccess = () => {
  const companies = [
    {
      name: "Basic Company",
      address: "Mohali, Punjab, Haryana, Zirakpur, India, 23802",
      logo: "https://swif.truet.net/public/swifCompany/uploads/logo/Kht22XRGSpqv.png", // Example image placeholder
      totalUsers: 1,
      quotations: 0,
      workOrders: 0,
      admin: "new user",
    },
    {
      name: "Test 1",
      address: "1, , C, S, India, 140603",
      logo: "https://swif.truet.net/public/swifCompany/uploads/logo/Kht22XRGSpqv.png", // Example image placeholder
      totalUsers: 1,
      quotations: 0,
      workOrders: 0,
      admin: "Name Name",
    },
    {
      name: "Jagga",
      address: "Jagga, , jagga, jagga, Singapore, 123456",
      logo: "https://swif.truet.net/public/swifCompany/uploads/logo/Kht22XRGSpqv.png", // Example image placeholder
      totalUsers: 1,
      quotations: 0,
      workOrders: 10,
      admin: "jagga jagga",
    },
  ];

  return (
    <>
      <Header />
      <div className="main-header-box">
        <div className="pages-box mt-4">
          <Row className="align-items-center mb-4">
            <Col>
              <h2 className="mb-0">Manage Companies</h2>
            </Col>
            <Col md="auto">
              <InputGroup style={{ maxWidth: "300px" }}>
                <Form.Control
                  placeholder="Filter Company..."
                  aria-label="Filter Company"
                />
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
          <Row style={{ textAlign: "center" }}>
            {companies.map((company, index) => (
              <Col className="mb-4" key={index}>
                <Card
                  className="h-100 shadow-sm border-0"
                  style={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    width: "90%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0px 10px 20px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={company.logo}
                    style={{
                      height: "150px",
                      objectFit: "cover",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                  <Card.Body>
                    <Card.Title
                      className="text-uppercase fw-bold"
                      style={{ color: "#8d28dd" }}
                    >
                      {company.name}
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {company.address}
                    </Card.Text>
                  </Card.Body>
                  <div
                    className="d-flex text-center"
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderTop: "1px solid #ddd",
                    }}
                  >
                    <div className="flex-fill p-2 border-end">
                      <h5 className="mb-0 text-primary">
                        {company.totalUsers}
                      </h5>
                      <small>Total Users</small>
                    </div>
                    <div className="flex-fill p-2 border-end">
                      <h5 className="mb-0 text-success">
                        {company.quotations}
                      </h5>
                      <small>Quotations</small>
                    </div>
                    <div className="flex-fill p-2">
                      <h5 className="mb-0 text-danger">{company.workOrders}</h5>
                      <small>Work Orders</small>
                    </div>
                  </div>
                  <Card.Footer className="bg-light">
                    <small className="text-muted">
                      Admin: <span className="fw-bold">{company.admin}</span>
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default CompanyAccess;
