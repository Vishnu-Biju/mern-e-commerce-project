import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/ratings";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  // destructure
  const { images, title, description, slug,price } = product;
  return (
    <div id="box">
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div id="rating" className="text-center pt-2">
          NO RATINGS YET
        </div>
      )}
      
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "250px", objectFit: "cover" }}
            className="p-2"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </>,
        ]}
      >
        <Meta
          title={`${title && title.substring(0, 20)} - $${price}`}
          description={`${description && description.substring(0, 50)}...`}
        />
      </Card>
    </div>
  );
};

export default ProductCard;
