import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import Header from "../../../../Components/Header/Header";
import { useTranslation } from "react-i18next";
import { getLoginLogoutRecords } from "../../../../lib/store";

const LoginLogoutReport = () => {
  const { t } = useTranslation();
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [token] = useState(localStorage.getItem("UserToken"));

  // New state for user type filter; default is "office_user"
  const [userType, setUserType] = useState("office_user");

  // Simulate fetching data with API response
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLoginLogoutRecords(token);
        console.log("Response:", response);
        if (response.status === true) {
          // Set filtered data initially as all data
          setReportData(response?.data);
          setFilteredData(response?.data);
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Filter data based on search query (searching by Company Name)
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(reportData);
    } else {
      const filtered = reportData.filter((item) =>
        item.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, reportData]);

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">{t("Login/Logout Report")}</h4>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder={t("Search by Company Name...")}
                className="me-2"
                style={{ width: "250px" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="secondary" onClick={handleClear}>
                {t("Clear")}
              </Button>
            </div>
          </div>
          {/* Added minimal user type filter */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <Form.Label>{t("User Type")}</Form.Label>
              <Form.Control
                as="select"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                style={{ width: "200px" }}
              >
                <option value="office_user">{t("Office User")}</option>
                <option value="field_user">{t("Field User")}</option>
              </Form.Control>
            </div>
            <h5 className="mb-0">
              {t("Selected User:")}{" "}
              {userType === "office_user" ? t("Office User") : t("Field User")}
            </h5>
          </div>

          {/* Inline style to enforce a black border for all table cells */}
          <style>{`
            .custom-bordered-table td, .custom-bordered-table th {
              border: 1px solid black !important;
            }
          `}</style>

          <Table
            hover
            responsive
            className="align-middle custom-bordered-table"
            style={{ minWidth: "800px" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#E7EAF3", color: "#3C3C3C" }}>
                <th
                  rowSpan="2"
                  style={{ textAlign: "left", background: "#e5e5e5" }}
                >
                  {t("Company Name")}
                </th>
                <th
                  colSpan="3"
                  style={{ textAlign: "center", background: "#e5e5e5" }}
                >
                  {t("Login")}
                </th>
                <th
                  colSpan="3"
                  style={{ textAlign: "center", background: "#e5e5e5" }}
                >
                  {t("Logout")}
                </th>
              </tr>
              <tr style={{ backgroundColor: "#E7EAF3", color: "#3C3C3C" }}>
                <th style={{ background: "#e5e5e5", textAlign: "center" }}>
                  {t("Per Day")}
                </th>
                <th style={{ background: "#e5e5e5", textAlign: "center" }}>
                  {t("Per Week")}
                </th>
                <th style={{ background: "#e5e5e5", textAlign: "center" }}>
                  {t("Per Month")}
                </th>
                <th style={{ background: "#e5e5e5", textAlign: "center" }}>
                  {t("Per Day")}
                </th>
                <th style={{ background: "#e5e5e5", textAlign: "center" }}>
                  {t("Per Week")}
                </th>
                <th style={{ background: "#e5e5e5", textAlign: "center" }}>
                  {t("Per Month")}
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <BeatLoader
                      size={12}
                      color={"#3C3C3C"}
                      style={{ display: "flex", justifyContent: "center" }}
                    />
                    <p className="mt-2">{t("Loading...")}</p>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    {t("No data found")}
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: "15px 10px", fontSize: "0.9rem" }}>
                      <strong>{item.companyName}</strong>
                    </td>
                    <td style={{ padding: "15px 10px", fontSize: "0.9rem", textAlign: "center" }}>
                      {userType === "office_user"
                        ? item.office_user.login_per_day
                        : item.field_user.login_per_day}
                    </td>
                    <td style={{ padding: "15px 10px", fontSize: "0.9rem", textAlign: "center" }}>
                      {userType === "office_user"
                        ? item.office_user.login_per_week
                        : item.field_user.login_per_week}
                    </td>
                    <td style={{ padding: "15px 10px", fontSize: "0.9rem", textAlign: "center" }}>
                      {userType === "office_user"
                        ? item.office_user.login_per_month
                        : item.field_user.login_per_month}
                    </td>
                    <td style={{ padding: "15px 10px", fontSize: "0.9rem", textAlign: "center" }}>
                      {userType === "office_user"
                        ? item.office_user.logout_per_day
                        : item.field_user.logout_per_day}
                    </td>
                    <td style={{ padding: "15px 10px", fontSize: "0.9rem", textAlign: "center" }}>
                      {userType === "office_user"
                        ? item.office_user.logout_per_week
                        : item.field_user.logout_per_week}
                    </td>
                    <td style={{ padding: "15px 10px", fontSize: "0.9rem", textAlign: "center" }}>
                      {userType === "office_user"
                        ? item.office_user.logout_per_month
                        : item.field_user.logout_per_month}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default LoginLogoutReport;
