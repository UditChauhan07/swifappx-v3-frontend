import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "../../../Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import "./DashBoard.css";

const DashBoard = () => {
  // Static data based on the provided image
  const stats = {
    totalCompanies: 27,
    activeCompanies: 27,
    totalQuotations: 85,
    avgQuotations: 3,
    totalWorkOrders: 6414,
    avgWorkOrders: 238,
  };

  const companies = [
    {
      id: 1,
      name: "Mussorie Company",
      address: "address, , city, state, India, 654321",
      admin: "mussorie admin",
      totalUsers: 116,
      quotations: 2,
      workOrders: 3801,
      logo: "https://swif.truet.net/public/swifCompany/noLogo.jpg",
    },
    {
      id: 2,
      name: "Urban CLap",
      address: "Oxford Street, , Zirakpur, Punjab, India, 6758957",
      admin: "Rohit Ooohuja",
      totalUsers: 5,
      quotations: 6,
      workOrders: 867,
      logo: "https://swif.truet.net/public/swifCompany/noLogo.jpg",
    },
    {
      id: 3,
      name: "Oram Company",
      address: "mohali, punjab, haryana, zirakpur, India, 23802",
      admin: "Surbhi singh",
      totalUsers: 1,
      quotations: 0,
      workOrders: 282,
      logo: "https://swif.truet.net/public/swifCompany/noLogo.jpg",
    },
    {
      id: 4,
      name: "Iktaa Company",
      address: "hjhj, , klkl, klkl, Andorra, 898989",
      admin: "ghghgh ghghh",
      totalUsers: 1,
      quotations: 0,
      workOrders: 220,
      logo: "https://swif.truet.net/public/swifCompany/noLogo.jpg",
    },
    {
      id: 5,
      name: "Orange Company",
      address: "mohali, punjab, haryana, zirakpur, India, 23802",
      admin: "first name",
      totalUsers: 1,
      quotations: 10,
      workOrders: 114,
      logo: "https://swif.truet.net/public/swifCompany/noLogo.jpg",
    },
  ];

  return (
    <>
      <Header />
      <div className="main-header-box">
        <div className="mt-4 pages-box">
          <Container fluid className="dashboard-content">
            <Row className="stats-row">
              {Object.entries(stats).map(([key, value]) => (
                <Col md={4} key={key}>
                  <Card className="stats-card">
                    <Card.Body>
                      <h3>{value}</h3>
                      <p>
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <Row>
              {companies.map((company) => (
                <Col md={3} key={company.id}>
                  <Card className="company-card">
                    <Card.Img
                      style={{ padding: "40px 40px 10px 40px" }}
                      variant="top"
                      src={
                        company.logo ||
                        "https://swif.truet.net/public/swifCompany/noLogo.jpg"
                      }
                      alt={`${company.name} logo`}
                    />
                    <Card.Body>
                      <Card.Title
                        style={{ textAlign: "center", color: "#8d28dd" }}
                      >
                        <strong>{company.name}</strong>
                      </Card.Title>
                      <Card.Text
                        style={{ textAlign: "center", minHeight: "50px" }}
                      >
                        {company.address}
                      </Card.Text>

                      <div
                        className="company-stats d-flex justify-content-around border rounded "
                        style={{
                          margin: "0px -16px 10px -16px",
                        }}
                      >
                        <div className="stat-item text-center border-end ">
                          <strong>{company.totalUsers}</strong>
                          <div>Total User</div>
                        </div>
                        <div className="stat-item text-center border-end ">
                          <strong>{company.quotations}</strong>
                          <div>Quotations</div>
                        </div>
                        <div className="stat-item text-center">
                          <strong>{company.workOrders}</strong>
                          <div>Work Orders</div>
                        </div>
                      </div>

                      <Card.Text>
                        <strong>Admin:</strong> {company.admin}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
