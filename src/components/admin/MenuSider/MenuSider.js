import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, MenuOutlined,UserOutlined } from "@ant-design/icons";
import "./menuSider.scss";

export default function MenuSider(props) {
  const {menuCollapsed}=props;
  const { Sider } = Layout;

  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to={"/admin"}>
            <HomeOutlined /> 
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={"/admin/users"}>
            <UserOutlined />
            <span className="nav-text">Usuarios</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
