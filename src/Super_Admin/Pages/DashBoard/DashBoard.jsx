import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "../../../Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

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
          <Container
            fluid
            className="my-4"
            style={{ backgroundColor: "white", borderRadius: "22px" }}
          >
            {/* Stats Section */}
            <Row className="mb-4">
              <Col md={4}>
                <Card className="text-center">
                  <Card.Body>
                    <h3>{stats.totalCompanies}</h3>
                    <p>Total Companies</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center">
                  <Card.Body>
                    <h3>{stats.avgQuotations}</h3>
                    <p>Average Quotations</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center">
                  <Card.Body>
                    <h3>{stats.avgWorkOrders}</h3>
                    <p>Average Work Orders</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Companies Section */}
            <Row>
              {companies.map((company) => (
                <Col md={4} className="mb-4" key={company.id}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="p-3"
                    />
                    <Card.Body>
                      <Card.Title>{company.name}</Card.Title>
                      <Card.Text>{company.address}</Card.Text>
                      <Card.Text>
                        <strong>Admin:</strong> {company.admin}
                      </Card.Text>
                      <Row className="text-center">
                        <Col>
                          <strong>{company.totalUsers}</strong>
                          <p className="mb-0">Users</p>
                        </Col>
                        <Col>
                          <strong>{company.quotations}</strong>
                          <p className="mb-0">Quotations</p>
                        </Col>
                        <Col>
                          <strong>{company.workOrders}</strong>
                          <p className="mb-0">Work Orders</p>
                        </Col>
                      </Row>
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
