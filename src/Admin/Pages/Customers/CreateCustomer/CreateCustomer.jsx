import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Header from "../../../../Components/Header/Header";

const CreateCustomer = () => {
  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <div className="">
          <div
              className="form-header mb-4"
              style={{
                backgroundColor: "#8d28dd",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              <h4 className="mb-0">Enter Customer Details</h4>
            </div>
            <Form>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" required />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formType">
                    <Form.Label>Type<span className="text-danger">*</span></Form.Label>
                    <Form.Select required>
                      <option>Individual</option>
                      <option>Company</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email Address<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email Address"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formRemarks">
                    <Form.Label>Initial Remarks</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Initial Remarks"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-center">
                <Button  type="submit" className="me-2" style={{
                  background:"#8d28dd",
                  border:"none"
                }}>
                  Save
                </Button>
                <Button variant="secondary" type="button">
                  Back to Customer List
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCustomer;
