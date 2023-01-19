import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue", "Golden"],
  brands: ["Apple", "Lenovo", "HP", "MSI", "Samsung", "Microsoft", "Asus"],
  color: '',
  brand: '',
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);

  //redux
  const { user } = useSelector((state) => ({ ...state }));
 
  // destructure the values
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values,user.token)
    .then((res) => {
      console.log(res);
      window.alert(`"${res.data.title}" is created successfully`);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
      
    });
  };

  const handleChange = (e) => {
   setValues({...values,[e.target.name]:e.target.value});
   //console.log(e.target.name, " ===== " , e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row"> 
        <div className="col-md-2" id="sideNav">
          <AdminNav />
        </div>
        <div className="col-md-10" id="hero" >
          <h4 className="h4ofproduct">PRODUCT CREATE</h4>
          <br />
          <br />
          <br />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>TITLE</label>
              <input
                type="text"
                name="title"
                className="product-form"
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>DESCRIPTION</label>
              <input
                type="text"
                name="description"
                className="product-form"
                value={description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>PRICE</label>
              <input
                type="number"
                name="price"
                className="product-form"
                value={price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>QUANTITY</label>
              <input
                type="number"
                name="quantity"
                className="product-form"
                value={quantity}
                onChange={handleChange}
              />
            </div>

            
            <div className="form-group">
              <label>SHIPPING</label>
              <select
                name="shipping"
                className="product-form"
                onChange={handleChange}
              > 
                <option >Please select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label>COLOR</label>
              <select
                name="color"
                className="product-form"
                onChange={handleChange}
              >
                <option >Please select</option>
                {colors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>BRAND</label>
              <select
                name="brand"
                className="product-form"
                onChange={handleChange}
              >
                <option >Please select</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
           <button  style={{display:"flex",justifyContent:"center"}} id="submit">SAVE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
