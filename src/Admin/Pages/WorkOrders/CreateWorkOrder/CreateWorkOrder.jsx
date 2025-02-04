import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Header from "../../../../Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateWorkOrder.css";
import {
  createWorkOrderApi,
  fetch_FieldUserOfCompany,
  getCustomerList,
} from "../../../../lib/store";
import Swal from "sweetalert2";

const CreateWorkOrder = () => {
  const [userId, setuserId] = useState(localStorage.getItem("userId"));
  const [token, settoken] = useState(localStorage.getItem("UserToken"));
  const company_id = localStorage.getItem("companyId") || null;
  // Workorder Details (for the new Workorder Details section)
  const [selectedService, setSelectedService] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");

  // Customer Detail Section state
  const [customerType, setCustomerType] = useState("Existing");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedCustomerAddress, setSelectedCustomerAddress] = useState("");
  const [selectedBillingAddress, setSelectedBillingAddress] = useState("");
  const [sendNotification, setSendNotification] = useState("Yes");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  // Basic Workorder Details state
  const [startDate, setStartDate] = useState("2025-02-03");
  const [startTime, setStartTime] = useState("09:00");
  const [expectedTime, setExpectedTime] = useState("04:00");
  const [salesPerson, setSalesPerson] = useState("Super Admin");
  const [salesPersonContact, setSalesPersonContact] = useState("");
  const [selectedWorkers, setSelectedWorkers] = useState("");
  const [selectedWorkerId, setSelectedWorkerId] = useState("");

  const [customersList, setcustomersList] = useState();
  const [workersLsit, setworkersLsit] = useState();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomerList(userId, token); // Fetch customers from API
        setcustomersList(response?.customers || []);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch_FieldUserOfCompany(company_id, token); // Fetch customers from API
        setworkersLsit(response?.data || []);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const clearError = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Update customer selection
  const handleCustomerChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCustomer(selectedId);
    setSelectedCustomerId(selectedId);
    if (selectedId) clearError("selectedCustomer");
  };

  const handleWorkerChange = (e) => {
    const selectedId = e.target.value;
    setSelectedWorkers(selectedId);
    setSelectedWorkerId(selectedId); // Store the selected worker ID
    if (selectedId) clearError("selectedWorkers");
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    clearError("selectedService");
  };

  const validate = () => {
    const newErrors = {};
    // Customer Detail Section validations
    if (!selectedCustomer) newErrors.selectedCustomer = "Customer is required";
    if (!selectedCustomerAddress)
      newErrors.selectedCustomerAddress = "Customer address is required";
    if (!selectedBillingAddress)
      newErrors.selectedBillingAddress = "Billing address is required";

    // Basic Workorder Details validations
    if (!startDate) newErrors.startDate = "Start Date is required";
    if (!startTime) newErrors.startTime = "Start Time is required";
    if (!expectedTime) newErrors.expectedTime = "Expected Time is required";
    if (!salesPerson) newErrors.salesPerson = "Sales Person is required";
    // (Sales Person Contact is optional)
    if (!selectedWorkers)
      newErrors.selectedWorkers = "Select Workers is required";

    // Workorder Details validations
    if (!selectedCategory)
      newErrors.selectedCategory = "Service category is required";
    if (!selectedService) newErrors.selectedService = "Service is required";
    if (!price) newErrors.price = "Price is required";

    return newErrors;
  };

  const handleSubmitWorkOrder = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Find the customer name based on selected ID
    const selectedCustomerData = customersList?.find(
      (customer) => customer.id === selectedCustomerId
    );
    const customerName = selectedCustomerData ? selectedCustomerData.name : "";

    // Find the worker name based on selected ID
    const selectedWorkerData = workersLsit?.find(
      (worker) => worker.id === selectedWorkerId
    );
    const workerName = selectedWorkerData ? selectedWorkerData.name : "";

    const finalData = {
      companyId: company_id,
      customerDetailSection: {
        customerType,
        CustomerId: selectedCustomerId, // Save selected customer ID
        CustomerName: customerName,
        CustomerAddress: selectedCustomerAddress,
        BillingAddress: selectedBillingAddress,
        sendNotification: sendNotification,
      },
      basicWorkorderDetails: {
        startDate,
        startTime,
        expectedTime,
        salesPerson,
        salesPersonContact,
        WorkerId: selectedWorkerId,
        WorkerName: workerName,
      },
      workorderDetails: {
        ServiceCategory: selectedCategory,
        ServiceName: selectedService,
        ServicePrice: price,
      },
    };

    console.log("Form data ", finalData);


    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to create Work Order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, create it!",
      cancelButtonText: "No, cancel",
    });

    if (!result.isConfirmed) {
      console.log("Work Order creation was cancelled");
      return;
    }

    Swal.fire({
      title: "Processing...",
      text: "Creating Work Order, please wait.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await createWorkOrderApi(finalData);
      console.log("aaaa", response);
      Swal.close();
      console.log("Form submitted successfully:", finalData);

      if (response.success === true) {
        Swal.fire({
          title: "Success!",
          text: "Work Order created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text:
            response.message || "There was an error creating the Work Order.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
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
          <Container>
            {/* Customer Detail Section */}
            <Card className="mb-4">
              <Card.Header className="bg-purple text-white">
                Customer Detail Section
              </Card.Header>
              <Card.Body>
                <Form>
                  {/* Customer Type */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="required-label">
                      Customer Type:
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Check
                        type="radio"
                        label="New"
                        name="customerType"
                        id="customerNew"
                        inline
                        onChange={() => setCustomerType("New")}
                        checked={customerType === "New"}
                      />
                      <Form.Check
                        type="radio"
                        label="Existing"
                        name="customerType"
                        id="customerExisting"
                        inline
                        onChange={() => setCustomerType("Existing")}
                        checked={customerType === "Existing"}
                      />
                    </Col>
                  </Form.Group>

                  {/* Select Customer */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="required-label">
                      Select Customer:
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Select
                        value={selectedCustomer}
                        onChange={handleCustomerChange}
                      >
                        <option value="">Select Customer</option>
                        {customersList?.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </Form.Select>

                      {errors.selectedCustomer && (
                        <div className="text-danger">
                          {errors.selectedCustomer}
                        </div>
                      )}
                    </Col>
                  </Form.Group>

                  {/* Customer Address as a textarea */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="required-label">
                      Customer Address:
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Enter Customer Address"
                        value={selectedCustomerAddress}
                        onChange={(e) => {
                          setSelectedCustomerAddress(e.target.value);
                          if (e.target.value)
                            clearError("selectedCustomerAddress");
                        }}
                      />
                      {errors.selectedCustomerAddress && (
                        <div className="text-danger">
                          {errors.selectedCustomerAddress}
                        </div>
                      )}
                    </Col>
                  </Form.Group>

                  {/* Billing Address as a textarea */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="required-label">
                      Billing Address:
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Enter Billing Address"
                        value={selectedBillingAddress}
                        onChange={(e) => {
                          setSelectedBillingAddress(e.target.value);
                          if (e.target.value)
                            clearError("selectedBillingAddress");
                        }}
                      />
                      {errors.selectedBillingAddress && (
                        <div className="text-danger">
                          {errors.selectedBillingAddress}
                        </div>
                      )}
                    </Col>
                  </Form.Group>

                  {/* Send Notification */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="required-label">
                      Send Notification to Customer?
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Check
                        type="radio"
                        label="Yes"
                        name="sendNotification"
                        id="notificationYes"
                        inline
                        onChange={() => setSendNotification("Yes")}
                        checked={sendNotification === "Yes"}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        name="sendNotification"
                        id="notificationNo"
                        inline
                        onChange={() => setSendNotification("No")}
                        checked={sendNotification === "No"}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>

            {/* Basic Workorder Details */}
            <Card className="mb-4">
              <Card.Header className="bg-purple text-white">
                Basic Workorder Details
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Start Date:
                        </Form.Label>
                        <Form.Control
                          type="date"
                          value={startDate}
                          onChange={(e) => {
                            setStartDate(e.target.value);
                            if (e.target.value) clearError("startDate");
                          }}
                        />
                        {errors.startDate && (
                          <div className="text-danger">{errors.startDate}</div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Start Time:
                        </Form.Label>
                        <Form.Control
                          type="time"
                          value={startTime}
                          onChange={(e) => {
                            setStartTime(e.target.value);
                            if (e.target.value) clearError("startTime");
                          }}
                        />
                        {errors.startTime && (
                          <div className="text-danger">{errors.startTime}</div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Expected Time Required:
                        </Form.Label>
                        <Form.Control
                          type="time"
                          value={expectedTime}
                          onChange={(e) => {
                            setExpectedTime(e.target.value);
                            if (e.target.value) clearError("expectedTime");
                          }}
                        />
                        {errors.expectedTime && (
                          <div className="text-danger">
                            {errors.expectedTime}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    {/* Removed Files field */}
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Sales Person:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={salesPerson}
                          onChange={(e) => {
                            setSalesPerson(e.target.value);
                            if (e.target.value) clearError("salesPerson");
                          }}
                        />
                        {errors.salesPerson && (
                          <div className="text-danger">
                            {errors.salesPerson}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Sales Person Contact:</Form.Label>
                        <Form.Control
                          type="text"
                          value={salesPersonContact}
                          onChange={(e) =>
                            setSalesPersonContact(e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    {/* Removed Lead Worker field */}
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Select Workers:
                        </Form.Label>
                        <Form.Select
                          value={selectedWorkers}
                          onChange={handleWorkerChange}
                        >
                          <option value="">Select Workers</option>
                          {workersLsit?.map((worker) => (
                            <option key={worker.id} value={worker.id}>
                              {worker.name}
                            </option>
                          ))}
                        </Form.Select>

                        {errors.selectedWorkers && (
                          <div className="text-danger">
                            {errors.selectedWorkers}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            {/* Workorder Details */}
            <Card className="mb-4">
              <Card.Header className="bg-purple text-white">
                Workorder Details
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Service Category:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Service Category"
                          value={selectedCategory}
                          onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            if (e.target.value) clearError("selectedCategory");
                          }}
                        />
                        {errors.selectedCategory && (
                          <div className="text-danger">
                            {errors.selectedCategory}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Select Service:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Service Name"
                          value={selectedService}
                          onChange={(e) => {
                            handleServiceChange(e);
                          }}
                        />
                        {errors.selectedService && (
                          <div className="text-danger">
                            {errors.selectedService}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Price:
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Price"
                          value={price}
                          onChange={(e) => {
                            setPrice(e.target.value);
                            if (e.target.value) clearError("price");
                          }}
                        />
                        {errors.price && (
                          <div className="text-danger">{errors.price}</div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            {/* Submit Workorder */}
            <div className="text-center mb-4">
              <Button
                variant="primary"
                onClick={handleSubmitWorkOrder}
                disabled={!selectedCategory || !selectedService}
              >
                Submit Workorder
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default CreateWorkOrder;
