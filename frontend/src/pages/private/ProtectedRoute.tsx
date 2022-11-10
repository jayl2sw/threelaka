// // export const ProtectedRoute = ({ redirectPath = '/auth/login' }) => {
// //   const accessToken = 'Bearer ' + sessionStorage.getItem('accessToken');
// //   if (accessToken === 'Bearer null') {
// //     alert('로그인이필요합니다');
// //     return <Navigate to={redirectPath} replace />;
// //   }

// //   return <Outlet />;
// // };

// // export default ProtectedRoute;
// import React from 'react';
// import { Navigate, Route, RouteProps } from 'react-router-dom';

// export const ProtectedRoute = (props: RouteProps) => {
//   // Check of user is logged in
//   // If yes, show route
//   // Otherwise, redirect to login page

//   const isLoggedIn = Boolean(sessionStorage.getItem('accessToken'));
//   if (!isLoggedIn) return <Navigate to="/auth/login" />;

//   return <Route {...props} />;
// };

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ redirectPath = '/auth/login' }) => {
  const accessToken = 'Bearer ' + sessionStorage.getItem('accessToken');
  if (accessToken === 'Bearer null') {
    return <Navigate to={redirectPath} replace />;
  }
  // console.log()
  return <Outlet />;
};

export default ProtectedRoute;
