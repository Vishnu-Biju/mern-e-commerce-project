import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: ["Yes", "No"],
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue", "Golden"],
  brands: ["Apple", "Lenovo", "HP", "MSI", "Samsung", "Microsoft", "Asus"],
  color: "",
  brand: "",
};


const ProductUpdate = () => {

  //states
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [ArrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  
  //redux
  const { user } = useSelector((state) => ({ ...state }));

  let {slug} = useParams();

  useEffect(() => {
    loadProduct();
    loadCategories();
  },[]);

  const loadProduct = () => {
    getProduct(slug)
    .then((p) => {
      //console.log('single product',p );
      //load single product
      setValues({...values, ...p.data});
      // load single product category subs
      getCategorySubs(p.data.category._id)
      .then((res) => {
        setSubOptions(res.data)//on 1st load , show default subs
      });
      //step3 prepare array of sub ids to show as default of values as antd design select
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      })
      console.log('ARR',arr);
      setArrayOfSubs((prev) => arr);//required for antd
    })
  };

  const loadCategories = () =>
  getCategories().then((c) =>{ 
    console.log('CATEGORY ON UPDATE',c.data)
    setCategories(c.data)});



   const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
  
      values.subs = ArrayOfSubs ;
      values.category = selectedCategory ? selectedCategory : values.category;
  
      updateProduct(slug, values, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`"${res.data.title}" is updated`);
          Navigate('/admin/products')
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(err.response.data.err);
        });
    };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    //console.log(e.target.name, " ===== " , e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [] });
    
    setSelectedCategory(e.target.value);
    console.log("EXISTING CATEGORY", values.category);

    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });
//if user clickes back to the previous category, then show the old sub category
    if(values.category._id === e.target.value){
      loadProduct();
    }
    setArrayOfSubs([]);
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" id="sideNav">
          <AdminNav />
        </div>
        <div className="col-md-10" id="hero">
        {loading ? (<LoadingOutlined  className="text-white h1 center"/> 
          ):
          (<h4 >PRODUCT UPDATE</h4>)}
          
           

          <div className="">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
           handleSubmit={handleSubmit}
           handleChange={handleChange}
           setValues={setValues}
           values={values}
           handleCategoryChange={handleCategoryChange}
           categories={categories}
           subOptions={subOptions}
           ArrayOfSubs={ArrayOfSubs}
           setArrayOfSubs={setArrayOfSubs}
           selectedCategory={selectedCategory}
          />

        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
