import React, { useState,useEffect } from "react";
//import { Route, Link,useNavigate,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";


export const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok ,setOk]=  useState(false);

  useEffect (() => {
    if(user &&user.token){
      currentAdmin(user.token)
      .then((res) => {
        console.log('CURRENT USER ADMIN RES',res);
        setOk(true);
      })
      .catch((err) => {
        console.log('ADMIN ROUTE ERROR',err);
        setOk(false);
      })
    }
  },[user])



  if(ok) {
    return children;
  }else {
    return (
        <LoadingToRedirect/>
        
        // can shoe animations for loading
        );
  }
  
}