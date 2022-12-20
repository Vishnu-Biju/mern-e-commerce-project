import React, {useEffect} from 'react';
import { Routes , Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';


import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';

import {auth} from './pages/auth/firebase';
import { useDispatch } from 'react-redux';


const App = ()=> {
 const dispatch = useDispatch()

 //to check firebase auth state
 useEffect(()=> {
  const unsubscribe =  auth.onAuthStateChanged(async (user)=> {
    if(user) {
      const idTockenResult = await user.getIdTokenResult();
        console.log("user",user)
      dispatch({
        type:'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token:idTockenResult.token,
        }, 
      })
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
      
    </Routes>
    </>
    
  );

      
  
}

export default App;
