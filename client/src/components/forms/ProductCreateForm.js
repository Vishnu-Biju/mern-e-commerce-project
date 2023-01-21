import React from "react";
import { Select, Space } from "antd";
const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  subOptions,
  showSubs,
}) => {
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

  return (
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
          <option>Please select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>COLOUR</label>
        <select name="color" className="product-form" onChange={handleChange}>
          <option>Please select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>BRAND</label>
        <select name="brand" className="product-form" onChange={handleChange}>
          <option>Please select</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>CATEGORY</label>
        <select
          name="category"
          className="product-form"
          onChange={handleCategoryChange}
        >
          <option>Please select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {showSubs && (
          <div className="form-group">
          <label>SUB-CATEGORIES</label>
          <Select
            mode="multiple"
            className="product-form"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id} className="Option">
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>

      )}
    

      <button style={{ display: "flex", justifyContent: "center" }} id="submit">
        SAVE
      </button>
    </form>
  );
};
export default ProductCreateForm;
