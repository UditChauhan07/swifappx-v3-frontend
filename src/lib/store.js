import axios from "axios";
// export const Url = "http://localhost:2525";
export const Url = "https://test-hl3bjt37ia-uc.a.run.app/"

// Admin Login APi
export const LoginApi = async (formData) => {
  try {
    const response = await axios.post(
      `${Url}/loa234re5t`,
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

// Crete Company
export const createCompanyApi = async (formdata, token) => {
  console.log("dataa",formdata)
  console.log("tokennn",token)
  try {
    const response = await axios.post(
      `${Url}/scc54meki8`,
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

// Edit Company Api
export const editCompanyApi = async (companyId,formdata, token) => {
  console.log('companyId: ' + companyId);
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
    const response = await axios.delete(
      `${Url}/ducmk45d7u/${userId}`,
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
export const createOfficeUser = async (finalData, token) => {
  try {
    const response = await axios.post(
      `${Url}/cou34er5t6`,
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
    return response.data.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
  }
};

// Create User Role
export const createUserRole = async (finalData) => {
  try {
    const response = await axios.post(
      `${Url}/cork654m78`,
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
  // console.log("finalData", finalData);
  const userId = finalData;
  try {
    const response = await axios.get(`${Url}/ofmg4j3er6`, {
      params: { userId },
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

// Edit Role Edit 
export const roleEditApi = async (roleId,finalData) => {
  try {
    const response = await axios.patch(
      `${Url}/ed6tmki8gy/${roleId}`,
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
export const editCustomerApi = async (customerId,formdata, token) => {
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
}

// Delete Customer Api
export const DeleteCustomerApi = async (userId, token) => {
  try {
    const response = await axios.delete(
      `${Url}/dcl45m76y8/${userId}`,
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














































//create field user
export const create_FieldUser=async (formdata,token) => {
  try {
    const response = await axios.post(
      `${Url}/fu6m5k49ij`,
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

//get field users of company
export const fetch_FieldUserOfCompany = async (companyId,token) => {
 
  try {
    const response = await axios.get(
      `${Url}/gtfr54m78k?company_id=${encodeURIComponent(companyId)}`,{
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

//get office users by role id
export const fetch_officeUsersByRoleId = async (roleId,token) => {
  try {
    const response = await axios.get(
      `${Url}/goud43mk9i/${encodeURIComponent(roleId)}`,{
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

//delete field user by id
export const delete_FieldUser = async (userId,token) => {
  try {
    const response = await axios.delete(
      `${Url}/dfu54mjki9/${userId}`,{
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

//update field user by id
export const update_FieldUser=async (formdata,token,id) => {
  try {
    const response = await axios.put(
      `${Url}/edik54m89v/${id}`,
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

export const delete_OfficeUser = async (userId,token) => {
  try {
    const response = await axios.delete(
      `${Url}/dlofim54rt/${userId}`,{
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

export const edit_OfficeUser = async (formdata,userId,token) => {
  try {
    const response = await axios.put(
      `${Url}/smjg8g43me/${userId}`,formdata,
      {
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