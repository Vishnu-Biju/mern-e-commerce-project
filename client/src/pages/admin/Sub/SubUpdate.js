import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateSub, getSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import { useParams } from "react-router-dom";
import {  useNavigate } from "react-router-dom";

const SubUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCateories] = useState([]);
  const [parent, setParent] = useState("");
  let {slug} = useParams();
  const navigate = useNavigate();



  useEffect(() => {
    //when mounting and unmounting the ui refreshes
    loadCategories();
    loadSub();
  }, []);

  // geting all the categories
  const loadCategories = () =>
    getCategories().then((c) => setCateories(c.data));

    //load all sub-categories
  const loadSub = () =>
    getSub(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    updateSub(slug,{ name, parent}, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated successfully`);
        navigate("/admin/sub");
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
          <h4>UPDATE SUB-CATEGORY</h4>
        </div>
      )}

{/*select category*/}

      <div className="drop">
          <label style={{marginBottom:"20px",fontWeight:"600"}}>CATEGORY</label>
          <select
            name="category"
            className="select"
            onChange={(e) => setParent(e.target.value)}
          >
            <option>Please select</option>
            {categories.length > 0 &&
              categories.map((c) => ( <option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>))}
          </select>
        </div>
        
 
{/*create sub category*/}
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

export default SubUpdate;
