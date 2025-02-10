import React, { useState } from "react";
import Header from "../../../../Components/Header/Header";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const WorkOrderTime = () => {
  const [intervalTime, setIntervalTime] = useState("");
  const [defaultWorkTime, setDefaultWorkTime] = useState("");
  const [bufferTime, setBufferTime] = useState("");
  const { t, i18n } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the values as needed
    const finalData = {
      IntervalTime: intervalTime,
      DefaultWorkTime: defaultWorkTime,
      BufferTime: bufferTime,
    };
    console.log("finalData", finalData);
  };

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <div
            className="form-header mb-4"
            style={{
              backgroundColor: "#2e2e32",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            <h4 className="mb-0">{t("Work Order Time")}</h4>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={4}>
                <Card className="p-3">
                  <Form.Group controlId="intervalTime">
                    <Form.Label>{t("Interval Time")}:</Form.Label>
                    <Form.Control
                      type="time"
                      value={intervalTime}
                      onChange={(e) => setIntervalTime(e.target.value)}
                      placeholder={t("Enter Interval Time")}
                    />
                  </Form.Group>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-3">
                  <Form.Group controlId="defaultWorkTime">
                    <Form.Label>{t("Default Work Time")}:</Form.Label>
                    <Form.Control
                      type="time"
                      value={defaultWorkTime}
                      onChange={(e) => setDefaultWorkTime(e.target.value)}
                      placeholder={t("Enter Default Work Time")}
                    />
                  </Form.Group>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-3">
                  <Form.Group controlId="bufferTime">
                    <Form.Label>{t("Buffer Time")}:</Form.Label>
                    <Form.Control
                      type="time"
                      value={bufferTime}
                      onChange={(e) => setBufferTime(e.target.value)}
                      placeholder={t("Enter Buffer Time")}
                    />
                  </Form.Group>
                </Card>
              </Col>
            </Row>
            <div className="text-center">
              <Button variant="primary" type="submit">
                {t("Submit")}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default WorkOrderTime;
