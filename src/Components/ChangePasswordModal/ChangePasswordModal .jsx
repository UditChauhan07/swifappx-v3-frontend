import React, { useState } from "react";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
// import { changePasswordApi } from "../../../lib/store"; // adjust the import path as needed
import './ChangePass.css'

const ChangePasswordModal = ({ show, handleClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  // Get user information from localStorage (or via props/context as needed)
  const token = localStorage.getItem("UserToken");
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
  }
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     if (formData.newPassword !== formData.confirmPassword) {
//       setError(t("Passwords do not match. Please try again."));
//       return;
//     }

//     try {
//       const finalData = { id: userId, new_password: formData.confirmPassword };
//       const response = await changePasswordApi(finalData, token);
//       if (response.status === true) {
//         setSuccess(t("Password updated successfully!"));
//       } else {
//         setError(t("Failed to change password. Please try again."));
//       }
//       setFormData({ newPassword: "", confirmPassword: "" });
//     } catch (err) {
//       setError(t("Failed to change password. Please try again."));
//     }
//   };

  return (
    <Modal
    
      show={show}
      onHide={handleClose}
      centered
      backdropClassName="transparent-backdrop" // custom class if you want to tweak backdrop styling
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <Modal.Title >{t("Change Password")}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "transparent" }}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group
                controlId="formNewPassword"
                className="position-relative"
              >
                <Form.Label>{t("New Password")}*</Form.Label>
                <Form.Control
                  type={passwordVisibility.newPassword ? "text" : "password"}
                  placeholder={t("Enter new password")}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="link"
                  className="position-absolute end-0 translate-middle-y text-decoration-none"
                  style={{ top: "70%" }}
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  {passwordVisibility.newPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                controlId="formConfirmNewPassword"
                className="position-relative"
              >
                <Form.Label>{t("Confirm New Password")}*</Form.Label>
                <Form.Control
                  type={
                    passwordVisibility.confirmPassword ? "text" : "password"
                  }
                  placeholder={t("Confirm New Password")}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="link"
                  className="position-absolute end-0 translate-middle-y text-decoration-none"
                  style={{ top: "70%" }}
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {passwordVisibility.confirmPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <Button
              style={{ backgroundColor: "#8d28dd", border: "none" }}
              type="submit"
              className="me-3"
            >
              {t("Save")}
            </Button>
            <Button variant="secondary" type="button" onClick={handleClose}>
              {t("Cancel")}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
