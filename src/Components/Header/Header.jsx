import React, { useEffect, useState } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { FaUserCog } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { VscFiles } from "react-icons/vsc";
import { FaFileSignature } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  FaLanguage,
  FaUserCircle,
  FaBuilding,
  FaCog,
  FaChartBar,
} from "react-icons/fa";
import "./Header.css";
import { useTranslation } from "react-i18next";

const Header = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language")
  );

  const [expandedDropdown, setExpandedDropdown] = useState("");
  const [nestedDropdown, setNestedDropdown] = useState("");
  const [userRole, setuserRole] = useState(localStorage.getItem("Role"));

  const toggleDropdown = (dropdown) => {
    setExpandedDropdown(expandedDropdown === dropdown ? "" : dropdown);
  };

  useEffect(() => {
    if (location.pathname.startsWith("/company")) {
      setExpandedDropdown("company");
    } else if (location.pathname.startsWith("/users")) {
      setExpandedDropdown("users");
    } else if (location.pathname.startsWith("/customers")) {
      setExpandedDropdown("customers");
    } else if (location.pathname.startsWith("/reports")) {
      setExpandedDropdown("reports");
    } else if (location.pathname.startsWith("/settings")) {
      setExpandedDropdown("settings");
    } else {
      setExpandedDropdown("");
    }
    window.scroll(0, 0);
  }, [location]);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove user data
        localStorage.removeItem("UserToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("Role");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("profilePic");
        localStorage.removeItem("name");

        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        // Redirect to login after delay
        setTimeout(() => {
          Navigate("/");
        }, 2000);
      }
    });
  };

  const changeLanguage = (lng) => {
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const languageNames = {
    en: "English",
    es: "Spanish",
    fr: "French",
  };

  const getItemClass = (lng) => {
    return lng === selectedLanguage ? "selected-item" : "";
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" fixed="top" className="custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {/* Language Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant="light" id="language-dropdown">
                <FaLanguage className="me-2" />
                {languageNames[selectedLanguage]}{" "}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys(languageNames).map((lng) => (
                  <Dropdown.Item
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className={getItemClass(lng)}
                  >
                    {languageNames[lng]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {/* User Profile Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="profile-dropdown">
                <FaUserCircle className="me-2" /> {t("Profile")}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  {" "}
                  <Link
                    to={"/changepassword"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {t("Change Password")}
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogOut}>
                  {t("Logout")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-links">
          <Nav className="flex-column">
            {/* Sidebar Logo */}
            <div className="text-center mt-4 mb-4">
              <img
                width={"100px"}
                src="https://swif.truet.net/public/swifCompany/logo/logo.png"
                alt="Logo"
                className="logo"
              />
            </div>

            {userRole === "SuperAdmin" ? (
              <>
                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className="sidebar-link"
                  activeClassName="active"
                >
                  {t("Dashboard")}
                </Link>

                {/* Company Dropdown */}
                <div
                  className={`dropdown ${
                    expandedDropdown === "company" ? "expanded" : ""
                  }`}
                >
                  <div
                    className="dropdown-title"
                    onClick={() => toggleDropdown("company")}
                  >
                    <span>{t("Company")}</span>
                    <FaBuilding />
                  </div>
                  <div
                    className={`dropdown-items ${
                      expandedDropdown === "company" ? "show" : ""
                    }`}
                  >
                    <Link
                      to="/company/create"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Create")}
                    </Link>
                    <Link
                      to="/company/companies"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Companies")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Access")}
                    </Link>
                  </div>
                </div>

                {/* Settings Dropdown */}
                <div
                  className={`dropdown ${
                    expandedDropdown === "settings" ? "expanded" : ""
                  }`}
                >
                  <div
                    className="dropdown-title"
                    onClick={() => toggleDropdown("settings")}
                  >
                    <span>{t("Settings")}</span>
                    <FaCog />
                  </div>
                  <div
                    className={`dropdown-items ${
                      expandedDropdown === "settings" ? "show" : ""
                    }`}
                  >
                    <Link
                      to="/settings/roles"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Roles")}
                    </Link>
                    <Link
                      to="/settings/payment-method"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Payment Modes")}
                    </Link>
                    <Link
                      to="/settings/payment-method"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Sub Admin")}
                    </Link>
                    <Link
                      to="/settings/payment-method"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Company Charges")}
                    </Link>
                    <Link
                      to="/settings/payment-method"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Default Trial Offer")}
                    </Link>
                    <Link
                      to="/settings/payment-method"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Company Pre-Fix")}
                    </Link>
                    <Link
                      to="/settings/payment-method"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Address Formatting")}
                    </Link>
                  </div>
                </div>

                {/* Reports Dropdown */}
                <div
                  className={`dropdown ${
                    expandedDropdown === "reports" ? "expanded" : ""
                  }`}
                >
                  <div
                    className="dropdown-title"
                    onClick={() => toggleDropdown("reports")}
                  >
                    <span>{t("Reports")}</span>
                    <FaChartBar />
                  </div>
                  <div
                    className={`dropdown-items ${
                      expandedDropdown === "reports" ? "show" : ""
                    }`}
                  >
                    <Link
                      to="/reports/option1"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Sales Report")}
                    </Link>
                    <Link
                      to="/reports/option2"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Revenue Reports")}
                    </Link>
                    <Link
                      to="/reports/option2"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Billing Reports")}
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className="sidebar-link"
                  activeClassName="active"
                >
                  {t("Dashboard")}
                </Link>
                {/* Services Dropdown */}
                <div
                  className={`dropdown ${
                    expandedDropdown === "servies" ? "expanded" : ""
                  }`}
                >
                  <div
                    className="dropdown-title"
                    onClick={() => toggleDropdown("servies")}
                  >
                    <span>{t("Servies and Products")}</span>
                    <GiPerspectiveDiceSixFacesOne size={20} />
                  </div>
                  <div
                    className={`dropdown-items ${
                      expandedDropdown === "servies" ? "show" : ""
                    }`}
                  >
                    <Link
                      to="/servies/categories"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Service Categories")}
                    </Link>
                    <Link
                      to="/servies/list"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Service List")}
                    </Link>
                    <Link
                      to="/servies/item"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Item Categories")}
                    </Link>
                    <Link
                      to="/servies/products"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Product Items")}
                    </Link>
                  </div>
                </div>
                {/* Users */}
                <div
                  className={`dropdown ${
                    expandedDropdown === "users" ? "expanded" : ""
                  }`}
                >
                  <div
                    className="dropdown-title"
                    onClick={() => toggleDropdown("users")}
                  >
                    <span>{t("Users")}</span>
                    <FaUserCog size={20} />
                  </div>
                  <div
                    className={`dropdown-items ${
                      expandedDropdown === "users" ? "show" : ""
                    }`}
                  >
                    {/* Office Users */}
                    <div
                      className={`dropdown ${
                        expandedDropdown === "users" &&
                        nestedDropdown === "officeUsers"
                          ? "expanded"
                          : ""
                      }`}
                    >
                      <div
                        className="dropdown-title"
                        onClick={() =>
                          setNestedDropdown(
                            nestedDropdown === "officeUsers"
                              ? ""
                              : "officeUsers"
                          )
                        }
                      >
                        ▣ {t("Office Users")}
                      </div>
                      {nestedDropdown === "officeUsers" ? (
                        <div
                          className={`dropdown-items ${
                            expandedDropdown === "users" &&
                            nestedDropdown === "officeUsers"
                              ? "show"
                              : ""
                          }`}
                        >
                          <Link
                            to="/users/office/create"
                            className="sidebar-link"
                          >
                            {t("Create")}
                          </Link>
                          <Link
                            to="/users/office/super-admin"
                            className="sidebar-link"
                          >
                            {t("Super Admin")}
                          </Link>
                          <Link
                            to="/users/office/staff-admin"
                            className="sidebar-link"
                          >
                            {t("Staff Admin")}
                          </Link>
                          <Link
                            to="/users/office/accountant"
                            className="sidebar-link"
                          >
                            {t("Accountant")}
                          </Link>
                          <Link
                            to="/users/office/manager"
                            className="sidebar-link"
                          >
                            {t("Manager")}
                          </Link>
                          <Link
                            to="/users/office/human-resource"
                            className="sidebar-link"
                          >
                            {t("Human Resource")}
                          </Link>
                          <Link
                            to="/users/office/other-users"
                            className="sidebar-link"
                          >
                            {t("Other Users")}
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    {/* Field Users */}
                    <div
                      className={`dropdown ${
                        expandedDropdown === "users" &&
                        nestedDropdown === "fieldUsers"
                          ? "expanded"
                          : ""
                      }`}
                    >
                      <div
                        className="dropdown-title"
                        onClick={() =>
                          setNestedDropdown(
                            nestedDropdown === "fieldUsers" ? "" : "fieldUsers"
                          )
                        }
                      >
                        ▣ {t("Field Users")}
                      </div>
                      {nestedDropdown === "fieldUsers" ? (
                        <div
                          className={`dropdown-items ${
                            expandedDropdown === "users" &&
                            nestedDropdown === "fieldUsers"
                              ? "show"
                              : ""
                          }`}
                        >
                          <Link
                            to="/users/field/create"
                            className="sidebar-link"
                          >
                            {t("Create")}
                          </Link>
                          <Link to="/users/field/list" className="sidebar-link">
                            {t("Field Users List")}
                          </Link>
                          <Link
                            to="/users/field/import"
                            className="sidebar-link"
                          >
                            {t("Import")}
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                {/* Customers */}
                <div
                  className={`dropdown ${
                    expandedDropdown === "customers" ? "expanded" : ""
                  }`}
                >
                  <div
                    className="dropdown-title"
                    onClick={() => toggleDropdown("customers")}
                  >
                    <span>{t("Customers")}</span>
                    <FaUserFriends size={20} />
                  </div>
                  <div
                    className={`dropdown-items ${
                      expandedDropdown === "customers" ? "show" : ""
                    }`}
                  >
                    <Link
                      to="/customers/create"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Create")}
                    </Link>
                    <Link
                      to="/customers/list"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Customer List")}
                    </Link>
                    <Link
                      to="/customers/prospects"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Prospects & Leads")}
                    </Link>
                    <Link
                      to="/customers/import"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Customer Import")}
                    </Link>
                  </div>
                </div>
                {/* Quotations */}
                <div
                  className={`dropdown ${
                    expandedDropdown === "quotations" ? "expanded" : ""
                  }`}
                >
                  <div
                    className="dropdown-title"
                    onClick={() => toggleDropdown("quotations")}
                  >
                    <span>{t("Quotations")}</span>
                    <FaFileSignature size={20} />
                  </div>
                  <div
                    className={`dropdown-items ${
                      expandedDropdown === "quotations" ? "show" : ""
                    }`}
                  >
                    <Link
                      to="/company/create"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Create")}
                    </Link>
                    <Link
                      to="/company/companies"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Submitted QT")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Approved QT")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Draft QT")}
                    </Link>
                  </div>
                </div>
                {/* Contracts */}
                <div
                  className={`dropdown ${
                    expandedDropdown === "contracts" ? "expanded" : ""
                  }`}
                >
                  <div
                    className="dropdown-title"
                    onClick={() => toggleDropdown("contracts")}
                  >
                    <span>{t("Contracts")}</span>
                    <VscFiles size={20} />
                  </div>
                  <div
                    className={`dropdown-items ${
                      expandedDropdown === "contracts" ? "show" : ""
                    }`}
                  >
                    <Link
                      to="/company/create"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Create")}
                    </Link>
                    <Link
                      to="/company/companies"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Active Contracts")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Terminate Contracts")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Hold Contracts")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Draft Contracts")}
                    </Link>
                  </div>
                </div>
                {/* Work Orders */}
                <div
                  className={`dropdown ${
                    expandedDropdown === "workOrder" ? "expanded" : ""
                  }`}
                >
                  <div
                    className="dropdown-title"
                    onClick={() => toggleDropdown("workOrder")}
                  >
                    <span>{t("Work Orders")}</span>
                    <MdWork size={20} />
                  </div>
                  <div
                    className={`dropdown-items ${
                      expandedDropdown === "workOrder" ? "show" : ""
                    }`}
                  >
                    <Link
                      to="/company/create"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Create")}
                    </Link>
                    <Link
                      to="/company/companies"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Work Orders List")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Draft Work Orders")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Request")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("W.O Calendar")}
                    </Link>
                  </div>
                </div>
                {/* Settings */}
                <div
                  className={`dropdown ${
                    expandedDropdown === "settings" ? "expanded" : ""
                  }`}
                >
                  <div
                    className="dropdown-title"
                    onClick={() => toggleDropdown("settings")}
                  >
                    <span>{t("Settings")}</span>
                    <IoMdSettings size={20} />
                  </div>
                  <div
                    className={`dropdown-items ${
                      expandedDropdown === "settings" ? "show" : ""
                    }`}
                  >
                    <Link
                      to="/company/create"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Account Settings")}
                    </Link>
                    <Link
                      to="/company/companies"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("User Profile")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Company Settings")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Roles")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Public Holidays")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Email Settings")}
                    </Link>
                    <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Security")}
                    </Link>
                  </div>
                </div>
                {/* Reports */}
                <div
                  className={`dropdown ${
                    expandedDropdown === "reports" ? "expanded" : ""
                  }`}
                >
                  <div
                    className="dropdown-title"
                    onClick={() => toggleDropdown("reports")}
                  >
                    <span>{t("Reports")}</span>
                    <TbReportSearch size={20} />
                  </div>
                  <div
                    className={`dropdown-items ${
                      expandedDropdown === "reports" ? "show" : ""
                    }`}
                  >
                    <Link
                      to="/company/create"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("TimeSheet")}
                    </Link>
                    <Link
                      to="/company/companies"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Sales Performance")}
                    </Link>
                  </div>
                </div>
              </>
            )}

            {/* Other Routes */}
            <Link
              to="/training"
              className="sidebar-link"
              activeClassName="active"
            >
              {t("Training & Notes")}
            </Link>
            <Link
              to="/release-notes"
              className="sidebar-link"
              activeClassName="active"
            >
              {t("Release Notes")}
            </Link>
          </Nav>
        </div>
      </div>
    </>
  );
};

export default Header;
