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
import SuperAdmin from "./Admin/Users/Office_Users/Super_Admin/SuperAdmin";
import StaffAdmin from "./Admin/Users/Office_Users/Staff_Admin/StaffAdmin";
import Accountant from "./Admin/Users/Office_Users/Accountant/Accountant";
import Manager from "./Admin/Users/Office_Users/Manager/Manager";
import HumanResource from "./Admin/Users/Office_Users/Human_Resource/HumanResource";
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


function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/changepassword" element={<ChangePassword />} />

          {/* Super Admin */}
          <Route path="/" element={<Login />} />

          <Route path="/header" element={<Header />} />

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />

          <Route path="/company/create" element={<CreateCompany />} />

          <Route path="/company/companies" element={<Companies />} />

          <Route path="/company/access" element={<CompanyAccess />} />

          {/* Admin */}
          
          {/* Users */}
          {/* Ofice */}
          <Route path="/users/office/create" element={<Create />} />
          <Route path="/users/office/super-admin" element={<SuperAdmin />} />
          <Route path="/users/office/staff-admin" element={<StaffAdmin />} />
          <Route path="/users/office/accountant" element={<Accountant />} />
          <Route path="/users/office/manager" element={<Manager />} />
          <Route path="/users/office/human-resource" element={<HumanResource />} />
          <Route path="/users/office/other-users" element={<OtherUsers />} />
          {/* Field */}
          <Route path="/users/field/create" element={<CreateFieldUser />} />
          <Route path="/users/field/list" element={<FieldUserList />} />
          <Route path="/users/field/import" element={<ImportFieldUser />} />

          {/* Customers */}
          <Route path="/customers/create" element={<CreateCustomer />} />
          <Route path="/customers/list" element={<CustomerList />} />
          <Route path="/customers/prospects" element={<ProspectsCustomer />} />
          <Route path="/customers/import" element={<CustomerImport />} />


          {/* Settings */}
          {/* Roles */}
          <Route path="/settings/roles" element={<Roles />} />
          <Route path="/settings/roles/create" element={<CreateRole />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
