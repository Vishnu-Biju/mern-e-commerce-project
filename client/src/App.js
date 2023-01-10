import React, {useEffect} from 'react';
import { Routes , Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';


import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import ChangePassword from "./pages/auth/forgotPassword"

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
 }, []);

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
      
    </Routes>
    </>
    
  );

      
  
}

export default App;
