import React, {useState} from 'react'; 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const NavToRegister = () => {
    // 👇️ navigate to /contacts
    navigate('/register');
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
      <h4> LOGIN</h4>
      <div id="fields">
        <form>
          <input placeholder='email' type="string" style={{display:'block'}} onChange={(e) => setEmail(e.target.value)} />
           <input placeholder='password' type="password"  style={{display:'block'}} onChange={(e) => setPassword(e.target.value)} />
        </form>
           

        
       </div>    
       <button id="normal" disabled={loading} onClick={handleLogin} type="submit" >LogIn</button>
        <span> <p>Don't have an account?</p></span>
       <button id="normal" onClick={NavToRegister} >CREATE AN ACCOUNT</button>
    </div>
     
  )
 }


export default Login;




