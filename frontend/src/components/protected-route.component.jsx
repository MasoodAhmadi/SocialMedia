// import React from 'react';
// import { Redirect, Route } from 'react-router-dom';
// import { routes } from '../config';
// import authServices from '../services/auth.services';

// export default function ProtectedRoute({
//   path,
//   component: Component,
//   ...rest
// }) {
//   const { identify, home, link } = routes;
//   return (
//     <Route
//       path={path}
//       {...rest}
//       render={(props) => {
//         if (!authServices.getCurrentUser())
//           return (
//             <Redirect
//               to={{
//                 pathname: home,
//                 state: { from: props.location },
//               }}
//             />
//           );
//         return Component ? <Component {...props} /> : render(props);
//       }}
//     />
//   );
// }
