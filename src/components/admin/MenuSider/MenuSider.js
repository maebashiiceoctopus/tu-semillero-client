import React from "react";
import { Link ,withRouter} from "react-router-dom";
import { Layout, Menu } from "antd";
import { FormOutlined,UserOutlined } from "@ant-design/icons";
import "./menuSider.scss";

 function MenuSider(props) {
  const {menuCollapsed, location}=props;
  const { Sider } = Layout;

  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
      <Menu.Item key="1">
          <Link to={"/admin/users"}>
            <UserOutlined />
            <span className="nav-text">Usuarios</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={"/admin/blog"}>
          <FormOutlined />
            <span className="nav-text">Blog</span>
          </Link>
        </Menu.Item>
       
      </Menu>
    </Sider>
  );
}
export default withRouter(MenuSider);