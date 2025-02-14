import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaClipboardList } from "react-icons/fa";
import Header from "../../../../Components/Header/Header";
import { BeatLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { workOrderReportAllCompany } from "../../../../lib/store";
import Swal from "sweetalert2";

const WorkOrderReport = () => {
  const { t } = useTranslation(); // ✅ Translation Hook

  const [workOrderData, setWorkOrderData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("UserToken"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await workOrderReportAllCompany(token);
        if (response.status === true) {
          setWorkOrderData(response?.data || {});
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function formatWorkOrderData() {
    return Object.keys(workOrderData).map((key) => ({
      companyId: key,
      companyName: workOrderData[key].company_name,
      perDay: workOrderData[key].per_day,
      perWeek: workOrderData[key].per_week,
      perMonth: workOrderData[key].per_month,
      completedPerDay: workOrderData[key].completed_per_day,
      completedPerWeek: workOrderData[key].completed_per_week,
      completedPerMonth: workOrderData[key].completed_per_month,
    }));
  }

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
          <h2 className="mb-4">{t("Work Order Report")}</h2>
          <div>
            <Table
              hover
              responsive
              className="align-middle"
              style={{ minWidth: "1650px" }}
            >
              <thead>
                <tr style={{ backgroundColor: "#E7EAF3", color: "#3C3C3C" }}>
                  <th
                    style={{
                      width: "15%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    {t("Company Id")}
                  </th>
                  <th
                    style={{
                      width: "15%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    {t("Company Name")}
                  </th>
                  <th
                    style={{
                      width: "7%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    {t("Per Day")}
                  </th>
                  <th
                    style={{
                      width: "7%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    {t("Per Week")}
                  </th>
                  <th
                    style={{
                      width: "7%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    {t("Per Month")}
                  </th>
                  <th
                    style={{
                      width: "8%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    {t("Completed Per Day")}
                  </th>
                  <th
                    style={{
                      width: "8%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    {t("Completed Per Week")}
                  </th>
                  <th
                    style={{
                      width: "8%",
                      textAlign: "left",
                      background: "#e5e5e5",
                    }}
                  >
                    {t("Completed Per Month")}
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
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />
                      <p className="mt-2">{t("Loading...")}</p>
                    </td>
                  </tr>
                ) : Object.keys(workOrderData).length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      {t("No data found")}
                    </td>
                  </tr>
                ) : (
                  formatWorkOrderData().map((item, index) => (
                    <tr key={index}>
                      <td style={{ padding: "15px", fontSize: "0.9rem" }}>
                        <strong>{item.companyId}</strong>
                      </td>
                      <td style={{ padding: "15px", fontSize: "0.9rem" }}>
                        <strong>{item.companyName}</strong>
                      </td>
                      <td style={{ padding: "15px", fontSize: "0.9rem" }}>
                        {item.perDay}
                      </td>
                      <td style={{ padding: "15px", fontSize: "0.9rem" }}>
                        {item.perWeek}
                      </td>
                      <td style={{ padding: "15px", fontSize: "0.9rem" }}>
                        {item.perMonth}
                      </td>
                      <td style={{ padding: "15px", fontSize: "0.9rem" }}>
                        {item.completedPerDay}
                      </td>
                      <td style={{ padding: "15px", fontSize: "0.9rem" }}>
                        {item.completedPerWeek}
                      </td>
                      <td style={{ padding: "15px", fontSize: "0.9rem" }}>
                        {item.completedPerMonth}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkOrderReport;
