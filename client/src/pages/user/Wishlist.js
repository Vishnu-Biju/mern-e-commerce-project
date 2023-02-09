import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      // console.log(res);
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className='col-sm-1 col-md-4 col-lg-2'  id='sideNav'>
          <UserNav />
        </div>
        <div className="col-sm-11 col-md-8 col-lg-10  mt-5 ">
          <h4 className="mt-5 mb-5" style={{textAlign:"center" ,fontWeight:"600",color:"white", backgroundColor:"black",padding:"30px", borderRadius:"15px"}}>WHISHLIST</h4>

          {wishlist.map((p) => (
            <div key={p._id} className="alert alert-secondary">
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span
              >
                <DeleteOutlined className="text-danger"  onClick={() => handleRemove(p._id)} style={{float:"right"}} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;