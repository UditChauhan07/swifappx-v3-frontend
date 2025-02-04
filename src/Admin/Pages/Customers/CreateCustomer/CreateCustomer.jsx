import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Header from "../../../../Components/Header/Header";
import { createCustomerApi } from "../../../../lib/store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {
  const navigate = useNavigate()
  const [adminName, setadminName] = useState(localStorage.getItem("name"))
  const [formData, setFormData] = useState({
    name: "",
    type: "Individual",
    email: "",
    initial_remarks: "",
    company_id: localStorage.getItem("userId"),
    created_by:adminName
  });
  const [token, settoken] = useState(localStorage.getItem("UserToken"))

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation errors when the user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "" };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to create customer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, create it!",
      cancelButtonText: "No, cancel",
    });

    if (!result.isConfirmed) {
      console.log("Customer creation was cancelled");
      return;
    }

    Swal.fire({
      title: "Processing...",
      text: "Creating Customer, please wait.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await createCustomerApi(formData,token);

      Swal.close();
      console.log("Form submitted successfully:", formData);

      if (response.status === true) {
        Swal.fire({
          title: "Success!",
          text: "Customer created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/customers/list"); // Navigate after confirmation
        });;
        setFormData({
          name: "",
          type: "Individual",
          email: "",
          initial_remarks: "",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response.message || "There was an error creating the Customer.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
      setFormData({
        name: "",
        type: "Individual",
        email: "",
        initial_remarks: "",
      });
    } catch (error) {
      Swal.close();
      console.error("API Error:", error);

      Swal.fire({
        title: "API Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <div>
            <div
              className="form-header mb-4"
              style={{
                backgroundColor: "#2e2e32",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              <h4 className="mb-0">Enter Customer Details</h4>
            </div>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>
                      Name<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formType">
                    <Form.Label>
                      Type<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Individual">Individual</option>
                      <option value="Company">Company</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>
                      Email Address<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3" controlId="forminitial_remarks">
                    <Form.Label>Initial Remarks</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Initial initial_remarks"
                      name="initial_remarks"
                      value={formData.initial_remarks}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-center">
                <Button
                  type="submit"
                  className="me-2"
                  style={{
                    background: "#2e2e32",
                    border: "none",
                  }}
                >
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
