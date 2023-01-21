import React from "react";


import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as IconName  from "react-icons/bi";


export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  },
  {
    title: "Product",
    path: "/admin/product",
    icon: <IoIcons.IoIosTv />,
    cName: "nav-text"
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: <IoIcons.IoIosToday />,
    cName: "nav-text"
  },
  {
    title: "Category",
    path: "/admin/category",
    icon: <IconName.BiCategoryAlt />,
    cName: "nav-text"
  },
  {
    title: "Sub Category",
    path: "/admin/sub",
    icon: <IoIcons.IoIosApps />,
    cName: "nav-text"
  },
  {
    title: "coupon",
    path: "/admin/coupon",
    icon: <IoIcons.IoIosGift />,
    cName: "nav-text"
  },
  {
    title: "password",
    path: "/admin/password",
    icon: <IoIcons.IoMdFingerPrint />,
    cName: "nav-text"
    
  },
];


