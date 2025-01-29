import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Header from "../../../../Components/Header/Header";

const CreateFieldUser = () => {
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
              <h4 className="mb-0">Enter Field User Details</h4>
            </div>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" required />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" required />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username<span className="text-danger">*</span></Form.Label>
                    <Form.Text className="d-block mb-1 text-muted">
                      Field User can login via this Username
                    </Form.Text>
                    <Form.Control type="text" placeholder="Enter Username" required />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                    <Form.Text className="d-block mb-1 text-muted">
                      Field User can login via this Password
                    </Form.Text>
                    <Form.Control type="password" placeholder="Enter Password" required />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formContactNumber">
                    <Form.Label>Contact Number<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="tel" placeholder="Enter Contact Number" required />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formProfilePicture">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formCountry">
                    <Form.Label>Country<span className="text-danger">*</span></Form.Label>
                    <Form.Select required>
                      <option>Select Country</option>
                      <option>USA</option>
                      <option>Canada</option>
                      <option>India</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address<span className="text-danger">*</span></Form.Label>
                    <Form.Control as="textarea" rows={2} placeholder="Enter Address" required />
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-center">
                <Button  type="submit" className="me-2" style={{
                  backgroundColor: "#8d28dd",
                  border:"none"
                }}>
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

export default CreateFieldUser;