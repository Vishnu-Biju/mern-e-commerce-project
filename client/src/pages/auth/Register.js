import React ,{useState} from 'react'; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import app from './firebase';
import { useNavigate } from "react-router-dom";



const Register= () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const NavToLogin = () => {
    // 👇️ navigate to /contacts
    navigate('/login');
  }


  
  const googleLogin = () => {
    // using google
  }



  const handleRegister = () => {
    
    createUserWithEmailAndPassword(auth, email, password)
   
    .then((userCredential) => {
      // Signed in 
      setLoading(true);
      navigate('/');
      const user = userCredential.user;
      console.log(user);
      
      
       
      // ...
    })
    .catch((error) => {
      toast.warning("something went wrong! check your email and password");
      const errorCode = error.code;
      
      setLoading(false);
      // ..
    });

  }

  return (

    <div id = "main">
      {loading ? <h4> Loading...</h4> : <h4> REGISTER </h4>}
      <div id="fields">
        <form>
          <input placeholder='email' type="email" style={{display:'block'}} onChange={(e) => setEmail(e.target.value)} />
           <input placeholder='password' type="password"  style={{display:'block'}} onChange={(e) => setPassword(e.target.value)} />
        </form>
  
          
       <button id="normal" disabled={loading} onClick={handleRegister} type="submit" >SignUp</button>
      
       <span><p>Have An Account?</p></span>
       <button id="normal" onClick={NavToLogin}>LOGIN</button>
    </div> 
      <button id="normal" onClick={googleLogin}>LOGIN with google</button>
    </div>
     
  )
 }

export default Register ; 