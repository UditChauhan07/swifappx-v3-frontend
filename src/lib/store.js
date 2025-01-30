import axios from "axios";
export const Url = "http://localhost:2525";
// export const Url = "https://dev.astar8.com"

// Admin Login APi
export const LoginApi = async (formData) => {
  try {
    const response = await axios.post(
      `${Url}/q12w3e4rda/sw2mkfj6io`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};
// Change Password Api
export const changePasswordApi = async (formData, token) => {
  try {
    const response = await axios.put(`${Url}/q12w3e4rda/ch54m0ak53`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};

//Get Company List
export const getCompanyListApi = async (token) => {
  try {
    const response = await axios.get(`${Url}/q12w3e4rde/d12dqs23d1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};

// Crete Company
export const createCompanyApi = async (formdata, token) => {
  try {
    const response = await axios.post(
      `${Url}/q12w3e4rde/a123e4wjrds`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};

// Create User Role
// export const createUserRole = async (finalData) => {
//   try {
//     const response = await axios.post(
//       `${Url}/srw4rdxkh8/r31dishdq2`,
//       finalData
//     );
//     // console.log(response.data, "login api data");
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       return error.response.data;
//     }
//     throw new Error("An unexpected error occurred");
//   }
// };

//create office User
export const createOfficeUser=async (finalData,token) => {
  try {
    const response = await axios.post(
      `${Url}/ocf432w678/off21m9076`,
      finalData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};


//fetch roles list for office user
export const fetchRolesList=async (userid,token) => {
  try {
    const response = await axios.get(
      `${Url}/srw4rdxkh8/ywqg21sh72?userId=${encodeURIComponent(userid)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data, "login api data");
    return response.data.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  } 

}

// Create User Role
export const createUserRole = async (finalData) => {
  try {
    const response = await axios.post(
      `${Url}/srw4rdxkh8/r31dishdq2`,
      finalData
    );
    // console.log(response.data, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};

// Get Role List
export const getRoles = async (finalData) => {
  console.log("finalData",finalData)
  const userId = finalData
  try {
    const response = await axios.get(
      `${Url}/srw4rdxkh8/ywqg21sh72`, 
      {
        params:{userId}, 
      }
    );
    // console.log(response.data, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};

// Create Customer
export const createCustomer = async (finalData) => {
  try {
    const response = await axios.post(
      `${Url}/c3w4rd26yh/c2waz5tgh7`,
      finalData
    );
    // console.log(response.data, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};















































export const create_FieldUser=async (formdata,token) => {
  try {
    const response = await axios.post(
      `${Url}/zxf432w6d9/ofx21u9071`,
      formdata,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
}

export const fetch_FieldUserOfCompany = async (companyId,token) => {
 
  try {
    const response = await axios.get(
      `${Url}/zxf432w6d9/dqw621hgs3?company_id=${encodeURIComponent(companyId)}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
}

export const fetch_officeUsersByRoleId = async (roleId,token) => {
  try {
    const response = await axios.get(
      `${Url}/ocf432w678/12qw3e4r5t6/${encodeURIComponent(roleId)}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }

}