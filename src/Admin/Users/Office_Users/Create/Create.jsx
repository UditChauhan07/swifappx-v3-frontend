import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Header from "../../../../Components/Header/Header";

const Create = () => {
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
              <h4 className="mb-0">Enter User Details</h4>
            </div>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name" />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email Address*</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formContactNumber">
                    <Form.Label>Contact Number*</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter Contact Number"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter City" />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formState">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="Enter State" />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formZip">
                    <Form.Label>ZIP/Postal Code*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter ZIP/Postal Code"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>User's Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Enter Address"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formCountry">
                    <Form.Label>Country*</Form.Label>
                    <Form.Select required>
                      <option>Select Country</option>
                      <option>USA</option>
                      <option>Canada</option>
                      <option>India</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formRole">
                    <Form.Label>Choose Role*</Form.Label>
                    <Form.Select required>
                      <option>Company Staff Admin</option>
                      <option>Manager</option>
                      <option>Employee</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formProfilePicture">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>

                <Col md={6} className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    label="Activate this User"
                    id="formActivateUser"
                    defaultChecked
                  />
                </Col>
              </Row>

              <div className="text-center">
                <Button variant="primary" type="submit" className="me-2">
                  Save
                </Button>
                <Button variant="secondary" type="button">
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
