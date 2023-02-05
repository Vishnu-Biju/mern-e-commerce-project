import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const saveAddressToDb = () => {
    //
  };

  return (
    
    <div className="Row5 p-5" style={{backgroundColor:"white"}}>
      <div className="col" style={{backgroundColor:"off-whight", padding: "10px",}}>
        <h4 style={{backgroundColor:"black",padding:"30px",borderRadius:"10px"}}>Delivery Address</h4>
        <br />
        <br />
         Adress
        <button  style={{float:"right"}} className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4  style={{backgroundColor:"black",padding:"30px",borderRadius:"10px"}}>Got Coupon?</h4>
        <br />
        
        coupon input and apply button
        <hr/>
      </div>

      <div className="col">
        <h4  style={{backgroundColor:"black",padding:"30px",borderRadius:"10px"}}>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} ({p.color}) x {p.count} ={" "}
              {p.product.price * p.count}
            </p>
          </div>
        ))}
        <hr />
        <p style={{fontWeight:"600" , fontSize:"20px"}}>Cart Total: {total}</p>

        <div className="Row">
          <div className="col">
            <button className="btn btn-success">Place Order</button>
          </div>

          <div className="col-md-6">
            <button 
             style={{float:"right"}}
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-danger"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;