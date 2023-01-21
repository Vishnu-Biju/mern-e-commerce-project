import axios from "axios";

//send req to backend to get the list of categories
export const getCategories = async () => 
  await axios.get(`${process.env.REACT_APP_API}/categories`,);

//for a single category
export const getCategory = async (slug) => 
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`,);

//for deleting category
export const removeCategory = async (slug, authtoken) => 
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`,{
    headers:{
      authtoken,
    }
  });

// for updating category
export const updateCategory = async (slug,category, authtoken) => 
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`,category,{
    headers:{
      authtoken,
    }
  });

  // to create a new category
export const createCategory = async (category, authtoken) => 
  await axios.post(`${process.env.REACT_APP_API}/category`,category,{
    headers:{
      authtoken,
    }
  });

  export const getCategorySubs = async (_id) => 
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`,);





   
  
