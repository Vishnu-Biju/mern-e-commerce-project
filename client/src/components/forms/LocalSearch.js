import React from "react";




const LoaclSearch = ({keyword,setKeyword}) => {

    //step 3: creating function
    const handleSearchChange = (e) => {
      e.preventDefault();
      setKeyword(e.target.value.toLowerCase());
    };
  
  return (

    <div >
       < input 
        className="filter-pad"
        type="search" 
        placeholder="filter"
        value={keyword} 
        onChange={handleSearchChange}
        />
    </div>
  )
}

export default LoaclSearch;