import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItem";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/ratings";

const { TabPane } = Tabs;

// this is children component of Product.js page
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, description, images, slug, _id } = product;

  return (
    <div className="Row2">
        <h2 id="productinfo" className="p-4">
            {title}
        </h2>
      
      {product && product.ratings && product.ratings.length > 0
          ? showAverage(product)
          : <div id = "rating" className="text-center pt-2">NO RATINGS YET</div>}
      

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
              <>
                <ShoppingCartOutlined className="text-success" /> <br />
                Add to Cart
              </>,
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
