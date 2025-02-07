import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Card,
} from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import { LoginApi } from "../../lib/store";
import { useNavigate } from "react-router-dom";
import { usePermissions } from "../../context/PermissionContext";

const Login = () => {
  const {setPermissions}=usePermissions();
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
        localStorage.setItem("language", "en");
        setPermissions(response.rolesPermissions||[])
        setisLoading(false);
        if (response.user.role === "Admin" || response.user.role === "office_Admin") {
          Navigate("/dashboard/admin");
        } else {
          Navigate("/dashboard");
        }
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
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="shadow-lg p-4 rounded-4 w-50">
          <div className="text-center mb-3">
            <img
              src="https://demos.creative-tim.com/material-dashboard/assets/img/logo-ct-dark.png"
              alt="Logo"
              width="80"
            />
          </div>

          <h4 className="text-center fw-bold mb-4">Sign in to Your Account</h4>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {error && (
              <div className="text-danger mb-3 text-center">{error}</div>
            )}

            <div className="d-grid">
              <Button
                variant="dark"
                type="submit"
                disabled={isLoading}
                className="rounded-pill"
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" className="me-2" />
                ) : (
                  "Login"
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
        </Card>
      </Container>
    </div>
  );
};

export default Login;
