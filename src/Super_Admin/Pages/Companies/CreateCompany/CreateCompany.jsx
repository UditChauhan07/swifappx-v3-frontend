import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import Header from "../../../../Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { createCompanyApi } from "../../../../lib/store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateCompany = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Super Admin Details
    firstName: "",
    lastName: "",
    profilePicture: null,
    contactNumber: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",

    // Step 2: Company Basic Details
    companyName: "",
    companyLogo: null,
    currency: "",
    timeZone: "",
    taxName: "",
    taxPercentage: "",
    certificationName: "",
    certificationNumber: "",
    additionalCertifications: [],

    // Step 3: Contact Information
    addressLine1: "",
    addressLine2: "",
    contactCity: "",
    contactState: "",
    contactCountry: "",
    contactZip: "",
    contactPerson: "",
    contactPhone: "",
    officePhone: "",
    officeEmail: "",

    // Step 4: Other Settings
    package: "Full Pack",
    packageDescritption: [
      "Each Quotation creation Charge will be 0.15/quotation.",
      "Each Contract creation Charge will be 0.00/contract.",
      "Each Work Order creation Charge will be 0.10/work order.",
      "Each Work Order charge further 0.40 after complete Work Order.",
    ],
    workOrderTime: "04:00",
    quotationCost: "0.15",
    freeQuotations: "51",
    primaryWorkOrderCost: "0.10",
    executionWorkOrderCost: "0.40",
    freeWorkOrders: "101",
    customerAddressFormat: "US",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    companyStatus: true,
  });
  const navigate = useNavigate();
  const [token, settoken] = useState(localStorage.getItem("UserToken"));
  console.log("formData", formData);
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const currentErrors = validateStep(currentStep);
    if (Object.keys(currentErrors).length === 0) {
      setErrors({});
      if (currentStep < 4) setCurrentStep((prev) => prev + 1);
    } else {
      setErrors(currentErrors);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      const isAlphanumeric = /^[a-zA-Z0-9]*$/;
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isPhone = /^[0-9]{10,15}$/;
      const isAlpha = /^[a-zA-Z ]*$/;
      const isAlphanumericWithSpaces = /^[a-zA-Z0-9 ]*$/;

      switch (field) {
        case "firstName":
          if (
            !value.trim() ||
            value.length < 1 ||
            value.length > 60 ||
            !isAlpha.test(value)
          ) {
            newErrors.firstName =
              "First Name must be 1-60 characters, letters only.";
          } else {
            delete newErrors.firstName;
          }
          break;

        case "lastName":
          if (
            !value.trim() ||
            value.length < 1 ||
            value.length > 60 ||
            !isAlpha.test(value)
          ) {
            newErrors.lastName =
              "Last Name must be 1-60 characters, letters only.";
          } else {
            delete newErrors.lastName;
          }
          break;

        case "email":
          if (!value.trim() || !isEmail.test(value)) {
            newErrors.email = "Valid Email Address is required.";
          } else {
            delete newErrors.email;
          }
          break;

        case "password":
          if (
            !value.trim() ||
            value.length < 1 ||
            value.length > 60 ||
            !isAlphanumeric.test(value)
          ) {
            newErrors.password =
              "Password must be 1-60 alphanumeric characters, no spaces.";
          } else {
            delete newErrors.password;
          }
          break;

        case "contactNumber":
          if (!value.trim() || !isPhone.test(value)) {
            newErrors.contactNumber =
              "Valid Contact Number (10-15 digits) is required.";
          } else {
            delete newErrors.contactNumber;
          }
          break;

        case "address":
          if (value.trim() && value.length < 5) {
            newErrors.address = "Address must be at least 5 characters long.";
          } else {
            delete newErrors.address;
          }
          break;

        case "city":
          if (
            !value.trim() ||
            value.length < 2 ||
            value.length > 60 ||
            !isAlpha.test(value)
          ) {
            newErrors.city = "City must be 2-60 characters, letters only.";
          } else {
            delete newErrors.city;
          }
          break;

        case "state":
          if (
            !value.trim() ||
            value.length < 2 ||
            value.length > 60 ||
            !isAlpha.test(value)
          ) {
            newErrors.state = "State must be 2-60 characters, letters only.";
          } else {
            delete newErrors.state;
          }
          break;

        case "zip":
          if (
            !value.trim() ||
            value.length < 3 ||
            !isAlphanumericWithSpaces.test(value)
          ) {
            newErrors.zip =
              "ZIP/Postal Code must be at least 3 characters, alphanumeric only.";
          } else {
            delete newErrors.zip;
          }
          break;

        case "companyName":
          if (
            !value.trim() ||
            value.length < 1 ||
            value.length > 60 ||
            !isAlpha.test(value)
          ) {
            newErrors.companyName =
              "Company Name must be 1-60 characters, no numbers.";
          } else {
            delete newErrors.companyName;
          }
          break;

        case "currency":
          if (!value) {
            newErrors.currency = "Currency is required.";
          } else {
            delete newErrors.currency;
          }
          break;

        case "timeZone":
          if (!value) {
            newErrors.timeZone = "Time Zone is required.";
          } else {
            delete newErrors.timeZone;
          }
          break;

        case "taxName":
          if (
            !value.trim() ||
            value.length < 1 ||
            value.length > 60 ||
            !isAlpha.test(value)
          ) {
            newErrors.taxName =
              "Tax Name must be 1-60 characters, letters only.";
          } else {
            delete newErrors.taxName;
          }
          break;

        case "taxPercentage":
          if (isNaN(value) || value < 0 || value > 40) {
            newErrors.taxPercentage =
              "Tax Percentage must be a number between 0 and 40.";
          } else {
            delete newErrors.taxPercentage;
          }
          break;

        case "certificationName":
          if (value.trim() && value.length < 3) {
            newErrors.certificationName =
              "Certification Name must be at least 3 characters.";
          } else {
            delete newErrors.certificationName;
          }
          break;

        case "certificationNumber":
          if (value.trim() && value.length < 3) {
            newErrors.certificationNumber =
              "Certification Number must be at least 3 characters.";
          } else {
            delete newErrors.certificationNumber;
          }
          break;

        case "addressLine1":
          if (!value.trim() || value.length < 5) {
            newErrors.addressLine1 =
              "Address Line 1 must be at least 5 characters.";
          } else {
            delete newErrors.addressLine1;
          }
          break;

        case "addressLine2":
          if (value.trim() && value.length < 5) {
            newErrors.addressLine2 =
              "Address Line 2 must be at least 5 characters.";
          } else {
            delete newErrors.addressLine2;
          }
          break;

        case "contactCity":
          if (
            !value.trim() ||
            value.length < 2 ||
            value.length > 60 ||
            !isAlpha.test(value)
          ) {
            newErrors.contactCity =
              "City must be 2-60 characters, letters only.";
          } else {
            delete newErrors.contactCity;
          }
          break;

        case "contactState":
          if (
            !value.trim() ||
            value.length < 2 ||
            value.length > 60 ||
            !isAlpha.test(value)
          ) {
            newErrors.contactState =
              "State must be 2-60 characters, letters only.";
          } else {
            delete newErrors.contactState;
          }
          break;

        case "contactZip":
          if (
            !value.trim() ||
            value.length < 3 ||
            !isAlphanumericWithSpaces.test(value)
          ) {
            newErrors.contactZip =
              "ZIP/Postal Code must be at least 3 characters, alphanumeric only.";
          } else {
            delete newErrors.contactZip;
          }
          break;

        case "contactPerson":
          if (!value.trim()) {
            newErrors.contactPerson = "Contact Person Required";
          } else {
            delete newErrors.contactPerson;
          }
          break;

        case "officePhone":
          if (!value.trim() || !isPhone.test(value)) {
            newErrors.officePhone =
              "Valid Office Phone (10-15 digits) is required.";
          } else {
            delete newErrors.officePhone;
          }
          break;

        case "officeEmail":
          if (!value.trim() || !isEmail.test(value)) {
            newErrors.officeEmail = "Valid Office Email Address is required.";
          } else {
            delete newErrors.officeEmail;
          }
          break;

        case "workOrderTime":
          if (!value.trim()) {
            newErrors.workOrderTime = "Default Work Order Time is required.";
          } else {
            delete newErrors.workOrderTime;
          }
          break;

        case "quotationCost":
          if (isNaN(value) || value < 0 || value > 1000) {
            newErrors.quotationCost =
              "Quotation Cost must be a number between 0 and 1000.";
          } else {
            delete newErrors.quotationCost;
          }
          break;

        case "primaryWorkOrderCost":
          if (isNaN(value) || value < 0 || value > 1000) {
            newErrors.primaryWorkOrderCost =
              "Primary Work Order Cost must be a number between 0 and 1000.";
          } else {
            delete newErrors.primaryWorkOrderCost;
          }
          break;

        case "executionWorkOrderCost":
          if (isNaN(value) || value < 0 || value > 1000) {
            newErrors.executionWorkOrderCost =
              "Execution Work Order Cost must be a number between 0 and 1000.";
          } else {
            delete newErrors.executionWorkOrderCost;
          }
          break;

        default:
          break;
      }
      return newErrors;
    });

    // Existing validation logic...
    // No change needed here.
  };

  const validateStep = (step) => {
    const newErrors = {};
    const isAlphanumeric = /^[a-zA-Z0-9]*$/;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isPhone = /^[0-9]{10,15}$/;
    const isAlpha = /^[a-zA-Z ]*$/;
    const isAlphanumericWithSpaces = /^[a-zA-Z0-9 ]*$/;

    switch (step) {
      case 1:
        if (
          !formData.firstName ||
          !formData.firstName.trim() ||
          formData.firstName.length < 1 ||
          formData.firstName.length > 60 ||
          !isAlpha.test(formData.firstName)
        )
          newErrors.firstName =
            "First Name must be 1-60 characters, letters only.";
        if (
          !formData.lastName ||
          !formData.lastName.trim() ||
          formData.lastName.length < 1 ||
          formData.lastName.length > 60 ||
          !isAlpha.test(formData.lastName)
        )
          newErrors.lastName =
            "Last Name must be 1-60 characters, letters only.";
        if (
          !formData.email ||
          !formData.email.trim() ||
          !isEmail.test(formData.email)
        )
          newErrors.email = "Valid Email Address is required.";
        if (
          !formData.password ||
          !formData.password.trim() ||
          formData.password.length < 1 ||
          formData.password.length > 60 ||
          !isAlphanumeric.test(formData.password)
        )
          newErrors.password =
            "Password must be 1-60 alphanumeric characters, no spaces.";

        if (
          !formData.contactNumber ||
          !formData.contactNumber.trim() ||
          !isPhone.test(formData.contactNumber)
        )
          newErrors.contactNumber =
            "Valid Contact Number (10-15 digits) is required.";
        break;

      case 2:
        if (
          !formData.companyName ||
          !formData.companyName.trim() ||
          formData.companyName.length < 1 ||
          formData.companyName.length > 60 ||
          !isAlpha.test(formData.companyName)
        )
          newErrors.companyName =
            "Company Name must be 1-60 characters, no numbers.";
        if (!formData.currency) newErrors.currency = "Currency is required.";
        if (!formData.timeZone) newErrors.timeZone = "Time Zone is required.";
        if (
          !formData.taxName ||
          !formData.taxName.trim() ||
          formData.taxName.length < 1 ||
          formData.taxName.length > 60 ||
          !isAlpha.test(formData.taxName)
        )
          newErrors.taxName = "Tax Name must be 1-60 characters, letters only.";
        if (
          !formData.taxPercentage ||
          !formData.taxPercentage.trim() ||
          isNaN(formData.taxPercentage) ||
          formData.taxPercentage < 0 ||
          formData.taxPercentage > 40
        )
          newErrors.taxPercentage =
            "Tax Percentage must be a number between 0 and 40.";

        break;

      case 3:
        if (
          !formData.addressLine1 ||
          !formData.addressLine1.trim() ||
          formData.addressLine1.length < 5
        )
          newErrors.addressLine1 =
            "Address Line 1 must be at least 5 characters.";
        // if (formData.addressLine2 && formData.addressLine2.length < 5)
        //   newErrors.addressLine2 =
        //     "Address Line 2 must be at least 5 characters.";
        if (
          !formData.contactCity ||
          !formData.contactCity.trim() ||
          formData.contactCity.length < 2 ||
          formData.contactCity.length > 60 ||
          !isAlpha.test(formData.contactCity)
        )
          newErrors.contactCity = "City must be 2-60 characters, letters only.";
        if (
          !formData.contactState ||
          !formData.contactState.trim() ||
          formData.contactState.length < 2 ||
          formData.contactState.length > 60 ||
          !isAlpha.test(formData.contactState)
        )
          newErrors.contactState =
            "State must be 2-60 characters, letters only.";
        if (
          !formData.contactZip ||
          !formData.contactZip.trim() ||
          formData.contactZip.length < 3 ||
          !isAlphanumericWithSpaces.test(formData.contactZip)
        )
          newErrors.contactZip =
            "ZIP/Postal Code must be at least 3 characters, alphanumeric only.";
        if (!formData.contactPerson || !formData.contactPerson.trim())
          newErrors.contactPerson = "Contact Person is required.";
        if (!formData.contactPhone.trim())
          newErrors.contactPhone = "Contact Person Phone is required.";
        if (!formData.officePhone.trim())
          newErrors.officePhone = "Office Phone is required.";
        if (!formData.officeEmail.trim())
          newErrors.officeEmail = "Office Email Address is required.";
        break;

      case 4:
        if (!formData.workOrderTime || !formData.workOrderTime.trim())
          newErrors.workOrderTime = "Default Work Order Time is required.";
        if (
          !formData.quotationCost ||
          !formData.quotationCost.trim() ||
          isNaN(formData.quotationCost) ||
          formData.quotationCost < 0 ||
          formData.quotationCost > 1000
        )
          newErrors.quotationCost =
            "Quotation Cost must be a number between 0 and 1000.";
        if (
          !formData.primaryWorkOrderCost ||
          !formData.primaryWorkOrderCost.trim() ||
          isNaN(formData.primaryWorkOrderCost) ||
          formData.primaryWorkOrderCost < 0 ||
          formData.primaryWorkOrderCost > 1000
        )
          newErrors.primaryWorkOrderCost =
            "Primary Work Order Cost must be a number between 0 and 1000.";
        if (
          !formData.executionWorkOrderCost ||
          !formData.executionWorkOrderCost.trim() ||
          isNaN(formData.executionWorkOrderCost) ||
          formData.executionWorkOrderCost < 0 ||
          formData.executionWorkOrderCost > 1000
        )
          newErrors.executionWorkOrderCost =
            "Execution Work Order Cost must be a number between 0 and 1000.";
        break;

      default:
        break;
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const allCertificates = [
      {
        name: formData.certificationName,
        number: formData.certificationNumber,
      },
      ...formData.additionalCertifications,
    ];

    const companyData = {
      company_name: formData.companyName,
      company_logo: formData.companyLogo,
      currency: formData.currency,
      time_zone: formData.timeZone,
      tax_name: formData.taxName,
      tax_percentage: formData.taxPercentage,
      certificates: allCertificates,

      address_line_1: formData.addressLine1,
      address_line_2: formData.addressLine2,
      city: formData.contactCity,
      country: formData.contactCountry,
      zip_postal_code: formData.contactZip,

      company_contact_person_name: formData.contactPerson,
      contact_person_phone: formData.contactPhone,
      company_office_phone: formData.officePhone,
      company_office_email: formData.officeEmail,

      package: formData.package,
      packageDescritption: formData.packageDescritption,
      workOrderTime: formData.workOrderTime,
      primaryWorkOrderCost: formData.primaryWorkOrderCost,
      quotationCost: formData.quotationCost,
      executionWorkOrderCost: formData.executionWorkOrderCost,
      freeQuotations: formData.freeQuotations,
      freeWorkOrders: formData.freeWorkOrders,
      customerAddressFormat: formData.customerAddressFormat,
      workingDays: formData.workingDays,
      companyStatus: formData.companyStatus,
    };
    const userdata = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      Address: formData.address,
      city: formData.city,
      state: formData.state,
      contact_number: formData.contactNumber,
      country: formData.country,
      email: formData.email,
      password: formData.password,
      zip_code: formData.zip,
    };

    console.log("Transformed finalData", companyData, "\navigator", userdata);

    const formDataToSend = new FormData();
    formDataToSend.append("userdata", JSON.stringify(userdata)); // Stringify userdata
    formDataToSend.append("companyData", JSON.stringify(companyData)); // Stringify companyData
    if (formData.profilePicture) {
      formDataToSend.append("profile_picture", formData.profilePicture);
    }
    if (formData.companyLogo) {
      formDataToSend.append("company_logo", formData.companyLogo);
    }

    console.log("Final FormData: ", formDataToSend);
    try {
      // Show confirmation alert before API call
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to create this company?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, create it!",
        cancelButtonText: "No, cancel",
      });

      if (!result.isConfirmed) {
        console.log("Company creation cancelled");
        return;
      }

      // Show loading alert while API is executing
      Swal.fire({
        title: "Processing...",
        text: "Creating company, please wait.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Call API
      const response = await createCompanyApi(formDataToSend, token);
      console.log("response", response);

      // Close loading alert
      Swal.close();

      if (response.success) {
        Swal.fire({
          title: "Success!",
          text: "Company created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/customers/list"); // Navigate after confirmation
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response.message || "There was an error creating the company.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.close(); // Ensure loading is closed
      console.error("Error creating company", error);

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
      <div className="main-header-box">
        {currentStep === 1 && (
          <Container
            className="mt-4 pages-box"
            style={{
              backgroundColor: "white",
              borderRadius: "22px",
              padding: "25px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="form-header mb-4"
              style={{
                backgroundColor: "#8d28dd",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              <h4 className="mb-0">Company Super Admin Details</h4>
            </div>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> First Name:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Super Admin First Name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Last Name:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Super Admin Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Profile Picture:</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) =>
                        handleChange("profilePicture", e.target.files[0])
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Contact Number:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Super Admin Contact Number"
                      value={formData.contactNumber}
                      onChange={(e) =>
                        handleChange("contactNumber", e.target.value)
                      }
                      isInvalid={!!errors.contactNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contactNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Email Address:
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Super Admin Email Address"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Admin Password:
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Super Admin Password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Super Admin Address"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>City:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Super Admin City"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>State:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Super Admin State"
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country:</Form.Label>
                    <Form.Select
                      value={formData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                    >
                      <option>Select Country</option>
                      <option>India</option>
                      <option>USA</option>
                      <option>UK</option>
                      <option>Canada</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>ZIP/Postal Code:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Super Admin Zipcode"
                      value={formData.zip}
                      onChange={(e) => handleChange("zip", e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          </Container>
        )}
        {currentStep === 2 && (
          <Container
            className="mt-4"
            style={{
              backgroundColor: "white",
              borderRadius: "22px",
              padding: "25px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="form-header mb-4"
              style={{
                backgroundColor: "#8d28dd",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              <h4 className="mb-0">Company Basic Details (Mandatory)</h4>
            </div>
            <Form className="mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Company Name:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Name"
                      value={formData.companyName}
                      onChange={(e) =>
                        handleChange("companyName", e.target.value)
                      }
                      isInvalid={!!errors.companyName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.companyName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Logo:</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) =>
                        handleChange("companyLogo", e.target.files[0])
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Currency:
                    </Form.Label>
                    <Form.Select
                      value={formData.currency}
                      onChange={(e) => handleChange("currency", e.target.value)}
                      isInvalid={!!errors.currency}
                    >
                      <option value="">Select Currency</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="INR">INR</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.currency}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Time Zone:
                    </Form.Label>
                    <Form.Select
                      value={formData.timeZone}
                      onChange={(e) => handleChange("timeZone", e.target.value)}
                      isInvalid={!!errors.timeZone}
                    >
                      <option value="">Select Time Zone</option>
                      <option value="GMT">GMT</option>
                      <option value="PST">PST</option>
                      <option value="IST">IST</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.timeZone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Tax Name:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Tax Name"
                      value={formData.taxName}
                      onChange={(e) => handleChange("taxName", e.target.value)}
                      isInvalid={!!errors.taxName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.taxName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Tax Percentage:
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {" "}
                        (max: 40%)
                      </span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        placeholder="Enter Company Tax Percentage"
                        value={formData.taxPercentage}
                        onChange={(e) =>
                          handleChange("taxPercentage", e.target.value)
                        }
                        isInvalid={!!errors.taxPercentage}
                        max={40}
                      />

                      <InputGroup.Text>%</InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.taxPercentage}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Certification Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Certification Name"
                      value={formData.certificationName}
                      onChange={(e) =>
                        handleChange("certificationName", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Certification Number:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Certification Num"
                      value={formData.certificationNumber}
                      onChange={(e) =>
                        handleChange("certificationNumber", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button
                variant="outline-primary"
                type="button"
                className="mt-3"
                style={{
                  borderColor: "#8d28dd",
                  color: "#8d28dd",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  const newCertification = { name: "", number: "" };
                  const updatedCertifications = [
                    ...(formData.additionalCertifications || []),
                    newCertification,
                  ];
                  handleChange(
                    "additionalCertifications",
                    updatedCertifications
                  );
                }}
              >
                Add More
              </Button>

              {formData.additionalCertifications?.map((cert, index) => (
                <Row key={index} className="mt-3">
                  <Col md={5}>
                    <Form.Group className="mb-3">
                      <Form.Label>Additional Certification Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Additional Certification Name"
                        value={cert.name}
                        onChange={(e) => {
                          const updatedCertifications = [
                            ...formData.additionalCertifications,
                          ];
                          updatedCertifications[index].name = e.target.value;
                          handleChange(
                            "additionalCertifications",
                            updatedCertifications
                          );
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group className="mb-3">
                      <Form.Label>Additional Certification Number:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Additional Certification Number"
                        value={cert.number}
                        onChange={(e) => {
                          const updatedCertifications = [
                            ...formData.additionalCertifications,
                          ];
                          updatedCertifications[index].number = e.target.value;
                          handleChange(
                            "additionalCertifications",
                            updatedCertifications
                          );
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    <Button
                      variant="danger"
                      onClick={() => {
                        const updatedCertifications =
                          formData.additionalCertifications.filter(
                            (_, i) => i !== index
                          );
                        handleChange(
                          "additionalCertifications",
                          updatedCertifications
                        );
                      }}
                    >
                      X
                    </Button>
                  </Col>
                </Row>
              ))}
            </Form>
            <Button
              variant="secondary"
              onClick={handlePrevious}
              className="me-2"
            >
              Previous
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          </Container>
        )}

        {currentStep === 3 && (
          <Container
            className="mt-4"
            style={{
              backgroundColor: "white",
              borderRadius: "22px",
              padding: "25px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="form-header mb-4"
              style={{
                backgroundColor: "#8d28dd",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              <h4 className="mb-0">Company Contact Information</h4>
            </div>
            <Form>
              <Row>
                {/* Left Column */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Address Line 1:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Address"
                      value={formData.addressLine1}
                      onChange={(e) =>
                        handleChange("addressLine1", e.target.value)
                      }
                      isInvalid={!!errors.addressLine1}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.addressLine1}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address Line 2:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Address line 2"
                      value={formData.addressLine2}
                      onChange={(e) =>
                        handleChange("addressLine2", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> City:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Address's City"
                      value={formData.contactCity}
                      onChange={(e) =>
                        handleChange("contactCity", e.target.value)
                      }
                      isInvalid={!!errors.contactCity}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contactCity}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> State:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Address's State"
                      value={formData.contactState}
                      onChange={(e) =>
                        handleChange("contactState", e.target.value)
                      }
                      isInvalid={!!errors.contactState}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contactState}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Country:
                    </Form.Label>
                    <Form.Select
                      value={formData.contactCountry}
                      onChange={(e) =>
                        handleChange("contactCountry", e.target.value)
                      }
                      isInvalid={!!errors.contactCountry}
                    >
                      <option value="">Select Company Address's Country</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.contactCountry}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> ZIP/Postal Code:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Address's Zipcode"
                      value={formData.contactZip}
                      onChange={(e) =>
                        handleChange("contactZip", e.target.value)
                      }
                      isInvalid={!!errors.contactZip}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contactZip}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Right Column */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Company Contact
                      Person:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Contact Person"
                      value={formData.contactPerson}
                      onChange={(e) =>
                        handleChange("contactPerson", e.target.value)
                      }
                      isInvalid={!!errors.contactPerson}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contactPerson}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Contact Person
                      Phone:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Person Phone"
                      value={formData.contactPhone}
                      onChange={(e) =>
                        handleChange("contactPhone", e.target.value)
                      }
                      isInvalid={!!errors.contactPhone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contactPhone}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Company Office
                      Phone:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Office Phone"
                      value={formData.officePhone}
                      onChange={(e) =>
                        handleChange("officePhone", e.target.value)
                      }
                      isInvalid={!!errors.officePhone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.officePhone}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <span className="text-danger">*</span> Company Office
                      Email Address:
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Company Office Email Address"
                      value={formData.officeEmail}
                      onChange={(e) =>
                        handleChange("officeEmail", e.target.value)
                      }
                      isInvalid={!!errors.officeEmail}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.officeEmail}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Button
              variant="secondary"
              onClick={handlePrevious}
              className="me-2"
            >
              Previous
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          </Container>
        )}
        {currentStep === 4 && (
          <Container
            className="mt-4"
            style={{
              backgroundColor: "white",
              borderRadius: "22px",
              padding: "25px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="form-header mb-4"
              style={{
                backgroundColor: "#8d28dd",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              <h4 className="mb-0">Other Company Settings</h4>
            </div>
            <Form>
              {/* Select Package */}
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Select Package:</Form.Label>
                    <div>
                      <Button
                        variant={
                          formData.package === "CRM Only"
                            ? "primary"
                            : "outline-secondary"
                        }
                        className="me-2"
                        onClick={() => {
                          handleChange("package", "CRM Only");
                          handleChange("packageDescritption", [
                            "Each Quotation creation Charge will be 0.15/quotation.",
                          ]);
                        }}
                      >
                        CRM Only
                      </Button>
                      <Button
                        variant={
                          formData.package === "Field Pack"
                            ? "primary"
                            : "outline-secondary"
                        }
                        className="me-2"
                        onClick={() => {
                          handleChange("package", "Field Pack");
                          handleChange("packageDescritption", [
                            "Each Contract creation Charge will be 0.00/contract.",
                            "Each Work Order creation Charge will be 0.10/work order.",
                            "Each Work Order charge further 0.40 after complete Work Order.",
                          ]);
                        }}
                      >
                        Field Pack
                      </Button>
                      <Button
                        variant={
                          formData.package === "Full Pack"
                            ? "primary"
                            : "outline-secondary"
                        }
                        onClick={() => {
                          handleChange("package", "Full Pack");
                          handleChange("packageDescritption", [
                            "Each Quotation creation Charge will be 0.15/quotation.",
                            "Each Contract creation Charge will be 0.00/contract.",
                            "Each Work Order creation Charge will be 0.10/work order.",
                            "Each Work Order charge further 0.40 after complete Work Order.",
                          ]);
                        }}
                      >
                        Full Pack
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Packages Description:</Form.Label>
                    <ul className="mb-0">
                      {formData.package === "CRM Only" && (
                        <li>
                          Each Quotation creation Charge will be 0.15/quotation.
                        </li>
                      )}
                      {formData.package === "Field Pack" && (
                        <>
                          <li>
                            Each Contract creation Charge will be 0.00/contract.
                          </li>
                          <li>
                            Each Work Order creation Charge will be 0.10/work
                            order.
                          </li>
                          <li>
                            Each Work Order charge further 0.40 after complete
                            Work Order.
                          </li>
                        </>
                      )}
                      {formData.package === "Full Pack" && (
                        <>
                          <li>
                            Each Quotation creation Charge will be
                            0.15/quotation.
                          </li>
                          <li>
                            Each Contract creation Charge will be 0.00/contract.
                          </li>
                          <li>
                            Each Work Order creation Charge will be 0.10/work
                            order.
                          </li>
                          <li>
                            Each Work Order charge further 0.40 after complete
                            Work Order.
                          </li>
                        </>
                      )}
                    </ul>
                  </Form.Group>
                </Col>
              </Row>

              {/* Conditional Inputs Based on Package */}
              <Row>
                {(formData.package === "CRM Only" ||
                  formData.package === "Full Pack" ||
                  formData.package === "Field Pack") && (
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <span className="text-danger">*</span> Default Work
                        Order Time:
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          value={formData.workOrderTime}
                          onChange={(e) =>
                            handleChange("workOrderTime", e.target.value)
                          }
                          isInvalid={!!errors.workOrderTime}
                        />
                        <InputGroup.Text>(Working hours)</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                          {errors.workOrderTime}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                )}

                {(formData.package === "Full Pack" ||
                  formData.package === "Field Pack") && (
                  <>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <span className="text-danger">*</span> Primary Work
                          Order's Cost:
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            value={formData.primaryWorkOrderCost}
                            onChange={(e) =>
                              handleChange(
                                "primaryWorkOrderCost",
                                e.target.value
                              )
                            }
                            isInvalid={!!errors.primaryWorkOrderCost}
                          />
                          <InputGroup.Text>($USD/WO)</InputGroup.Text>
                          <Form.Control.Feedback type="invalid">
                            {errors.primaryWorkOrderCost}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <span className="text-danger">*</span> Execution Work
                          Order's Cost:
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            value={formData.executionWorkOrderCost}
                            onChange={(e) =>
                              handleChange(
                                "executionWorkOrderCost",
                                e.target.value
                              )
                            }
                            isInvalid={!!errors.executionWorkOrderCost}
                          />
                          <InputGroup.Text>($USD/WO)</InputGroup.Text>
                          <Form.Control.Feedback type="invalid">
                            {errors.executionWorkOrderCost}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </>
                )}

                {formData.package !== "Field Pack" && (
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <span className="text-danger">*</span> Quotation's Cost:
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          value={formData.quotationCost}
                          onChange={(e) =>
                            handleChange("quotationCost", e.target.value)
                          }
                          isInvalid={!!errors.quotationCost}
                        />
                        <InputGroup.Text>($USD/QN)</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                          {errors.quotationCost}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                )}

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Free Quotations:</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.freeQuotations}
                      onChange={(e) =>
                        handleChange("freeQuotations", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Free Work Orders:</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.freeWorkOrders}
                      onChange={(e) =>
                        handleChange("freeWorkOrders", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Customer Address Format:</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.customerAddressFormat}
                      onChange={(e) =>
                        handleChange("customerAddressFormat", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Working Day:</Form.Label>
                    <div>
                      <ToggleButtonGroup
                        type="checkbox"
                        className="d-flex flex-wrap"
                        value={formData.workingDays}
                        onChange={(value) =>
                          handleChange("workingDays", value.filter(Boolean))
                        }
                      >
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                        ].map((day, index) => (
                          <ToggleButton
                            key={index}
                            id={`btn-${day}`}
                            value={day}
                            variant="outline-primary"
                            className="me-2 mb-2"
                          >
                            {day}
                          </ToggleButton>
                        ))}
                        {["Saturday", "Sunday"].map((day, index) => (
                          <ToggleButton
                            key={index}
                            id={`btn-${day}`}
                            value={day}
                            variant="outline-secondary"
                            className="me-2 mb-2"
                          >
                            {day}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                      <Form.Text muted>
                        Default (mon, tue, wed, thus, fri)
                      </Form.Text>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              {/* Company Status */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Company Status"
                  checked={formData.companyStatus}
                  onChange={(e) =>
                    handleChange("companyStatus", e.target.checked)
                  }
                />
              </Form.Group>
            </Form>
            <Button
              variant="secondary"
              onClick={handlePrevious}
              className="me-2"
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleNext();
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Container>
        )}
      </div>
    </>
  );
};

export default CreateCompany;
