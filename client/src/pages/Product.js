import React, { useEffect, useState } from "react";
import { getProduct, productStar, getRelated } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from '../components/cards/ProductCard'


const Product = () => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  let { slug } = useParams();

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star)// current users star
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data)
        //Lload related products
        getRelated(res.data._id).then((res) => setRelated(res.data))
      })
      .catch((err) => console.log("SINGLE PRODUCT VIEW--->", err));
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    }).catch((err) => console.log("error:", err));
  };

  return (
    <div className="container-fluid pb-5">
      <div className="Row">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row pt-5 pb-5">
        <div className="jumbow">Related products</div>
        
      </div>
      <div className="Row">
        {related.length ? related.map((r) => 
        <div key={r._id} className=" col-lg-3 col-md-5 p-3">
          <ProductCard product={r}/>
        </div>) : <div id="rating">NO PRODUCTS FOUND '-'</div>}
      </div>
    </div>
  );
};

export default Product;
