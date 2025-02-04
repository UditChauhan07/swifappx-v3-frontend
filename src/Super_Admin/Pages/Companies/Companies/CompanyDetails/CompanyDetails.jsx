import React, { useState } from "react";
import Header from "../../../../../Components/Header/Header";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const CompanyDetails = () => {
  const location = useLocation();
  const { company } = location.state || {};
  console.log('company',company);
  const base64String =company.company.company_logo

  function formatTimestamp(timestamp) {
    // Extract seconds and nanoseconds
    const { _seconds, _nanoseconds } = timestamp;

    // Create a Date object
    const date = new Date(_seconds * 1000 + _nanoseconds / 1000000);

    // Define options for formatting
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    // Format the date
    return date.toLocaleString("en-US", options);
  }

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <h4 className="mb-4">Company Details</h4>
          <Container className="mt-4">
            <Card className="p-2 shadow-sm">
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Name:
                </Col>
                <Col>{company.company.company_name}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Logo:
                </Col>
                <Col>
                  {company.company.company_logo ? (
                    <Image
                      src={company.company.company_logo}
                      alt="Logo"
                      fluid
                      rounded
                    />
                  ) : (
                    <Image
                      src="https://swif.truet.net/public/swifCompany/noLogo.jpg"
                      alt="Logo"
                      fluid
                      rounded
                      style={{height:"100px",width:"200px"}}
                    />
                  )}
                </Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Address:
                </Col>
                <Col>{company.company.address_line_1}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company City:
                </Col>
                <Col>{company.company.city}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company State:
                </Col>
                <Col>{company.company.currency}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Zip:
                </Col>
                <Col>{company.company.zip_postal_code}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Currency:
                </Col>
                <Col>{company.company.currency}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Time Zone:
                </Col>
                <Col>{company.company.time_zone}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Working Day:
                </Col>
                <Col>
                  {company.company.workingDays.map((day, index) => (
                    <span
                      key={index}
                      className=" text-white me-2"
                      style={{
                        fontSize: "0.9rem",
                        borderRadius: "10px",
                        padding: "8px 12px",
                        background: "#8d28dd",
                      }}
                    >
                      {day}
                    </span>
                  ))}
                </Col>
              </Row>

              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  gst:
                </Col>
                <Col>--</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Expected Time Required:
                </Col>
                <Col>--</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Office Email Address:
                </Col>
                <Col>{company.company.company_office_email}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Contact Person:
                </Col>
                <Col>{company.company.company_contact_person_name}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Per Quotation Cost:
                </Col>
                <Col>{company.company.quotationCost}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Base Work Order Cost:
                </Col>
                <Col>{company.company.executionWorkOrderCost}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Work Order Execution Cost:
                </Col>
                <Col>{company.company.primaryWorkOrderCost}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Admin Name:
                </Col>
                <Col>{company.company.adminName}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Admin Email:
                </Col>
                <Col>{company.company.adminEmail}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Admin Contact Number:
                </Col>
                <Col>{company.company.adminContact}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Admin Address:
                </Col>
                <Col>{company.company.customerAddressFormat}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Admin City:
                </Col>
                <Col>--</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Admin State:
                </Col>
                <Col>--</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Admin Country:
                </Col>
                <Col>--</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Package:
                </Col>
                <Col>{company.company.package}</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Company Admin last Login:
                </Col>
                <Col>--</Col>
              </Row>
              <Row className="p-3">
                <Col md={3} className="fw-bold">
                  Created At:
                </Col>
                <Col>{formatTimestamp(company.company.created_at)}</Col>
              </Row>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
