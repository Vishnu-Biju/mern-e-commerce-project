import React, {useEffect} from 'react';
import { Routes , Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';



import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import SideDrawer from "./components/drawer/sideDrawer";


import ChangePassword from "./pages/auth/forgotPassword"
import History from './pages/user/History';
import { UserRoute } from "./components/routes/UserRoute";
import { AdminRoute } from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import AdminPassword from "./pages/admin/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/Sub/SubCreate";
import SubUpdate from './pages/admin/Sub/SubUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import AllProducts from './pages/admin/product/AllProduct';
import Product from './pages/Product';
import CategoryHome from './pages/category/CategoryHome';
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";



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


  // const backGround = () => {
  //   if(role === "true"){
  //     backGround = "dark";
  //   }else {
  //     backGround = "light";
  //   }
  // };

  


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
        <SideDrawer/>
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
      <Route
        path="/admin/category"
        element={
          <AdminRoute>
            <CategoryCreate/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/password"
        element={
          <AdminRoute>
            <AdminPassword/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/category/:slug"
        element={
          <AdminRoute>
            <CategoryUpdate/>
          </AdminRoute>
        }
      />
      
      <Route
        path="/admin/sub"
        element={
          <AdminRoute>
            <SubCreate/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/sub/:slug"
        element={
          <AdminRoute>
            <SubUpdate/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/product"
        element={
          <AdminRoute>
            <ProductCreate/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AllProducts/>
          </AdminRoute>
        }
      />
      
      <Route
        path="/admin/product/:slug"
        element={
          <AdminRoute>
            <ProductUpdate/>
          </AdminRoute>
        }
      />
      <Route  path="/product/:slug" element ={<Product/>} />
      <Route  path="/category/:slug" element ={<CategoryHome/>} />
      <Route  path="/sub/:slug" element ={<SubHome/>} />
      <Route  path="/shop" element ={<Shop/>} />
      <Route  path="/cart" element ={<Cart/>} />
      <Route  path="/checkout" element ={<Checkout/>} />
      
    </Routes>
    </>
    
  );

      
  
}

export default App;
