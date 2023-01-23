import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";

const AllProducts = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(100)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div id="sideNav" className="col-md-2">
          <AdminNav />
        </div>

          <div className="col">
            <br />
            <br />

            {loading ? (<h4>LOADING...</h4>) : (<h4>ALL PRODUCTS</h4>)}
              <div className="row">
                {products.map((product) => (
                  <div className="col-md-4" id="card">
                    <AdminProductCard product={product} key={product._id}/>
                  </div>
                ))}
              </div>
          </div>
          
        
      </div>
    </div>
  );
};

export default AllProducts;
