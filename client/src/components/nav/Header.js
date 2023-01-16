import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const navigate = useNavigate();

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

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
      style={{ display: "block", backgroundColor: "#3498ff ", color: "white" }}
      onClick={handleClick}
      mode="horizontal"
      selectedKeys={[current]}
    >
      <Item  style={{  color: "white", backgroundColor: "#3498ff " }} 
      key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home </Link>
      </Item>
      {user &&
        <SubMenu
        key="submenu"
        style={{  color: "white",float: "right"  }}
        icon={<SettingOutlined />}
        title={user.email && user.email.split('@')[0]}
      >
        <Item
          key="setting:1"
          style={{ backgroundColor: "#3498ff ", color: "white" }}
        >
          Options 1
        </Item>
        <Item
          key="setting:2"
          style={{ backgroundColor: "#3498ff ", color: "white" }}
        >
          Options 2
        </Item>
        <Item
          icon={<LogoutOutlined />}
          onClick={logout}
          style={{ backgroundColor: "#3498ff ", color: "white" }}
        >
          Logout
        </Item>
      </SubMenu>
      }
      

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
