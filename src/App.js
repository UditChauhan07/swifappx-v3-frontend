import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Header from "./Components/Header/Header";
import Dashboard from './Super_Admin/Pages/DashBoard/DashBoard';
import CreateCompany from "./Super_Admin/Pages/Companies/CreateCompany/CreateCompany";
import Companies from "./Super_Admin/Pages/Companies/Companies/Companies";
import CompanyAccess from "./Super_Admin/Pages/Companies/Access/CompanyAccess";
import Create from "./Admin/Users/Office_Users/Create/Create";
import SuperAdmin from "./utils/Super_Admin/SuperAdmin";
import StaffAdmin from "./Admin/Users/Office_Users/Staff_Admin/StaffAdmin";
import Accountant from "./utils/Accountant/Accountant";
import Manager from "./utils/Manager/Manager";
import HumanResource from "./utils/Human_Resource/HumanResource";
import OtherUsers from "./Admin/Users/Office_Users/Other_Users/OtherUsers";
import CreateFieldUser from "./Admin/Users/Field_Users/Create/CreateFieldUser";
import FieldUserList from "./Admin/Users/Field_Users/Filed_user_list/FieldUserList";
import ImportFieldUser from "./Admin/Users/Field_Users/Import_User/ImportFieldUser";
import CreateCustomer from "./Admin/Pages/Customers/CreateCustomer/CreateCustomer";
import CustomerList from "./Admin/Pages/Customers/CustomerList/CustomerList";
import ProspectsCustomer from "./Admin/Pages/Customers/ProspectsCustomer/ProspectsCustomer";
import CustomerImport from "./Admin/Pages/Customers/CustomerImport/CustomerImport";
import ChangePassword from "./Super_Admin/Pages/ChangePassword/ChangePassword";
import PrivateRoute from "./PrivateRoute";
import Roles from "./Super_Admin/Pages/Settings/Roles/Roles";
import CreateRole from "./Super_Admin/Pages/Settings/Roles/CreateRole/CreateRole";
import "./i18n"; 
import AdminRoles from "./Admin/Pages/Settings/Roles/AdminRoles";
import CreateAdminRole from "./Admin/Pages/Settings/Roles/CreateAdminRole/CreateAdminRole";
import FieldUserDetails from "./Admin/Users/Field_Users/Filed_user_list/FieldUserDetails";
import CompanyDetails from "./Super_Admin/Pages/Companies/Companies/CompanyDetails/CompanyDetails";
import EditCompany from "./Super_Admin/Pages/Companies/Companies/EditCompany/EditCompany";
import EditRoles from "./Super_Admin/Pages/Settings/Roles/EditRoles/EditRoles";
import UpdateFieldUser from "./Admin/Users/Field_Users/Filed_user_list/UpdateFieldUser ";
import OfficeUserDetails from "./Admin/Users/Office_Users/Staff_Admin/OfficeUserDetails";
import EditOfficeUser from "./Admin/Users/Office_Users/Staff_Admin/EditOfficeUser";
import CustomerDetails from "./Admin/Pages/Customers/CustomerList/CustomerDetails/CustomerDetails";
import CustomerEdit from "./Admin/Pages/Customers/CustomerList/CustomerEdit/CustomerEdit";
import EditAdminRole from "./Admin/Pages/Settings/Roles/EditAdminRole/EditAdminRole";
import CreateWorkOrder from "./Admin/Pages/WorkOrders/CreateWorkOrder/CreateWorkOrder";
import WorkOrderList from './Admin/Pages/WorkOrders/WorkOrderList/WorkOrderList';
import DraftWorkOrder from './Admin/Pages/WorkOrders/DraftWorkOrder/DraftWorkOrder';
import AdminDashboard from "./Admin/Pages/DashBoard/adminDashBoard";
import WorkOrderEdit from "./Admin/Pages/WorkOrders/WorkOrderList/WorkOrderEdit/WorkOrderEdit";
import WorkOrderDetails from "./Admin/Pages/WorkOrders/WorkOrderList/WorkOrderDetails/WorkOrderDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/changepassword" element={<ChangePassword />} />

                          {/* Super Admin */}
          <Route path="/" element={<Login />} />

          <Route path="/header" element={<Header />} />

          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} /> */}

          {/* Companies */}
          <Route path="/company/create" element={<CreateCompany />} />
          <Route path="/company/companies" element={<Companies />} />
          <Route path="/company/companies/details" element={<CompanyDetails />} />
          <Route path="/company/companies/edit" element={<EditCompany />} />
          <Route path="/company/access" element={<CompanyAccess />} />

          {/* Settings */}
          <Route path="/settings/roles" element={<Roles />} />
          <Route path="/settings/roles/create" element={<CreateRole />} />
          <Route path="/settings/roles/edit" element={<EditRoles />} />

                      {/* Admin */}

          {/* DashBoard */}
          <Route path="/dashboard/admin" element={<PrivateRoute element={AdminDashboard} />} />
          
          {/* Users */}
          {/* Ofice */}
          <Route path="/users/office/create" element={<Create />} />
          <Route path="/users/office/super-admin" element={<SuperAdmin />} />
          <Route path="/users/office/:roleName" element={<StaffAdmin />} />
          <Route path="/users/office/list/view" element={<OfficeUserDetails/>} />
          <Route path="/users/office/edit" element={<EditOfficeUser/>} />
          <Route path="/users/office/human-resource" element={<HumanResource />} />
          <Route path="/users/office/other-users" element={<OtherUsers />} />
          {/* Field */}
          <Route path="/users/field/create" element={<CreateFieldUser />} />
          <Route path="/users/field/list" element={<FieldUserList />} />
          <Route path="/users/field/edit" element={<UpdateFieldUser/>} />
          <Route path="/users/field/list/view" element={<FieldUserDetails/>} />
          <Route path="/users/field/import" element={<ImportFieldUser />} />

          {/* Customers */}
          <Route path="/customers/create" element={<CreateCustomer />} />
          <Route path="/customers/list" element={<CustomerList />} />
          <Route path="/customers/list/details" element={<CustomerDetails />} />
          <Route path="/customers/list/edit" element={<CustomerEdit />} />
          {/* <Route path="/customers/list/address" element={<CustomerList />} /> */}

          <Route path="/customers/prospects" element={<ProspectsCustomer />} />
          <Route path="/customers/import" element={<CustomerImport />} />


          {/* Settings */}
          {/* Roles */}
          <Route path="/settings/admin/roles" element={<AdminRoles />} />
          <Route path="/settings/admin/roles/create" element={<CreateAdminRole />} />
          <Route path="/settings/admin/roles/edit" element={<EditAdminRole />} />


          {/* Work Order */}
          <Route path="/workorder/create" element={<CreateWorkOrder />} />
          <Route path="/workorder/list" element={<WorkOrderList />} />
          <Route path="/workorder/list/details" element={<WorkOrderDetails />} />
          <Route path="/workorder/list/edit" element={<WorkOrderEdit />} />
          <Route path="/workorder/draft" element={<DraftWorkOrder />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
