import React from "react";


import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";


export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "History",
    path: "/user/history",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  },
  {
    title: "Wishlist",
    path: "/user/wishlist",
    icon: <IoIcons.IoMdHeart />,
    cName: "nav-text"
  },
  {
    title: "Password",
    path: "/user/password",
    icon: <IoIcons.IoMdFingerPrint />,
    cName: "nav-text"
  }
];