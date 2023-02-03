import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
 

  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    //
  };

  const RedirectToCart = () => {
    localStorage.setItem('cartRedirect', `/cart`);
    navigate("/login");
    
  };

  const showCartItems = () => (
    <table style={{width:"100%" }}>
      <thead >
        <tr >
          <td scope="col">Image</td>
          <td scope="col">Title</td>
          <td scope="col">Price</td>
          <th scope="col">Brand</th>
          <td scope="col">Color</td>
          <td scope="col">Count</td>
          <td scope="col">Shipping</td>
          <td scope="col">Remove</td>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );


  return (
    <div className="container-fluid p-0">
      <div className="Row5 pt-5 p-3 col-md-12" style={{  color: "Black", backgroundColor: "white"}}>
        <div className="col-lg-12 pt-5" style={{fontWeight:"400"}}>
          <h4 style={{textAlign:"center" ,fontWeight:"600",color:"red"}}>CART - {cart.length} Products</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            <div id="cart" class="section-p1">
             { showCartItems()}
            </div>
            
          )}
        </div>
        <div className="col-lg-12 col-md-12 pt-5 p-3">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button 
            onClick={saveOrderToDb}
            className="btn btn-sm btn-primary mt-2"
            disabled={!cart.length}
            > 
             Proceed to Checkout
            </button>
          ) : (
            <button
            onClick={RedirectToCart}
             className="btn btn-sm btn-primary mt-2">
              Login to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;