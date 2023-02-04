import React, { useState } from "react";
import { Menu } from "antd";
import Badge from "@mui/material/Badge";
import {
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  UserAddOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const navigate = useNavigate();

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.

        toast.warning("an unexpected error occured !");
      });
  };

  return (
    <Menu
      style={{
        display: "inline-block",
        backgroundColor: "#f7f7f7",
        color: "black",
        position: "fixed",
        width: "100%",
        paddingTop: "10px",
        overFlow: "hidden",
      }}
      onClick={handleClick}
      mode="horizontal"
      selectedKeys={[current]}
    >
      <Item
        style={{
          color: "#088178",
          backgroundColor: "#f7f7f7",
          fontWeight: "700",
          fontSize: "16px",
        }}
        key="home"
        icon={<AppstoreOutlined />}
      >
        <Link to="/">Home </Link>
      </Item>




      {user && (
        <SubMenu
          key="submenu"
          style={{
            color: "#088178",
            float: "right",
            fontWeight: "700",
            fontSize: "16px",
          }}
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
        >
          {user && user.role === "subscriber" && (
            <Item
              key="setting:1"
              style={{
                color: "#088178",
                backgroundColor: "#f7f7f7",
                fontWeight: "700",
                fontSize: "16px",
                marginTop: "50px",
              }}
            >
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item
              key="setting:1"
              style={{
                color: "#088178",
                backgroundColor: "#f7f7f7",
                fontWeight: "700",
                fontSize: "16px",
              }}
            >
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item
            icon={<LogoutOutlined />}
            onClick={logout}
            style={{
              color: "#088178",
              backgroundColor: "#f7f7f7",
              fontWeight: "700",
              fontSize: "16px",
            }}
          >
            Logout
          </Item>
        </SubMenu>
      )}



      <Item
        style={{
          color: "#088178",
          backgroundColor: "#f7f7f7",
          fontWeight: "700",
          fontSize: "16px",
          
        }}
        key="shop"
        icon={<ShoppingOutlined />}
      >
        <Link to="/shop">Shop </Link>
      </Item>
       

      <Item
        style={{
          color: "#088178",
          backgroundColor: "#f7f7f7",
          fontWeight: "700",
          fontSize: "16px",
          float: "right",
        }}
        key="cart"
        icon={<ShoppingCartOutlined />}
      >
        <Link to="/cart">
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={cart.length}
            color="secondary"
            overlap="circular"
          >
            Cart
          </Badge>
        </Link>
      </Item>
      <item  key="search" >
        
      
      </item>
      
      <Item
        style={{
          float: "right",
        }}
        key="search"
        
      >
        <Search />
      </Item>

      {!user && (
        <Item
          key="register"
          style={{ marginLeft: "auto", float: "right" }}
          icon={<UserAddOutlined />}
        >
          <Link to="/Register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" style={{ float: "right" }} icon={<UserOutlined />}>
          <Link to="/Login">Login</Link>
        </Item>
      )}
    </Menu>
  );
};

export default Header;
