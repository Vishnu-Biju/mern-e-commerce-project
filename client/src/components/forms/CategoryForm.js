import React from "react";


const CategoryForm = ({handleSubmit,name,setName}) => (
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
)

export default CategoryForm;