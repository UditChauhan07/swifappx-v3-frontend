

    import React, { useState } from "react";
    import { Container, Row, Col, Image, Card } from "react-bootstrap";
    import { useLocation } from "react-router-dom";
    import Header from "../../../../Components/Header/Header";
    
    const OfficeUserDetails = () => {
        const location = useLocation();
        const { row } = location.state || {};
        console.log(row);
      return (
        <>
        <Header/>
        <div className="main-header-box mt-4">
            <div className="pages-box">
              <h4 className="mb-4">Office User Details</h4>
              <Container className="mt-4">
              <Row className="p-3">
                    <Col md={3} className="fw-bold">
                      Name:
                    </Col>
                    <Col>{row.first_name
                    }</Col>
               </Row>
              <Row className="p-3">
                    <Col md={3} className="fw-bold">
                      Address:
                    </Col>
                    <Col>{row.Address ? row.Address : row.city}</Col>
               </Row>
              <Row className="p-3">
                    <Col md={3} className="fw-bold">
                      Country:
                    </Col>
                    <Col>{row.country}</Col>
               </Row>
               <Row className="p-3">
                    <Col md={3} className="fw-bold">
                    Zip_code:
                    </Col>
                    <Col>{row.zip_code}</Col>
               </Row>
              <Row className="p-3">
                    <Col md={3} className="fw-bold">
                      Email:
                    </Col>
                    <Col>{row.email}</Col>
               </Row>
              <Row className="p-3">
                    <Col md={3} className="fw-bold">
                      Contact:
                    </Col>
                    <Col>{row.contact_number}</Col>
               </Row>
             
            
              </Container>
            </div>
          </div>  
        </>
      )
    }
    

    
export default OfficeUserDetails
