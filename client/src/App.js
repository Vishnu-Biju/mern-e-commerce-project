import React, { useEffect,useState, lazy, Suspense } from "react";
import { Routes , Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';

import {auth} from './pages/auth/firebase';
import { useDispatch } from 'react-redux';
import {currentUser} from "./functions/auth";
import  LoadingPage  from "./components/cards/LoadingPage";
import { UserRoute } from "./components/routes/UserRoute";
import { AdminRoute } from "./components/routes/AdminRoute";
/* import Login from './pages/auth/Login';
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
import CreateCouponPage from './pages/admin/coupon/CreateCouponPage';
import Payment from './pages/Payment';

import Product from './pages/Product';
import CategoryHome from './pages/category/CategoryHome';
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout" */;


// using lazy
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const SideDrawer = lazy(() => import("./components/drawer/sideDrawer"));

const ChangePassword = lazy(() => import("./pages/auth/forgotPassword"));
const History = lazy(() => import('./pages/user/History'));
const Password = lazy(() => import("./pages/user/Password"));
const AdminPassword = lazy(() => import("./pages/admin/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() => import("./pages/admin/category/CategoryCreate"));
const CategoryUpdate = lazy(() => import("./pages/admin/category/CategoryUpdate"));
const SubCreate = lazy(() => import("./pages/admin/Sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/Sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProduct"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCouponPage = lazy(() => import("./pages/admin/coupon/CreateCouponPage"));
const Payment = lazy(() => import("./pages/Payment"));





const App = ()=> {
 const dispatch = useDispatch()
 const [loading, setLoading] = useState(true);


/*  useEffect(() => {
  setTimeout(() => setLoading(false), 3000);
}, []); */
 //to check firebase auth state


    // to check firebase auth state
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          // console.log("user", user);
  
          currentUser(idTokenResult.token)
            .then((res) => {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id,
                },
              });
            })
            .catch((err) => console.log(err));
        }
      });

  // clean up
  return() => unsubscribe();
 }, [dispatch]);

  return (  
  <Suspense
  fallback={
    <div className="col text-center p-5">
      <LoadingPage />
    </div>
  }
  >
 
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

      <Route
        path="/admin/coupon"
        element={
          <AdminRoute>
            <CreateCouponPage/>
          </AdminRoute>
        }
      />
      
      <Route  path="/payment" element ={<Payment/>} />
    </Routes>
    </Suspense>
    
  );

      
  
}

export default App;
