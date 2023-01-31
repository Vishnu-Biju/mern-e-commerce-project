import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{" "}
        <span style={{float:"right" , fontWeight:"800"}}>
          $ {price}
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          Category{" "}
          <Link
            to={`/category/${category.slug}`}
            style={{float:"right" , fontWeight:"700"}}>
          
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          Sub Categories
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              style={{float:"right",fontWeight:"700"}}
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Shipping{" "}
        <span style={{float:"right" , fontWeight:"700"}}>
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
        Color{" "}
        <span style={{float:"right" , fontWeight:"700"}}>
          {color}
        </span>
      </li>

      <li className="list-group-item">
        Brand{" "}
        <span style={{float:"right" , fontWeight:"700"}}>
          {brand}
        </span>
      </li>

      <li className="list-group-item">
        Available{" "}
        <span style={{float:"right" , fontWeight:"700"}}>
          {quantity}
        </span>
      </li>

      <li className="list-group-item">
        Sold{" "}
        <span style={{float:"right" , fontWeight:"700"}}>
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
