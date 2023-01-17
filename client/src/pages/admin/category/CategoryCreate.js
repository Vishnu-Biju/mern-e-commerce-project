import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  getCategory,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";


const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setcateories] = useState([]);

  useEffect(() => {
    //when mounting and unmounting the ui refreshes
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setcateories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created `);
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async(slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer,slug);
    if(window.confirm("Delete?")) {
      setLoading(true); 
      removeCategory(slug,user.token)
      .then(res => {
        setLoading(false);
        toast.error(`${res.data.name} deleted`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400){
          setLoading(false);
          toast.error(err.response.data);
        } 
      });

    }
  };

  const categoryForm = () => (
    <div id="category-create" className="container col-md-6 offset-md-3 ">
      {loading ? (
        <h4> Loading</h4>
      ) : (
        <div>
          <h4>CREATE CATEGORY</h4>
        </div>
      )}
      <div id="fields">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
          <br />
          <button id="normal" disabled={!name}>
            submit
          </button>
        </form>
      </div>
      <div className="category-list">
        <h4>CATEGORY LIST</h4>
        <p className="list-container">
          {categories.map((c) => (
            <div className="list" key={c._id}>
              {c.name}
              <span onClick={() => handleRemove(c.slug)} className="button-Icon" style={{  color: "white",backgroundColor:"red"}} ><FaIcons.FaTrash /></span>
              <Link className="button-Icon"  style={{  color: "white",float: "right"  }} to={`/admin/category/${c.slug}`}> <FaIcons.FaPencilAlt /> </Link>
            </div>
          ))}
        </p>
      </div>
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" id="sideNav">
          <AdminNav />
        </div>
        <div className="col" id="hero">
          {categoryForm()}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
