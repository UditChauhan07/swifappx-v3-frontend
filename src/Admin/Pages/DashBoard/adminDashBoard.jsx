import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import Header from "../../../Components/Header/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const stats = {
    workOrdersScheduled: { today: 0, week: 0, month: 0 },
    workOrdersCompleted: { today: 0, week: 0, month: 0 },
    workOrdersCancelled: { today: 0, week: 0, month: 0 },
  };

  const chartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Submitted Quotation",
        data: [2, 4, 6, 3, 5, 2, 7],
        backgroundColor: "#2e2e32",
      },
      {
        label: "Converted Quotations",
        data: [1, 2, 3, 2, 4, 1, 6],
        backgroundColor: "grey",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
  };

  return (
    <>
      <Header />
      <div className="main-header-box">
        <div className="mt-4 pages-box">
          <Container fluid>
            <Row className="mb-4">
              <Col md={4}>
                <Card style={{ backgroundColor: "#2e2e32", color: "white" }}>
                  <Card.Body>
                    <h5>Work Orders Scheduled</h5>
                    <hr style={{ borderColor: "white" }} />
                    <p>Today: {stats.workOrdersScheduled.today}</p>
                    <p>This Week: {stats.workOrdersScheduled.week}</p>
                    <p>This Month: {stats.workOrdersScheduled.month}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card style={{ backgroundColor: "#2e2e32", color: "white" }}>
                  <Card.Body>
                    <h5>Work Orders Completed</h5>
                    <hr style={{ borderColor: "white" }} />
                    <p>Today: {stats.workOrdersCompleted.today}</p>
                    <p>This Week: {stats.workOrdersCompleted.week}</p>
                    <p>This Month: {stats.workOrdersCompleted.month}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card style={{ backgroundColor: "#2e2e32", color: "white" }}>
                  <Card.Body>
                    <h5>Work Orders Cancelled</h5>
                    <hr style={{ borderColor: "white" }} />
                    <p>Today: {stats.workOrdersCancelled.today}</p>
                    <p>This Week: {stats.workOrdersCancelled.week}</p>
                    <p>This Month: {stats.workOrdersCancelled.month}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Card>
                  <Card.Body>
                    <h5>Quotation Chart</h5>
                    <Bar data={chartData} options={chartOptions} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
