import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div style={{paddongTop:"20px"}}>
    <p>
      <span style={{display:"block" ,textAlign:"center" ,fontWeight:"600",color:"#030c3e"}}>Order Id:{" "} {order.paymentIntent.id}</span>
       
  
      
      <span style={{display:"inline-block" ,textAlign:"center" ,fontWeight:"600",color:"#088178 "}}>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      {" / "}
      <span style={{display:"inline-block" ,textAlign:"center" ,fontWeight:"600",color:"#030c3e"}}>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "}
      <span style={{display:"inline-block" ,textAlign:"center" ,fontWeight:"600",color:"#088178 "}}>Payment: {order.paymentIntent.status.toUpperCase()}</span>
    
      <span style={{display:"inline-block" ,textAlign:"center" ,fontWeight:"600",color:"#030c3e"}}>
        Orderd on:{ " "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      
      <span style={{display:"block" ,textAlign:"center" ,fontWeight:"600",color:"#088178 "}}>
        Amount: 
        {(order.paymentIntent.amount/100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
      <br />
      {showStatus && (
        <span className="badge  text-white"style={{backgroundColor:"#088178 "}} >
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;
