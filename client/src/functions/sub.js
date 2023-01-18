import axios from "axios";

//send req to backend to get the list of categories
export const getSubs = async () => 
  await axios.get(`${process.env.REACT_APP_API}/subs`,);

//for a single category
export const getSub = async (slug) => 
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`,);

//for deleting category
export const removeSub = async (slug, authtoken) => 
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`,{
    headers:{
      authtoken,
    }
  });

// for updating category
export const updateSub = async (slug,sub, authtoken) => 
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`,sub,{
    headers:{
      authtoken,
    }
  });

  // to create a new category
export const createSub = async (sub, authtoken) => 
  await axios.post(`${process.env.REACT_APP_API}/sub`,sub,{
    headers:{
      authtoken,
    }
  });



   
  
