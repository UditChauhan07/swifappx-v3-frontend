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
import { useTranslation } from "react-i18next"; // Import the translation hook

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const { t } = useTranslation(); // Destructure the translation function

  const stats = {
    workOrdersScheduled: { today: 0, week: 0, month: 0 },
    workOrdersCompleted: { today: 0, week: 0, month: 0 },
    workOrdersCancelled: { today: 0, week: 0, month: 0 },
  };

  const chartData = {
    labels: [
      t("Day 1"),
      t("Day 2"),
      t("Day 3"),
      t("Day 4"),
      t("Day 5"),
      t("Day 6"),
      t("Day 7"),
    ],
    datasets: [
      {
        label: t("Submitted Quotation"),
        data: [2, 4, 6, 3, 5, 2, 7],
        backgroundColor: "#2e2e32",
      },
      {
        label: t("Converted Quotations"),
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
                    <h5>{t("Work Orders Scheduled")}</h5>
                    <hr style={{ borderColor: "white" }} />
                    <p>
                      {t("Today")}: {stats.workOrdersScheduled.today}
                    </p>
                    <p>
                      {t("This Week")}: {stats.workOrdersScheduled.week}
                    </p>
                    <p>
                      {t("This Month")}: {stats.workOrdersScheduled.month}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card style={{ backgroundColor: "#2e2e32", color: "white" }}>
                  <Card.Body>
                    <h5>{t("Work Orders Completed")}</h5>
                    <hr style={{ borderColor: "white" }} />
                    <p>
                      {t("Today")}: {stats.workOrdersCompleted.today}
                    </p>
                    <p>
                      {t("This Week")}: {stats.workOrdersCompleted.week}
                    </p>
                    <p>
                      {t("This Month")}: {stats.workOrdersCompleted.month}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card style={{ backgroundColor: "#2e2e32", color: "white" }}>
                  <Card.Body>
                    <h5>{t("Work Orders Cancelled")}</h5>
                    <hr style={{ borderColor: "white" }} />
                    <p>
                      {t("Today")}: {stats.workOrdersCancelled.today}
                    </p>
                    <p>
                      {t("This Week")}: {stats.workOrdersCancelled.week}
                    </p>
                    <p>
                      {t("This Month")}: {stats.workOrdersCancelled.month}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Card>
                  <Card.Body>
                    <h5>{t("Quotation Chart")}</h5>
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
