// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';

// let UserContext;
// let { Provider } = (UserContext = React.createContext());

// let UserProvider = ({ children }) => {
//   const [user, setUser] = useState();
//   const history = useHistory();

//   useEffect(() => {
//     return () => setUser(null);
//   }, []);

//   const login = async (credentials) => {
//     try {
//       const response = await axios.post('/auth/signin', credentials);
//       setUser(response.data);
//       const token = response?.data?.token;
//       window.localStorage.setItem('access-token', token);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       return [response.data, null];
//     } catch (error) {
//       console.error('error: ', error);
//       return [null, error];
//     }
//   };

//   // const login = (name, roles) => {
//   //   setUser({ info: { name, roles } });
//   //   // getUserRealizations({ info: { name, roles } });
//   // };

//   const logout = () => {
//     setUser(null);
//     window.localStorage.removeItem('access-token');
//     axios.defaults.headers.common['Authorization'] = null;
//     history.push('/signin');
//   };

//   return (
//     <Provider
//       value={{
//         user,
//         setUser,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </Provider>
//   );
// };

// export { UserContext, UserProvider };
