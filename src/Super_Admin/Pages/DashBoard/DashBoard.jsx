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
      name: "mussorie company",
      address: "address, , city, state, India, 654321",
      admin: "mussorie admin",
      totalUsers: 116,
      quotations: 2,
      workOrders: 3801,
      logo: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Urban CLap",
      address: "Oxford Street, , Zirakpur, Punjab, India, 6758957",
      admin: "Rohit Ooohuja",
      totalUsers: 5,
      quotations: 6,
      workOrders: 867,
      logo: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "oramcompany",
      address: "mohali, punjab, haryana, zirakpur, India, 23802",
      admin: "Surbhi singh",
      totalUsers: 1,
      quotations: 0,
      workOrders: 282,
      logo: "https://via.placeholder.com/100",
    },
    {
      id: 4,
      name: "l;kl",
      address: "hjhj, , klkl, klkl, Andorra, 898989",
      admin: "ghghgh ghghh",
      totalUsers: 1,
      quotations: 0,
      workOrders: 220,
      logo: "https://via.placeholder.com/100",
    },
    {
      id: 5,
      name: "orangecompany",
      address: "mohali, punjab, haryana, zirakpur, India, 23802",
      admin: "first name",
      totalUsers: 1,
      quotations: 10,
      workOrders: 114,
      logo: "https://via.placeholder.com/100",
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
                <Col md={4} key={company.id}>
                  <Card className="company-card">
                    <Card.Img
                      variant="top"
                      src={company.logo}
                      alt={`${company.name} logo`}
                    />
                    <Card.Body>
                      <Card.Title>{company.name}</Card.Title>
                      <Card.Text>{company.address}</Card.Text>
                      <Card.Text>
                        <strong>Admin:</strong> {company.admin}
                      </Card.Text>
                      <div className="company-stats">
                        <div>
                          <strong>{company.totalUsers}</strong> Users
                        </div>
                        <div>
                          <strong>{company.quotations}</strong> Quotations
                        </div>
                        <div>
                          <strong>{company.workOrders}</strong> Work Orders
                        </div>
                      </div>
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
