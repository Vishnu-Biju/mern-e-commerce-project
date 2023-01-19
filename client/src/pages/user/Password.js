import React ,{useState} from 'react';
import UserNav from '../../components/nav/UserNav';
import {auth} from '.././auth/firebase';
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";


const Password = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //console.log(password);
    //
    await updatePassword(user, password )
    .then(() => {
      // Update successful.
      setLoading(false);
      toast.success("Password updated successfully")
    }).catch((err) => {
      // An error ocurred
      // ...
      setLoading(false);
      toast.error(err.message);
    });
    
  };


  







  const passwordUpdateForm = () => (
    <div id='fields'>
      <form onSubmit={handleSubmit}>
      <div id='resetPass'>
         
        
        <input 
          type="password" 
          className='normal'
          onChange={(e) => setPassword(e.target.value)}
          id="resetPassInput"
          placeholder="Enter new password" 
          disabled={loading}
          
          />
        
        
        
        <button 
          id='normal1'
          disabled={!password || password.length <6 || loading}>
          Submit
        </button> 
      </div>
    </form>
   </div>
  
  );

return(
  <div className='container-fluid'>
    <div className='row'>
      <div className='col-md-2' id='sideNav'>
        <UserNav/>
      </div>
      <div className='col' id='main'>
          {loading ?<h4>Loading...</h4>: <h4>UPDATE PASSWORD</h4>}
          {passwordUpdateForm()}
      </div>
    </div>

  </div>
);
}

export default Password;