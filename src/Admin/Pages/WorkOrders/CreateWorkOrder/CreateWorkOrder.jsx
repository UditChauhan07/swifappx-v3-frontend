import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import Header from "../../../../Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateWorkOrder.css";
import {
  createWorkOrderApi,
  fetch_FieldUserOfCompany,
  getCustomerList,
} from "../../../../lib/store";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


const CreateWorkOrder = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userId, setuserId] = useState(localStorage.getItem("userId"));
  const [copmanyId, setcopmanyId] = useState(localStorage.getItem("companyId"));
  const [token, settoken] = useState(localStorage.getItem("UserToken"));
  const company_id = localStorage.getItem("companyId") || null;
  // Workorder Details (for the new Workorder Details section)
  const [selectedService, setSelectedService] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");

  // Customer Detail Section state
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedCustomerAddress, setSelectedCustomerAddress] = useState("");
  const [selectedBillingAddress, setSelectedBillingAddress] = useState("");
  const [sendNotification, setSendNotification] = useState("Yes");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  // Basic Workorder Details state
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startTime, setStartTime] = useState("09:00");
  const [expectedTime, setExpectedTime] = useState("01:00");
  const [salesPerson, setSalesPerson] = useState("");
  const [salesPersonContact, setSalesPersonContact] = useState("");
  const [selectedWorkers, setSelectedWorkers] = useState("");
  const [selectedWorkerId, setSelectedWorkerId] = useState("");

  const [customersList, setcustomersList] = useState();
  const [workersLsit, setworkersLsit] = useState();

  // Work Order Table (Dynamically adding/removing rows)
  const [workItems, setWorkItems] = useState([
    { id: 1, workItem: "", itemDesc: "" },
  ]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomerList(copmanyId, token); // Fetch customers from API
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

  // Handle Work Order Table Changes
  const addWorkItemRow = () => {
    setWorkItems([
      ...workItems,
      { id: Date.now(), workItem: "", itemDesc: "" },
    ]);
  };

  const removeWorkItemRow = (id) => {
    setWorkItems(workItems.filter((row) => row.id !== id));
  };

  const handleWorkItemChange = (id, field, value) => {
    setWorkItems(
      workItems.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

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
    if (!selectedCustomer) newErrors.selectedCustomer = "Customer is required";
    // if (!selectedCustomerAddress)
    //   newErrors.selectedCustomerAddress = "Customer address is required";
    // if (!selectedBillingAddress)
    //   newErrors.selectedBillingAddress = "Billing address is required";
    if (!startDate) newErrors.startDate = "Start Date is required";
    if (!startTime) newErrors.startTime = "Start Time is required";
    if (!expectedTime) newErrors.expectedTime = "Expected Time is required";
    // if (!salesPerson) newErrors.salesPerson = "Sales Person is required";
    if (!selectedWorkers)
      newErrors.selectedWorkers = "Select Workers is required";
    // Validate Sales Person Contact Number (10 to 15 digits)
    // if (!salesPersonContact.trim()) {
    //   newErrors.salesPersonContact = "Sales Person Contact is required";
    // } else if (!/^\d{10,15}$/.test(salesPersonContact)) {
    //   newErrors.salesPersonContact =
    //     "Contact number must be between 10 and 15 digits";
    // }

    if (
      workItems.length === 0 ||
      workItems.some((row) => !row.workItem.trim() || !row.itemDesc.trim())
    ) {
      newErrors.workItems =
        "At least one Work Item and Description are required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitWorkOrder = async () => {
    if (!validate()) return;

    // Find customer details
    const selectedCustomerData = customersList?.find(
      (customer) => customer.id === selectedCustomerId
    );
    const customerName = selectedCustomerData ? selectedCustomerData.name : "";
    const customerEmail = selectedCustomerData
      ? selectedCustomerData.email
      : "";

    // Find worker details
    const selectedWorkerData = workersLsit?.find(
      (worker) => worker.id === selectedWorkerId
    );
    const workerName = selectedWorkerData ? selectedWorkerData.name : "";

    const finalData = {
      companyId: company_id,
      customerDetailSection: {
        CustomerId: selectedCustomerId,
        CustomerName: customerName,
        CustomerEmail: customerEmail,
        CustomerAddress: selectedCustomerAddress,
        BillingAddress: selectedBillingAddress,
        sendNotification: sendNotification === "Yes" ? true : false,
      },
      basicWorkorderDetails: {
        startDate,
        startTime,
        expectedTime,
        // salesPerson,
        // salesPersonContact: Number(salesPersonContact), // Convert to Number
        WorkerId: selectedWorkerId,
        WorkerName: workerName,
      },
      workorderDetails: workItems.map((row) => ({
        workItem: row.workItem,
        workDescription: row.itemDesc,
      })),
    };

    console.log("Final Data Sent:", finalData);

    const result = await Swal.fire({
      title: t("Are you sure?"),
      text: t("Do you want to create Work Order?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("Yes, create it!"),
      cancelButtonText: t("No, cancel"),
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      title: t("Processing..."),
      text: t("Creating Work Order, please wait."),
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const response = await createWorkOrderApi(finalData, token);
      Swal.close();

      if (response.status === true) {
        Swal.fire({
          title: t("Success!"),
          text: t("Work Order created successfully."),
          icon: "success",
          confirmButtonText: t("OK"),
        }).then(() => {
          navigate("/workorder/list");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text:
            response.message || t("There was an error creating the Work Order."),
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: t("API Error!"),
        text: t("Something went wrong. Please try again later."),
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const formatTime = (value) => {
    // Remove any non-numeric characters
    const numericValue = value.replace(/\D/g, "");
  

    // Limit to 4 characters for the "hh:mm" format
    if (numericValue.length > 4) return numericValue.substring(0, 4);

  

    // Format the time as hh:mm
    if (numericValue.length >= 3) {
      return `${numericValue.substring(0, 2)}:${numericValue.substring(2, 4)}`;
    }

    // If only two characters are entered, add a colon after the first two digits
    if (numericValue.length >= 2) {
      return `${numericValue.substring(0, 2)}:${numericValue.substring(2, 2)}`;
    }
    // If there is a single digit for hours or minutes, pad with leading zero
    if (numericValue.length === 1) {
    return `0${numericValue}:00`;
    }

    return numericValue;
  };

  const isValidTime = (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/; // Regex for valid time in hh:mm format
    return regex.test(time);
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
                {t("Customer Detail Section")}
              </Card.Header>
              <Card.Body>
                <Form>
                  {/* Select Customer */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="required-label">
                      {t("Select Customer")}:
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Select
                        value={selectedCustomer}
                        onChange={handleCustomerChange}
                      >
                        <option value="">{t("Select Customer")}</option>
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
                  {/* <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="required-label">
                      {t("Customer Address")}:
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder={t("Enter Customer Address")}
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
                  </Form.Group> */}

                  {/* Billing Address as a textarea */}
                  {/* <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="required-label">
                      {t("Billing Address")}:
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder={t("Enter Billing Address")}
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
                  </Form.Group> */}

                  {/* Send Notification */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="required-label">
                      {t("Send Notification to Customer")}?
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Check
                        type="radio"
                        label={t("Yes")}
                        name="sendNotification"
                        id="notificationYes"
                        inline
                        onChange={() => setSendNotification("Yes")}
                        checked={sendNotification === "Yes"}
                      />
                      <Form.Check
                        type="radio"
                        label={t("No")}
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
                {t("Basic Workorder Details")}
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          {t("Start Date")}:
                        </Form.Label>
                        <Form.Control
                          type="date"
                          value={startDate}
                          min={new Date().toISOString().split("T")[0]} // Restrict past dates
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
                          {t("Start Time")}:
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
                          {t("Expected Time Required ( Hours )") } :
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={expectedTime}
                          placeholder="hh:mm"
                          maxLength={5}
                          onChange={(e) => {
                            const formattedTime = formatTime(e.target.value);
                            console.log('formattedTime', formattedTime)
                            
                            setExpectedTime(formattedTime);
                            if (formattedTime) clearError("expectedTime");
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
                  {/* </Row> */}

                  {/* <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          {t("Sales Person")}:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          // value={salesPerson}
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
                        <Form.Label className="required-label">
                          {t("Sales Person Contact")}:
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder={t("Enter Sales Person Contact")}
                          value={salesPersonContact}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Only allow numbers and limit length
                            if (/^\d{0,15}$/.test(value)) {
                              setSalesPersonContact(value);
                              clearError("salesPersonContact");
                            }
                          }}
                          isInvalid={!!errors.salesPersonContact}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.salesPersonContact}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row> */}

                  {/* <Row> */}
                   
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          {t("Select Workers")}:
                        </Form.Label>
                        <Form.Select
                          value={selectedWorkers}
                          onChange={handleWorkerChange}
                        >
                          <option value="">{t("Select Workers")}</option>
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
            {/* Work Order Table Section */}
            <Card className="mb-4">
              <Card.Header className="bg-purple text-white d-flex justify-content-between align-items-center">
                <span>{t("Workorder Details")}</span>
              </Card.Header>
              <Card.Body>
                <Table bordered responsive>
                  <thead>
                    <tr className="bg-light">
                      <th>{t("Work Item")}</th>
                      <th>{t("Item Description")}</th>
                      <th className="text-center">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={addWorkItemRow}
                        >
                          {t("Add More")}
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {workItems.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <Form.Control
                            type="text"
                            placeholder={t("Enter Work Item")}
                            value={row.workItem}
                            onChange={(e) =>
                              handleWorkItemChange(
                                row.id,
                                "workItem",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            placeholder={t("Enter Item Description")}
                            value={row.itemDesc}
                            onChange={(e) =>
                              handleWorkItemChange(
                                row.id,
                                "itemDesc",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="text-center">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removeWorkItemRow(row.id)}
                          >
                            ✖
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {errors.workItems && (
                    <div className="text-danger mt-2">{errors.workItems}</div>
                  )}
                </Table>
              </Card.Body>
            </Card>

            {/* Submit Workorder */}
            <div className="text-center mb-4">
              <Button onClick={handleSubmitWorkOrder} type="submit">
                {t("Submit Workorder")}
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default CreateWorkOrder;
