import React ,{useState,useEffect} from 'react'; 
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import app from './firebase';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux';
import {createOrUpdateUser} from "../../functions/auth";



const Register= () => {
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

  const NavToLogin = () => {
    // 👇️ navigate to /contacts
    navigate('/login');
  }


  let dispatch = useDispatch();
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
      })
      .catch(err => console.log(err));
      navigate("/");
     
  
  };

  const handleRegister = async(e) => {
    
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
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
      })
      .catch(err => console.log(err));
      navigate("/");
    } catch (error) {
      toast.warning("something went wrong! check your email and password");
      
      
      setLoading(false);
      // ..
    }

  };

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