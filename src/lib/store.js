import axios from "axios";
export const Url = "http://localhost:2525";
// export const Url = "https://test-hl3bjt37ia-uc.a.run.app"

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

// Edit Company Api
export const editCompanyApi = async (companyId,formdata, token) => {
  try {
    const response = await axios.patch(
      `${Url}/q12w3e4rde/d1234d1234/${companyId}`,
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
export const createOfficeUser = async (finalData, token) => {
  try {
    const response = await axios.post(
      `${Url}/ocf432w678/off21m9076`,
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
};

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
  console.log("finalData", finalData);
  const userId = finalData;
  try {
    const response = await axios.get(`${Url}/srw4rdxkh8/ywqg21sh72`, {
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
      `${Url}/srw4rdxkh8/r31dishdq2/${roleId}`,
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
      // `${Url}/c3w4rd26yh/c2waz5tgh7`,
      `https://test-hl3bjt37ia-uc.a.run.app/cr5mki489n`,
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
    const response = await axios.get(`${Url}/c3w4rd26yh/g1a35muk9o`, {
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

// Delete Company Api 
export const deleteCompanyApi = async (userId, token) => {
  try {
    const response = await axios.delete(
      `${Url}/q12w3e4rde/a123e4wjrds/${userId}`,
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

//get field users of company
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

//get office users by role id
export const fetch_officeUsersByRoleId = async (roleId,token) => {
  try {
    const response = await axios.get(
      `${Url}/ocf432w678/12qw3e4r5t6/${encodeURIComponent(roleId)}`,{
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
      `${Url}/zxf432w6d9/ofx21u9074/${userId}`,{
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
      `${Url}/zxf432w6d9/ofx21u908d/${id}`,
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
      `${Url}/ocf432w678/odi8m90987/${userId}`,{
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