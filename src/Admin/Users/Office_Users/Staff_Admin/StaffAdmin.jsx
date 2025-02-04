import React, { useEffect,useState } from "react";
import Header from "../../../../Components/Header/Header";
import UsersTabelComp from "../../../Components/User_Table/UsersTabelComp";
import { useParams ,useLocation} from 'react-router-dom';
import { fetch_officeUsersByRoleId } from "../../../../lib/store";

const StaffAdmin = () => {
  const [tableData, setTableData] = React.useState([]);
  console.log("tableDaataa",tableData)
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("UserToken");
  // const companyId = localStorage.getItem("UserToken");
  const { roleName } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  // console.log('staff admin',roleName, id);
  const tableHeaders = [
    "Full Name & Location",
    "Role",
    "Email Address",
    "Created At",
    "Status",
    "Action",
  ];

   const fetchData = () =>{
     console.log('staff admin hit');
     const response = fetch_officeUsersByRoleId(id,token)
    .then((response) => {
    if (response.status === true) {

      setTableData(response.users)
    }else{
      setTableData([]);
    }
    console.log("dasda",response)
    })
    .catch((error) => {console.log('error', error)})
    .finally(() => {setIsLoading(false)});
   }

   useEffect(() =>{
     setIsLoading(true);
     fetchData()
   },[location,id]);

  return (
    <>
      <Header />
      <div className="main-header-box mt-4">
        <div className="pages-box">
        <div
              className="form-header mb-4"
              style={{
                backgroundColor: "#8d28dd",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                textAlign:"center"
              }}
            >
              <h4 className="mb-0">{roleName}</h4>
            </div>
          {/* Pass props to TableComponent */}
          <UsersTabelComp
            tableHeaders={tableHeaders}
            tableData={tableData}
            roleName={roleName}
            isLoading={isLoading}
            fetchData={fetchData}
          />
        </div>
      </div>
    </>
  );
};

export default StaffAdmin;
