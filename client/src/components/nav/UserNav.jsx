
import React, { useState } from "react";


import { IconContext } from "react-icons";

// ROUTING

import { Link } from "react-router-dom";

// DATA FILE
import { SidebarData } from "./SidebarDataUser";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";


// STYLES
import "./Navbar.css";

const UserNav = () => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      
<IconContext.Provider value={{ color: "#FFF" }}>
{/* All the icons now are white */}
<div className="naVbar">
  <Link to="#" className="menu-bars">
    <FaIcons.FaBars onClick={showSidebar} />
  </Link>
</div>
<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
  <ul className="nav-menu-items" onClick={showSidebar}>
    <li className="navbar-toggle">
      <Link to="#" className="menu-bars">
        <AiIcons.AiOutlineClose />
      </Link>
    </li>

    {SidebarData.map((item, index) => {
      return (
        <li key={index} className={item.cName}>
          <Link to={item.path}>
            {item.icon}
            <span>{item.title}</span>
          </Link>
        </li>
      );
    })}
  </ul>
</nav>
</IconContext.Provider>
</>
  );

}


export default UserNav;