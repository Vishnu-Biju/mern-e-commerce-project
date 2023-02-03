import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?${text}`);
  };

  return (
    <form id="" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className="search"
        placeholder="Search"
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" ,paddingTop:"10px"}} />
    </form>
  );
};

export default Search;