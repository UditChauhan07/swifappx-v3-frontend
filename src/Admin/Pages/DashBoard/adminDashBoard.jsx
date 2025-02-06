import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import Header from "../../../Components/Header/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  PointElement,
  LineElement,
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

  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    scheduled: { today: 0, thisWeek: 0, thisMonth: 0 },
    completed: { today: 0, thisWeek: 0, thisMonth: 0 },
    cancelled: { today: 0, thisWeek: 0, thisMonth: 0 },
  });

  // Current selection for the chart (default: Scheduled)
  const [selectedCategory, setSelectedCategory] = useState("scheduled");

  useEffect(() => {
    if (userid) {
      getRoles(userid);
    }
  }, [userid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdminDashboardDetails(companyId, token);
        if (response.success === true && response.data) {
          setDashboardData({
            scheduled: response.data.scheduled,
            completed: response.data.completed,
            cancelled: response.data.cancelled,
          });
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, [token]);

  // Chart data dynamically updates based on selectedCategory
  const chartData = {
    labels: [t("Today"), t("This Week"), t("This Month")],
    datasets: [
      {
        label: t(
          selectedCategory === "scheduled"
            ? "Work Orders Scheduled"
            : selectedCategory === "completed"
            ? "Work Orders Completed"
            : "Work Orders Cancelled"
        ),
        data: [
          dashboardData[selectedCategory].today,
          dashboardData[selectedCategory].thisWeek,
          dashboardData[selectedCategory].thisMonth,
        ],
        borderColor: selectedCategory === "scheduled" ? "#2e2e32" : "grey",
        backgroundColor: selectedCategory === "scheduled" ? "#2e2e32" : "grey",
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <>
      <Header />
      <div className="main-header-box">
        <div className="mt-4 pages-box">
          <Container fluid>
            {/* Stats Row */}
            <Row className="mb-4">
              <Col md={4}>
                <Card
                  className="dashboard-card"
                  onClick={() => setSelectedCategory("scheduled")}
                  style={{
                    backgroundColor:
                      selectedCategory === "scheduled" ? "#2e2e32" : "grey",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
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
                <Card
                  className="dashboard-card"
                  onClick={() => setSelectedCategory("completed")}
                  style={{
                    backgroundColor:
                      selectedCategory === "completed" ? "#2e2e32" : "grey",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
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
                <Card
                  className="dashboard-card"
                  onClick={() => setSelectedCategory("cancelled")}
                  style={{
                    backgroundColor:
                      selectedCategory === "cancelled" ? "#2e2e32" : "grey",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
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

            {/* Chart */}
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Body>
                    <h5>{t("Work Order Statistics")}</h5>
                    <Line data={chartData} options={chartOptions} />
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
