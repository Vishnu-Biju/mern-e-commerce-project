import React from "react";
//import { Route, Link,useNavigate,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

// const UserRoute = ({ children, ...rest }) => {
  
//   const { user } = useSelector((state) => ({ ...state }));
//     console.log(user);
//   return user && user.token ? (
//     <Route {...rest} render={() => children} />
//   ) : (
//     <h1 className="text-danger">Loading...</h1>// can shoe animations for loading
//   );
// };

// export default UserRoute;


export const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  

  if(user && user.token) {
    return children;
  }else {
    return (
        <LoadingToRedirect/>
        
        // can shoe animations for loading
        );
  }
  
}
      
    




