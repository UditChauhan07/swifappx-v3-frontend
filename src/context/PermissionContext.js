import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
import { fetchRolesList, Url } from '../lib/store';

const PermissionsContext = createContext();
const userDataKey = 'userId';

export const PermissionsProvider = ({ children }) => {
  const [userRole, setUserRole] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [user, setUser] = useState(localStorage.getItem(userDataKey));

  const getRoles = async (userID) => {
    if (userID) {
      try {
        // console.log(`userid: ${userID}  `);
        const token = localStorage.getItem('UserToken');
        const url = `${Url}/srw4rdxkh8/ywqg21sh72?userId=${encodeURIComponent(userID)}`;
        const response=await fetchRolesList(userID,token)

        console.log('responsesss',response);
        setRoles(response || []);
        setUserRole(response?.data?.data?.roleName || null);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    }
  };
//   console.log(`permis   : ${permissions}`);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         // const decodedToken = jwtDecode(token);
//         // setUser(decodedToken?.userId);
//         getRoles(decodedToken?.userId);
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     }
//   }, []);

  useEffect(() => {
    console.log('hit 1',user)
    if (roles.length === 0 && user) {
      getRoles(user);
    }
  }, [user]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === userDataKey) {
        setUser(event.newValue);
        getRoles(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const hasPermission = (moduleName, action) =>
    permissions.some(
      (perm) => perm.moduleName === moduleName && perm.actions.includes(action)
    );

  return (
    <PermissionsContext.Provider value={{ userRole, hasPermission, permissions, getRoles,roles}}>
      {children}
    </PermissionsContext.Provider>
  );
};

// Hook for using permissions in any component
export const usePermissions = () => useContext(PermissionsContext);
