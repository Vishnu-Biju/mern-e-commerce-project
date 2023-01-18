import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createSub, getSub, removeSub,getSubs } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import CategoryForm from "../../../components/forms/CategoryForm";
import LoaclSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCateories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [category, setCategory] = useState("");

  //for Searching/Filtering
  //STEP 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    //when mounting and unmounting the ui refreshes
    loadCategories();
    loadSubs();
  }, []);

  // geting all the categories
  const loadCategories = () =>
    getCategories().then((c) => setCateories(c.data));

    //load all sub-categories
  const loadSubs = () =>
    getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created `);
        loadSubs();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer,slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  //step 3: creating function

  // step 4: creating function search function
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const categoryForm = () => (
    <div id="category-create" className="container col-md-6 offset-md-3 ">
      {loading ? (
        <h4> Loading</h4>
      ) : (
        <div>
          <h4>CREATE SUB-CATEGORY</h4>
        </div>
      )}

{/*select category*/}

      <div className="drop">
          <label style={{marginBottom:"20px",fontWeight:"600"}}>CATEGORY</label>
          <select
            name="category"
            className="select"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Please select</option>
            {categories.length > 0 &&
              categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        
 
{/*create sub category*/}
      <div id="fields">
        <CategoryForm
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
        />


        {/*search or filter category*/}

        <h4 style={{ marginTop: "50px" }}>FILTER HERE</h4>

        {/* step2*/}

        <LoaclSearch keyword={keyword} setKeyword={setKeyword} />
      </div>

      {/*category list */}
      <div className="category-list">
        <h4>CATEGORY LIST</h4>
        


        <p className="list-container">
          {/* step5*/}

           {subs.filter(searched(keyword)).map((s) => (
            <div className="list" key={s._id}>
              {s.name}
              <span
                onClick={() => handleRemove(s.slug)}
                className="button-Icon"
                style={{ color: "white", backgroundColor: "red" }}
              >
                <FaIcons.FaTrash />
              </span>
              <Link
                className="button-Icon"
                style={{ color: "white", float: "right" }}
                to={`/admin/sub/${s.slug}`}
              >
                {" "}
                <FaIcons.FaPencilAlt />{" "}
              </Link>
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

export default SubCreate;
