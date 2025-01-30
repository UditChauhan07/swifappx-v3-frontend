import React, { useState } from "react";
import { Container, Row, Col, Form, Button,Spinner  } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import { LoginApi } from "../../lib/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  console.log("isLoadinggg", isLoading);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("dasd", name);
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setisLoading(true);
    // console.log("formData",formData)
    try {
      const response = await LoginApi(formData);
      console.log("resss", response);
      if (response.status === true) {
        // Save user details in localStorage
        localStorage.setItem("UserToken", response.token);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("Role", response.user.role);
        localStorage.setItem("userEmail", response.user.email);
        localStorage.setItem("profilePic", response.user.profile_picture);
        localStorage.setItem("name", response.user.first_name);
        localStorage.setItem("companyId", response.company_id);

        setisLoading(false);
        Navigate("/dashboard");
      } else {
        setError(response.message);
      }
    } catch (apiError) {
      console.error("Login API Error:", apiError.message);
      setError("A server error occurred. Please try again later.");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Container fluid className="vh-100">
        <Row className="h-100">
          <Col md={6} className="login-left d-none d-md-block">
            <div className="left-image-wrapper"></div>
          </Col>

          <Col
            md={6}
            className="d-flex align-items-center justify-content-center bg-white"
          >
            <div className="p-4 border rounded shadow-sm w-75">
              <div className="text-center mb-4">
                <img
                  width={"150px"}
                  src="https://swif.truet.net/public/swifCompany/logo/logo.png"
                  alt="Logo"
                />
              </div>

              <h5 className="mb-3 fw-bold text-center">Access My Account</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>
                    <i className="bi bi-person-circle me-2"></i>Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>
                    <i className="bi bi-lock-fill me-2"></i>Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                {error && <div className="text-danger mb-3">{error}</div>}

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                  {/* <a href="#forgot-password" className="text-decoration-none">
                    Forgot your password?
                  </a> */}
                </div>

                <div className="d-grid mb-3">
                  <Button variant="dark" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Loading...
                      </>
                    ) : (
                      "LOGIN"
                    )}
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-4">
                <small className="text-muted">
                  By signing in or clicking "Login", you agree to our{" "}
                  <a href="#terms" className="text-decoration-none">
                    Terms of Service
                  </a>
                  . Please also read our{" "}
                  <a href="#privacy" className="text-decoration-none">
                    Privacy Policy
                  </a>
                  .
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
