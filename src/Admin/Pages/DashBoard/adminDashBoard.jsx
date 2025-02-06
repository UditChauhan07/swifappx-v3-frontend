import React, { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
import { usePermissions } from "../../../context/PermissionContext";
import { getAdminDashboardDetails } from "../../../lib/store";

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
  const { getRoles } = usePermissions();
  const { t } = useTranslation();
  const token = localStorage.getItem("UserToken");
  const userid = localStorage.getItem("userId");
  const companyId = localStorage.getItem("companyId");

  // State to hold the dashboard data fetched from the API
  const [dashboardData, setDashboardData] = useState({
    scheduled: { today: 0, thisWeek: 0, thisMonth: 0 },
    completed: { today: 0, thisWeek: 0, thisMonth: 0 },
    cancelled: { today: 0, thisWeek: 0, thisMonth: 0 },
  });

  // Get user roles if a userId is available.
  useEffect(() => {
    if (userid) {
      getRoles(userid);
    }
  }, [userid]);

  // Fetch dashboard details from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdminDashboardDetails(companyId, token);
        console.log("dasdsaa", response);
        if (response.success === true && response.data) {
          setDashboardData({
            scheduled: {
              today: response.data.scheduled.today,
              thisWeek: response.data.scheduled.thisWeek,
              thisMonth: response.data.scheduled.thisMonth,
            },
            completed: {
              today: response.data.completed.today,
              thisWeek: response.data.completed.thisWeek,
              thisMonth: response.data.completed.thisMonth,
            },
            cancelled: {
              today: response.data.cancelled.today,
              thisWeek: response.data.cancelled.thisWeek,
              thisMonth: response.data.cancelled.thisMonth,
            },
          });
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, [token]);

  // Chart data and options (static/dummy data for now)
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
                      {t("Today")}: {dashboardData.scheduled.today}
                    </p>
                    <p>
                      {t("This Week")}: {dashboardData.scheduled.thisWeek}
                    </p>
                    <p>
                      {t("This Month")}: {dashboardData.scheduled.thisMonth}
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
                      {t("Today")}: {dashboardData.completed.today}
                    </p>
                    <p>
                      {t("This Week")}: {dashboardData.completed.thisWeek}
                    </p>
                    <p>
                      {t("This Month")}: {dashboardData.completed.thisMonth}
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
                      {t("Today")}: {dashboardData.cancelled.today}
                    </p>
                    <p>
                      {t("This Week")}: {dashboardData.cancelled.thisWeek}
                    </p>
                    <p>
                      {t("This Month")}: {dashboardData.cancelled.thisMonth}
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
