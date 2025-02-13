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
import { usePermissions } from "../../context/PermissionContext";
import { MdDashboard } from "react-icons/md";

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
  const [companyLogo, setcompanyLogo] = useState(
    localStorage.getItem("companyLogo")
  );
  const [companyId, setcompanyId] = useState(localStorage.getItem("companyId"));

  const [expandedDropdown, setExpandedDropdown] = useState("");
  const [nestedDropdown, setNestedDropdown] = useState("");
  const [userRole, setuserRole] = useState(localStorage.getItem("Role"));
  const { roles, hasPermission, permissions, getRoles } = usePermissions();
  const [defaultLanguage, setdefaultLanguage] = useState(localStorage.getItem("defaultLanguage"))
  // console.log("defaultLanguage",defaultLanguage)
  // console.log("permissions",permissions);

  const toggleDropdown = (dropdown) => {
    setExpandedDropdown(expandedDropdown === dropdown ? "" : dropdown);
  };

  useEffect(() => {
    if (location.pathname.startsWith("/company")) {
      setExpandedDropdown("company");
    } else if (location.pathname.startsWith("/users")) {
      setExpandedDropdown("users");
      if (location.pathname.startsWith("/users/office")) {
        setNestedDropdown("officeUsers");
      }
      if (location.pathname.startsWith("/users/field")) {
        setNestedDropdown("fieldUsers");
      }
    } else if (location.pathname.startsWith("/customers")) {
      setExpandedDropdown("customers");
    } else if (location.pathname.startsWith("/reports")) {
      setExpandedDropdown("reports");
    } else if (location.pathname.startsWith("/settings")) {
      setExpandedDropdown("settings");
      if (location.pathname.startsWith("/settings/admin/roles")) {
        setNestedDropdown("roles");
      }
    } else if (location.pathname.startsWith("/workorder")) {
      setExpandedDropdown("workOrder");
    } else if (location.pathname.startsWith("/worktime")) {
      setExpandedDropdown("worktime");
    } else {
      setExpandedDropdown("");
      setNestedDropdown("");
    }

    window.scroll(0, 0);
  }, [location]);

  const handleLogOut = () => {
    Swal.fire({
      title: t("Are you sure?"),
      text: t("You will be logged out of your session."),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Yes, Logout"),
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove user data
        localStorage.removeItem("UserToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("Role");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("profilePic");
        localStorage.removeItem("name");
        localStorage.removeItem("companyId");
        localStorage.removeItem("guidlines");
        localStorage.removeItem("companyName");
        localStorage.removeItem("companyLogo");
        localStorage.removeItem("defaultLanguage");

        Swal.fire({
          title: t("Logged Out!"),
          text: t("You have been successfully logged out."),
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
    // fr: "French",
  };

  const getItemClass = (lng) => {
    return lng === selectedLanguage ? "selected-item" : "";
  };
  console.log("userRole: ", roles);
  // console.log('userRole: ' + userRole,userRole == "Admin")
  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" fixed="top" className="custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {/* Language Dropdown */}
            {userRole === "SuperAdmin" ? <>
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
            </> : ""}

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

      {/* Sidebar. */}
      <div className="sidebar">
        <div className="sidebar-links">
          <Nav className="flex-column">
            {/* Sidebar Logo */}
            <div className="py-4 px-4" style={{ alignSelf: "center" }}>
              <img
                width={"40px"}
                src={
                  userRole === "SuperAdmin"
                    ? "https://swif.truet.net/public/swifCompany/logo/logo.png"
                    : companyLogo
                }
                alt="Company Logo"
                className="logo"
                style={{ height: "60px", width: "120px", objectFit: "cover" }}
              />
              {/* <span>Swif</span> */}
            </div>

            {userRole === "SuperAdmin" ? (
              <>
                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className="dropdown dropdown-title"
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  {t("Dashboard")}
                  <MdDashboard size={20} />
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
                    {/* <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Access")}
                    </Link> */}
                  </div>
                </div>

                {/* Reports Dropdown */}
                {/* <div
                  className={`dropdown ${
                    expandedDropdown === "reports" ? "expanded" : ""
                  }`}
                >
                  <div
                    className="dropdown-title"
                    onClick={() => toggleDropdown("reports")}
                  >
                    <span>{t("Reports")}</span>
                    <TbReportSearch size={20}/>
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
                      ▣ {t("Work Order Report")}
                    </Link>
                    <Link
                      to="/company/companies"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Field User Attendence Report")}
                    </Link>
                    {/* <Link
                      to="/company/access"
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      ▣ {t("Access")}
                    </Link> */}
                {/* </div> */}
                {/* </div> */}
              </>
            ) : (
              <>
                {/* Dashboard */}
                <Link
                  to="/dashboard/admin"
                  className="dropdown dropdown-title"
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  {t("Dashboard")}
                  <MdDashboard size={20} />
                </Link>

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
                    {(userRole == "Admin" ||
                      hasPermission("Company Office User Module", "View")) && (
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
                          onClick={() => {
                            setNestedDropdown(
                              nestedDropdown === "officeUsers"
                                ? ""
                                : "officeUsers"
                            );
                            getRoles(companyId);
                          }}
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
                            {(userRole == "Admin" ||
                              hasPermission(
                                `Company Field User Module`,
                                `Create`
                              )) && (
                              <Link
                                to="/users/office/create"
                                className="sidebar-link"
                              >
                                {t("Create")}
                              </Link>
                            )}

                            {roles.length > 0 &&
                              roles?.map((permission) => (
                                <Link
                                  to={`/users/office/${permission.roleName}?id=${permission.id}`}
                                  className="sidebar-link"
                                >
                                  {permission.roleName}
                                  {/* {t("Staff Admin")} */}
                                </Link>
                              ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}

                    {/* Field Agent */}
                    {(userRole == "Admin" ||
                      hasPermission("Company Field User Module", "View")) && (
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
                              nestedDropdown === "fieldUsers"
                                ? ""
                                : "fieldUsers"
                            )
                          }
                        >
                          ▣ {t("Field Agent")}
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
                            {(userRole == "Admin" ||
                              hasPermission(
                                `Company Field User Module`,
                                `Create`
                              )) && (
                              <Link
                                to="/users/field/create"
                                className="sidebar-link"
                              >
                                {t("Create")}
                              </Link>
                            )}
                            <Link
                              to="/users/field/list"
                              className="sidebar-link"
                            >
                              {t("Field Agent List")}
                            </Link>
                            {(userRole == "Admin" ||
                              hasPermission(
                                `Company Field User Module`,
                                `Create`
                              )) && (
                              <Link
                                to="/users/field/import"
                                className="sidebar-link"
                              >
                                {t("Import Field Agent")}
                              </Link>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Customers */}
                {(userRole == "Admin" ||
                  hasPermission("Company Customers Module", "View")) && (
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
                      {(userRole == "Admin" ||
                        hasPermission(
                          "Company Customers Module",
                          "Create"
                        )) && (
                        <Link
                          to="/customers/create"
                          className="sidebar-link"
                          activeClassName="active"
                        >
                          <div>▣ {t("Create")}</div>
                        </Link>
                      )}
                      <Link
                        to="/customers/list"
                        className="sidebar-link"
                        activeClassName="active"
                      >
                        ▣ {t("Customer List")}
                      </Link>
                    </div>
                  </div>
                )}

                {/* Work Orders */}
                {(userRole == "Admin" ||
                  hasPermission(`Company Work Order Module`, `View`)) && (
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
                      {(userRole == "Admin" ||
                        hasPermission(
                          `Company Work Order Module`,
                          `Create`
                        )) && (
                        <Link
                          to="/workorder/create"
                          className="sidebar-link"
                          activeClassName="active"
                        >
                          ▣ {t("Create")}
                        </Link>
                      )}
                      <Link
                        to="/workorder/list"
                        className="sidebar-link"
                        activeClassName="active"
                      >
                        ▣ {t("Work Orders List")}
                      </Link>
                      <Link
                        to="/workorder/import"
                        className="sidebar-link"
                        activeClassName="active"
                      >
                        ▣ {t("Import Work Orders")}
                      </Link>
                    </div>
                  </div>
                )}
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
                    {/* Roles Dropdown */}

                    <div
                      className={`dropdown ${
                        nestedDropdown === "roles" ? "expanded" : ""
                      }`}
                    >
                      <div
                        className="dropdown-title"
                        onClick={() =>
                          setNestedDropdown(
                            nestedDropdown === "roles" ? "" : "roles"
                          )
                        }
                      >
                        ▣ {t("Roles")}
                      </div>
                      {nestedDropdown === "roles" && (
                        <div className="dropdown-items show">
                          {userRole === "SuperAdmin" ||
                            (userRole === "Admin" && (
                              <Link
                                to="/settings/admin/roles/create"
                                className="sidebar-link"
                              >
                                {t("Create New")}
                              </Link>
                            ))}

                          <Link
                            to="/settings/admin/roles"
                            className="sidebar-link"
                          >
                            {t("List Roles")}
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Work Order Time */}
                    <div
                      className={`dropdown ${
                        nestedDropdown === "roles" ? "expanded" : ""
                      }`}
                    >
                      <div
                        className="dropdown-title"
                        onClick={() =>
                          setNestedDropdown(
                            nestedDropdown === "worktime" ? "" : "worktime"
                          )
                        }
                      >
                        <Link
                          className="sidebar-link"
                          to="/settings/admin/workOrderTime"
                          style={{ padding: "0px" }}
                        >
                          ▣ {t("Work Order Time")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Nav>
        </div>
      </div>
    </>
  );
};

export default Header;
