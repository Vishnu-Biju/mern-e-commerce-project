import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user } = useSelector((state) => ({ ...state }));
  
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  const navigate = useNavigate();
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  
  console.log("user--->",user.token); 
  useEffect(() => {
    //
   if(user?.token){
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });}
  }, [user?.token]);
  

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
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p style={{ color: "black", fontWeight: "bold" }}>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="product-form"
        style={{
          backgroundColor: "white",
          borderColor: "black",
          color: "black",
          fontWeight: "bold",
        }}
      />
      <button
        style={{ float: "right" }}
        onClick={applyDiscountCoupon}
        className="btn btn-success mt-2"
      >
        Apply
      </button>
    </>
  );
  return (
    <div className="Row5 p-5" style={{ backgroundColor: "white" }}>
      <div className="col">
        <h4
          style={{
            backgroundColor: "black",
            padding: "30px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          Delivery Address
        </h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4
          style={{
            backgroundColor: "black",
            padding: "30px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          Got Coupon?
        </h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="p-3"
             style={{
              fontWeight: "600",
              fontSize: "20px",
              color: "#D10000",
            }}
        >{discountError}...</p>}
      </div>

      <div className="col">
        <h4
          style={{
            backgroundColor: "black",
            padding: "30px",
            borderRadius: "10px",
            marginBottom: "30px",
          }}
        >
          Order Summary
        </h4>
        <hr />
        <p style={{ fontWeight: "600", fontSize: "20px" }}>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p style={{ fontWeight: "600", fontSize: "20px" }}>
          Cart Total: {total}
        </p>

        {totalAfterDiscount > 0 && (
          <p
            className=" p-3"
            style={{
              fontWeight: "600",
              fontSize: "20px",
              backgroundColor: "#008060",
              color: "white",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

        <div className="Row">
          <div className="col">
            <button
              disabled={!addressSaved || !products.length}
              className="btn btn-success"
              onClick={() => navigate("/payment")}
            >
              Place Order
            </button>
          </div>

          <div className="col">
            <button
              style={{ float: "right" }}
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
