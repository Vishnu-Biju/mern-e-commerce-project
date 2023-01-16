import React, {useEffect} from 'react';
import { Routes , Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';


import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import ChangePassword from "./pages/auth/forgotPassword"
import History from './pages/user/History';
import { UserRoute } from "./components/routes/UserRoute";
import { AdminRoute } from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from './pages/admin/AdminDashboard';

import {auth} from './pages/auth/firebase';
import { useDispatch } from 'react-redux';
import {currentUser} from "./functions/auth";


const App = ()=> {
 const dispatch = useDispatch()
 

 //to check firebase auth state
 useEffect(()=> {
  const unsubscribe =  auth.onAuthStateChanged(async (user)=> {
    if(user) {
      const idTokenResult = await user.getIdTokenResult();
        console.log("user",user)
        currentUser(idTokenResult.token)
        .then((res) => {
          
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role:res.data.role,
              _id:res.data._id,
            },
          });
        })
        .catch(err => console.log(err));
    }
  } );
  // clean up
  return() => unsubscribe();
 }, [dispatch]);

  return (  
    <>
    <Header/>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"/>
    <Routes> 
      <Route  path="/" element ={<Home/>} />
      <Route  path="login"  element ={<Login/>} />
      <Route path="register"  element ={<Register/>} />
      <Route path="/forgot/password"  element ={<ChangePassword/>} />
      
      <Route  //protected routes
        path="/user/history"
        element={
          <UserRoute>
            <History />
          </UserRoute>
        }
      />
      <Route
        path="/user/password"
        element={
          <UserRoute>
            <Password />
          </UserRoute>
        }
      />
      <Route
        path="/user/wishlist"
        element={
          <UserRoute>
            <Wishlist/>
          </UserRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard/>
          </AdminRoute>
        }
      />
      
    </Routes>
    </>
    
  );

      
  
}

export default App;
