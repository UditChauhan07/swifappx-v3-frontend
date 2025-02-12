import axios from "axios";
// export const Url = "http://localhost:2525";
export const Url = "https://apiv4-hl3bjt37ia-uc.a.run.app/";
// export const Url = "http://127.0.0.1:5001/swif-v2/us-central1/test"

// Admin Login APi
export const LoginApi = async (formData) => {
  try {
    const response = await axios.post(`${Url}/loa234re5t`, formData, {
      headers: {
        "Content-Type": "application/json",
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
// Change Password Api
export const changePasswordApi = async (formData, token) => {
  try {
    const response = await axios.put(`${Url}/cap2mji89f`, formData, {
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
    const response = await axios.get(`${Url}/gco542s8mz`, {
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

// Get Admin dashboard Details
export const getSuperAdminDashboardDetails = async (token) => {
  try {
    const response = await axios.get(`${Url}/dcc23we5t6`, {
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
// Get Super-Admin dashboard Details
export const getAdminDashboardDetails = async (companyId, token) => {
  try {
    const response = await axios.get(`${Url}/cdsj54rt67/${companyId}`, {
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
  console.log("dataa", formdata);

  // for (let [key, value] of formdata.entries()) {
  //   console.log(`${key}:`, value);
  // }
  try {
    const response = await axios.post(`${Url}/scc54meki8`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};

// Edit Company Api
export const editCompanyApi = async (companyId, formdata, token) => {
  console.log("companyId: " + companyId);
  try {
    const response = await axios.patch(
      `${Url}/edco542m8u/${companyId}`,
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

// Delete Company Api
export const deleteCompanyApi = async (userId, token) => {
  try {
    const response = await axios.delete(`${Url}/ducmk45d7u/${userId}`, {
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
export const createOfficeUser = async (finalData, token) => {
  console.log("dasasd", finalData);
  console.log("tt", token);
  try {
    const response = await axios.post(`${Url}/cou34er5t6`, finalData, {
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

//fetch roles list for office user
export const fetchRolesList = async (userid, token) => {
  try {
    const response = await axios.get(
      `${Url}/ofmg4j3er6?userId=${encodeURIComponent(userid)}`,
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
export const createUserRole = async (finalData, token) => {
  try {
    const response = await axios.post(`${Url}/cork654m78`, finalData, {
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

// Get Role List
export const getRoles = async (finalData, token) => {
  // console.log("finalData", finalData);
  const userId = finalData;
  try {
    const response = await axios.get(
      `${Url}/ofmg4j3er6`,
      {
        params: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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

// Edit Role Edit
export const roleEditApi = async (roleId, finalData, token) => {
  try {
    const response = await axios.patch(
      `${Url}/ed6tmki8gy/${roleId}`,
      finalData,
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

// Create Customer
export const createCustomerApi = async (finalData, token) => {
  try {
    const response = await axios.post(
      `${Url}/cr5mki489n`,
      // `https://test-hl3bjt37ia-uc.a.run.app/cr5mki489n`,
      finalData,
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

// Get Customer APi
export const getCustomerList = async (company_id, token) => {
  try {
    const response = await axios.get(`${Url}/pki5m3n8io`, {
      params: { company_id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};

// Edit Customer Api
export const editCustomerApi = async (customerId, formdata, token) => {
  try {
    const response = await axios.put(
      `${Url}/epa23dr45t/${customerId}`,
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

// Delete Customer Api
export const DeleteCustomerApi = async (userId, token) => {
  try {
    const response = await axios.delete(`${Url}/dcl45m76y8/${userId}`, {
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

// Work Order Create
export const createWorkOrderApi = async (finalData, token) => {
  try {
    const response = await axios.post(`${Url}/cwok431m56`, finalData, {
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

// Work Order List
export const fetchWorkOrderList = async (companyId, token) => {
  try {
    const response = await axios.get(`${Url}/gwok32m76nh/${companyId}`, {
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

// Work Order Delete Api
export const workOrderDeleteApi = async (userId, token) => {
  try {
    const response = await axios.delete(`${Url}/dwo32mt54f/${userId}`, {
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

//create field user
export const create_FieldUser = async (formdata, token) => {
  try {
    const response = await axios.post(`${Url}/fu6m5k49ij`, formdata, {
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

//get field users of company
export const fetch_FieldUserOfCompany = async (companyId, token) => {
  try {
    const response = await axios.get(
      `${Url}/gtfr54m78k?company_id=${encodeURIComponent(companyId)}`,
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

//get office users by role id
export const fetch_officeUsersByRoleId = async (roleId, token) => {
  try {
    console.log(roleId);
    const response = await axios.get(
      `${Url}/gor5m9xv04?roleID=${encodeURIComponent(roleId)}`,
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

//delete field user by id
export const delete_FieldUser = async (userId, token) => {
  try {
    const response = await axios.delete(`${Url}/dfu54mjki9/${userId}`, {
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

//update field user by id
export const update_FieldUser = async (formdata, token, id) => {
  try {
    const response = await axios.put(`${Url}/edik54m89v/${id}`, formdata, {
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

export const delete_OfficeUser = async (userId, token) => {
  try {
    const response = await axios.delete(`${Url}/dlofim54rt/${userId}`, {
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

export const edit_OfficeUser = async (formdata, userId, token) => {
  console.log("user", userId);
  try {
    const response = await axios.put(`${Url}/smjg8g43me/${userId}`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};

// Import Field Agent
export const importFieldAgent = async (formdata, token) => {
  try {
    const response = await axios.post(`${Url}/ifu3ws6t5r`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};

// Import Work Order
export const importWorkOrder = async (formdata, token) => {
  try {
    const response = await axios.post(`${Url}/iwo32mm4er`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response, "login api data");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};

// Work Order Time Api Update
export const workOrderTimeApi = async (formdata, companyId,token) => {
  try {
    const response = await axios.post(
      `${Url}/wot3m9iszx/${companyId}`,
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
};

// Work Order Time Api Get
export const workOrderTimeGetApi = async (companyId,token) => {
  try {
    const response = await axios.get(
      `${Url}/gwoct43m9su/${companyId}`,
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