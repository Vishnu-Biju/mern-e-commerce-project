
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKPqT6XssF3SSjm8C_C9FAL5pr8Hz5d0I",
  authDomain: "ecommerce-49d59.firebaseapp.com",
  projectId: "ecommerce-49d59",
  storageBucket: "ecommerce-49d59.appspot.com",
  messagingSenderId: "272725097680",
  appId: "1:272725097680:web:7739c64c088a501c7cf2d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth} ;
export default app;
