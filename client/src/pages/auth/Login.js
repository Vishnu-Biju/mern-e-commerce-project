import React, {useState,useEffect} from 'react'; 
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword ,signInWithPopup} from "firebase/auth";
import app from './firebase';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

const Login = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  const {user} =  useSelector((state) => ({...state}));
  

  useEffect(() => {
    if(user && user.token) navigate('/');
  }, [user]);


  const NavToRegister = () => {
    // 👇️ navigate to /contacts
    navigate('/register');
  }
    let dispatch = useDispatch();

      const googleLogin = async () => {
      const result = await signInWithPopup(auth,provider);
      navigate('/');
      
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const idTokenResult = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      dispatch({
        type:'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token:idTokenResult.token,
        }, 
      });
      // ...
    }
    
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

     
      // Signed in 
      setLoading(true);
      const user = userCredential.user;
      
      
     
      navigate('/');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      toast.warning("check your password and email !");
      // const errorMessage = error.message;
      setLoading(false);
    });

  }





  return (

    <div id = "main">
      {loading ? <h4> Loading...</h4> : <h4> LOGIN </h4>}
      <div id="fields">
        <form>
          <input placeholder='email' type="string" style={{display:'block'}} onChange={(e) => setEmail(e.target.value)} />
           <input placeholder='password' type="password"  style={{display:'block'}} onChange={(e) => setPassword(e.target.value)} />
        </form>
        <button id="normal" disabled={loading} onClick={handleLogin} type="submit" >LogIn</button>
        <span id="danger"><Link to="/forgot/password"  ><p id='danger' style={{ float: "right" }}>forgot password?</p></Link></span>

           

        
        
        <span id ="blue"> <p > Don't have an account?</p></span>
       <button id="normal" onClick={NavToRegister} >CREATE AN ACCOUNT</button>
       <button id="normal" disabled={loading} onClick={googleLogin} type="submit" >login with google</button>
       
      
       
      </div> 
      
    </div>
     
  )
 }


export default Login;




