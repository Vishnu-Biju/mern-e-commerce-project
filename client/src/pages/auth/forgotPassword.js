import React,{useState,useEffect} from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const auth = getAuth();

const ChangePassword = () => {

  const [email,setEmail] = useState('');
  const [loading,setLoading]=useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("check your password and email !");
         setLoading(false);
        // ..
      })
      .catch((error) => {
        const errorMessage = error.message;
        // ..
      });
  }


    return (
    <div id="main" className="container col-md-6 offset-md-3 p-5">

      
        {loading? (<h4> Loading</h4>):(<div><h4>Forgot Password? </h4> <p>don't worry</p></div>)}
      <div id="fields">
      <form onSubmit={handleSubmit} >
          <input type="email" placeholder="email"
          value={email} onChange={(e) => setEmail(e.target.value)}
          autoFocus
           />
           <br />
           <button id="normal" disabled={!email}>submit</button>
        </form>
      </div>
        

    </div>
    );


};

export default ChangePassword;

