import React, { useState, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "./firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {createOrUpdateUser} from "../../functions/auth";



const Login = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();


  const { user } = useSelector((state) => ({ ...state }));




   useEffect(() => {
     if (user && user.token) ;
   }, [user]);

  const NavToRegister = () => {
    // 👇️ navigate to /contacts
    navigate("/register");
  };

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    if(res.data.role === "admin"){
      navigate("/admin/dashboard");
    }else {
      navigate("/user/history");
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
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
        roleBasedRedirect(res);
      })
      .catch(err => console.log(err));
      
        

    
      // ...
    } catch (error) {
      
      toast.warning("check your password and email !");
      // const errorMessage = error.message;
      setLoading(false);
    }
  };






  const googleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    

    const { user } = result;
    const idTokenResult = await user.getIdTokenResult();

    createOrUpdateUser(idTokenResult.token)
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
        roleBasedRedirect(res);
      })
      .catch(err => console.log(err));
      //navigate("/");
      
    // The signed-in user info.

    //    // ...
    }
  

  

  return (
    
    <div id="main">
      {loading ? <h4> Loading...</h4> : <h4> LOGIN </h4>}
      <div id="fields">
        <form>
          <input
            placeholder="email"
            type="string"
            style={{ display: "block" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            style={{ display: "block" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <button
          id="normal"
          disabled={loading}
          onClick={handleLogin}
          type="submit"
        >
          LogIn
        </button>
        <span id="danger">
          <Link to="/forgot/password">
            <p id="danger" style={{ float: "right" }}>
              forgot password?
            </p>
          </Link>
        </span>

        <span id="blue">
          {" "}
          <p> Don't have an account?</p>
        </span>
        <button id="normal" onClick={NavToRegister}>
          CREATE AN ACCOUNT
        </button>
        <button
          id="normal"
          disabled={loading}
          onClick={googleLogin}
          type="submit"
        >
          login with google
        </button>
      </div>
    </div>
  );
};

export default Login;
