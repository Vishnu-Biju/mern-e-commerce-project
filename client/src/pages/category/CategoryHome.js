import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { Link, useParams  } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";



const CategoryHome = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div  style={{ marginTop:"100px"}}>
          {loading ? (
            <h4 className="jumbow"style={{ marginBottom:"50px"}}>
              Loading...
            </h4>
          ) : (
            <h4 className="jumbow" style={{ marginBottom:"50px"}}>
              {products.length} Products in "{category.name}" category
            </h4>
          )}
        </div>
      </div>
    
      <div className="Row">
        {products.map((p) => (
          <div className="col-lg-3  col-md-5 p-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default CategoryHome;