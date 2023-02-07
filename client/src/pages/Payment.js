import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css";

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className="container p-2 text-center">
      <div className="col">
      <h4 style={{marginTop:"120px",marginBottom:"50px" ,backgroundColor:"white",padding:"20px",color:"#088178",borderRadius:"10px",fontWeight:"600"}}>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div> 
      </Elements>
      </div>

    </div>
  );
};

export default Payment;