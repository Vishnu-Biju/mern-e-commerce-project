import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  updateCategory,
  getCategory,
 
} from "../../../functions/category";
import {  useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";



const CategoryUpdate = ( ) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  let {slug} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    //when mounting and unmounting the ui refreshes
     loadCategory();
    
  }, []);

   const loadCategory = () =>
    getCategory(slug).then((c) => setName(c.data.name));

   const handleSubmit = (e) => {
     e.preventDefault();
     //console.log(name);
     setLoading(true);
     updateCategory(slug,{ name }, user.token)
       .then((res) => {
        setLoading(false);
         setName("");
         toast.success(`"${res.data.name}" is updated `);
         navigate("/admin/category");
       })
       .catch((err) => {
         setLoading(false);
         if (err.response.status === 400) toast.error(err.response.data);
       });
   };



  const categoryForm = () => (
    <div id="category-create" className="container col-md-6 offset-md-3 ">
      {loading ? (
        <h4> Loading</h4>
      ) : (
        <div>
          <h4>UPDATE CATEGORY</h4>
        </div>
      )}
      <div id="fields">
        <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
      </div>
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div  id="sideNav">
          <AdminNav />
        </div>
        <div className="col" id="hero">
          {categoryForm()}
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
