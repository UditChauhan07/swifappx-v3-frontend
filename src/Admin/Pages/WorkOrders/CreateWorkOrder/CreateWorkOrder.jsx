import React, { useState } from "react";
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
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./CreateWorkOrder.css";

const CreateWorkOrder = () => {
  // / State for selected service
  const [selectedService, setSelectedService] = useState("");
  // State for service items
  const [serviceItems, setServiceItems] = useState([
    {
      subItem: "Item Name",
      price: "Item P",
      quantity: 1,
      amount: 0,
      remarks: "Item Remarks",
    },
  ]);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleAddItem = () => {
    setServiceItems([
      ...serviceItems,
      {
        subItem: "Item Name",
        price: "Item P",
        quantity: 1,
        amount: 0,
        remarks: "Item Remarks",
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    const newServiceItems = serviceItems.filter((_, i) => i !== index);
    setServiceItems(newServiceItems);
  };

  const handleInputChange = (e, index, field) => {
    const updatedServiceItems = [...serviceItems];
    updatedServiceItems[index][field] = e.target.value;
    setServiceItems(updatedServiceItems);
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
                      />
                      <Form.Check
                        type="radio"
                        label="Existing"
                        name="customerType"
                        id="customerExisting"
                        defaultChecked
                        inline
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="required-label">
                      Select Customer:
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Select>
                        <option>Select Customer</option>
                        {/* Add dynamic options here */}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="required-label">
                      Select Customer Address:
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Select>
                        <option>Select Address</option>
                        {/* Add dynamic options here */}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className="required-label">
                      Select Billing Address:
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Select>
                        <option>Select Billing Address</option>
                        {/* Add dynamic options here */}
                      </Form.Select>
                    </Col>
                  </Form.Group>
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
                        defaultChecked
                        inline
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        name="sendNotification"
                        id="notificationNo"
                        inline
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
                        <Form.Control type="date" defaultValue="2025-02-03" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Start Time:
                        </Form.Label>
                        <Form.Control type="time" defaultValue="09:00" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Expected Time Required:
                        </Form.Label>
                        <Form.Control type="time" defaultValue="04:00" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Files:</Form.Label>
                        <Form.Control type="file" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Sales Person:
                        </Form.Label>
                        <Form.Control type="text" defaultValue="Super Admin" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Sales Person Contact:</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Lead Worker:
                        </Form.Label>
                        <Form.Select>
                          <option>FU</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Select Workers:</Form.Label>
                        <Form.Select>
                          <option>Select Workers</option>
                        </Form.Select>
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
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Service Category:
                        </Form.Label>
                        <Form.Select>
                          <option>Select</option>
                          <option>All service category</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required-label">
                          Select Service:
                        </Form.Label>
                        <Form.Select onChange={handleServiceChange}>
                          <option>Select</option>
                          <option value="Service Custom (One Time)">
                            Service Custom (One Time)
                          </option>
                          <option value="All service list">
                            All service list
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Conditionally Render Fields Based on Service Selection */}
                  {selectedService === "Service Custom (One Time)" && (
                    <>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="required-label">
                              Service Name:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Service Name"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="required-label">
                              Service Price:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Service Price"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Service Description:</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Service Description"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </>
                  )}

                  {selectedService === "All service list" && (
                    <>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Service Description:</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Service Description"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="required-label">
                              Subscriptions:
                            </Form.Label>
                            <Form.Check
                              type="checkbox"
                              label="One Time"
                              inline
                            />
                            <Form.Check
                              type="checkbox"
                              label="Standard"
                              inline
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </>
                  )}

                  {(selectedService === "Service Custom (One Time)" ||
                    selectedService === "All service list") && (
                    <>
                      {/* Service Items Table */}
                      <div>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Service Items:</Form.Label>
                              <Button
                                variant="outline-primary"
                                onClick={handleAddItem}
                              >
                                <span>+</span> Custom
                              </Button>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Table bordered>
                          <thead>
                            <tr>
                              <th>Sub Items</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Amount</th>
                              <th>Remarks</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {serviceItems.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={item.subItem}
                                    onChange={(e) =>
                                      handleInputChange(e, index, "subItem")
                                    }
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={item.price}
                                    onChange={(e) =>
                                      handleInputChange(e, index, "price")
                                    }
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleInputChange(e, index, "quantity")
                                    }
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={item.amount}
                                    onChange={(e) =>
                                      handleInputChange(e, index, "amount")
                                    }
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={item.remarks}
                                    onChange={(e) =>
                                      handleInputChange(e, index, "remarks")
                                    }
                                  />
                                </td>
                                <td>
                                  <Button
                                    variant="danger"
                                    onClick={() => handleRemoveItem(index)}
                                  >
                                    X
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
};

export default CreateWorkOrder;
