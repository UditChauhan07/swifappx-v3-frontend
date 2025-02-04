import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Header from "../../../Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import "./DashBoard.css";
import { getCompanyListApi } from "../../../lib/store";

const DashBoard = () => {
  const stats = {
    totalCompanies: 27,
    activeCompanies: 27,
    totalQuotations: 85,
    avgQuotations: 3,
    totalWorkOrders: 6414,
    avgWorkOrders: 238,
  };

  const [companyList, setCompanyList] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const token = localStorage.getItem("UserToken");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Show loader while fetching data
      try {
        const response = await getCompanyListApi(token);
        if (response.status === true) {
          setCompanyList(response?.data || []);
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false); // Hide loader after fetching data
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <Header />
      <div className="main-header-box">
        <div className="mt-4 pages-box">
          <Container fluid className="dashboard-content">
            {/* Stats Row */}
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

            {/* Show Loader while waiting for API response */}
            {loading ? (
              <div className="text-center my-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading Companies...</p>
              </div>
            ) : (
              <Row>
                {companyList.map((company) => (
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
                          <strong>{company.company.company_name}</strong>
                        </Card.Title>
                        <Card.Text
                          style={{ textAlign: "center", minHeight: "50px" }}
                        >
                          {company.company.address_line_1} ,
                          {company.company.address_line_2} ,
                          {company.company.companyState} ,
                          {company.company.zip_postal_code} ,
                          {company.company.country}
                        </Card.Text>

                        <div
                          className="company-stats d-flex justify-content-around border rounded"
                          style={{
                            margin: "0px -16px 10px -16px",
                          }}
                        >
                          <div className="stat-item text-center border-end">
                            <strong>{company.totalUsers || "0"}</strong>
                            <div>Total User</div>
                          </div>
                          <div className="stat-item text-center border-end">
                            <strong>{company.quotations || "0"}</strong>
                            <div>Quotations</div>
                          </div>
                          <div className="stat-item text-center">
                            <strong>{company.workOrders || "0"}</strong>
                            <div>Work Orders</div>
                          </div>
                        </div>

                        <Card.Text>
                          <strong>Admin:</strong> {company.user.first_name}{" "}
                          {company.user.last_name}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
