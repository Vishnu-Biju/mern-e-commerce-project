import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItem";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/ratings";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { TabPane } = Tabs;

// this is children component of Product.js page
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, description, images, slug, _id } = product;
    const [tooltip, setTooltip] = useState("Click to add");
      // redux
      const { user, cart } = useSelector((state) => ({ ...state }));
      const dispatch = useDispatch();

      const handleAddToCart = () => {
        // create cart array
        let cart = [];
        if (typeof window !== "undefined") {
          // if cart is in local storage GET it
          if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
          }
          // push new product to cart
          cart.push({
            ...product,
            count: 1,
          });
          // remove duplicates
          //npm i lodash
          let unique = _.uniqWith(cart, _.isEqual);
          // save to local storage
          console.log("unique", unique);
          localStorage.setItem("cart", JSON.stringify(unique));
           // show tooltip
           setTooltip("Added");
    
            // add to reeux state
          dispatch({
            type: "ADD_TO_CART",
            payload: unique,
          });
          // add to redux state
          dispatch({
            type: "SET_VISIBLE",
            payload: true,
          });
        }
      };

  return (
    <div className="Row2">
      <h2 id="productinfo" className="p-4">
        {title}
      </h2>

      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div id="rating" className="text-center pt-2">
          NO RATINGS YET
        </div>
      )}

      <div className="Row3" id="singleProduct">
        <div className=" col-lg-5  col-md-6 p-4 ">
          {images && images.length ? (
            <Carousel showArrows={true} autoPlay infiniteLoop>
              {images &&
                images.map((i) => <img src={i.url} key={i.public_id} />)}
            </Carousel>
          ) : (
            <Card
              cover={
                <img
                  src={Laptop}
                  style={{ height: "450px", objectFit: "cover" }}
                  className="mb-3"
                />
              }
            ></Card>
          )}
          <Tabs type="card">
            <TabPane tab="Description" key="1">
              {`${description && description.substring(0, 90)}...`}
            </TabPane>
            <TabPane tab="More" key="2">
              {description && description}
            </TabPane>
          </Tabs>
        </div>

        <div className=" col-lg-5 col-md-5 p-4">
          <Card
            actions={[
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart}>
                  <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                  Cart
                </a>
              </Tooltip>,
              <Link to="/">
                <HeartOutlined className="text-info" /> <br /> Add to Wishlist
              </Link>,

              <RatingModal>
                <StarRatings
                  name={_id}
                  starRatedColor="orange"
                  changeRating={onStarClick}
                  rating={star}
                  numberOfStars={5}
                  isSelectable={true}
                />
              </RatingModal>,
            ]}
          >
            <ProductListItems product={product} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
