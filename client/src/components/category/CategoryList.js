import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <Link
        style={{ backgroundColor: "black", color: "white" }}
        to={`/category/${c.slug}`}
        className="col btn btn-outlined btn-lg btn-block btn-raised m-3"
      >
        <div style={{}} key={c._id}>
          {c.name}
        </div>
      </Link>
    ));

  return (
    <div className="container">
      <div className="row" style={{ marginTop: "20px" }}>
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
