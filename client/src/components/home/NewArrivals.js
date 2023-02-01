import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCart from "../cards/LoadingCard";
import { Pagination } from "antd";


const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);


  useEffect(() => {
    loadAllProducts();
  }, [page]);


  
  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
 

  return (
    <div className="home-content">
     

      <div className="products">
      {loading ? (
          <LoadingCart count={4} />
        ) : (
          <div className="Row">
            {products.map((product) => (
              <div key={product._id} id="cardmain" className=" col-lg-3 col-md-5 p-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav id="pagination" className="col-lg-4  col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount/4)*10 }
            onChange={(value) => setPage(value)}
            
          />
        </nav>

      </div>
     
    </div>
  );
};

export default NewArrivals;
