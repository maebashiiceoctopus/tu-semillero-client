import React from "react";
import "./MenuTop.scss";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  PoweroffOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { logout } from "../../../api/auth";

import SvisiLogo from "../../../assets/img/png/svisi-logo.png";
import SvisiLogoMovil from "../../../assets/img/svg/svisi-movil.svg";

export default function MenuTop(props) {
  const { menuCollapsed, setMenucollapsed } = props;
  const logoutUser = () => {
    logout();
    window.location.reload();
  };
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img src={SvisiLogo} alt="logo svisi" className="menu-top__left-logo-desk" />
         <img src={SvisiLogoMovil} alt="logo svisi" className="menu-top__left-logo-movil" />
        <Button
          type="link"
          onClick={() => setMenucollapsed(!menuCollapsed)}
          icon={menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        ></Button>
      </div>
      <div className="menu-top__right">
        <Button
          type="link"
          onClick={logoutUser}
          icon={<PoweroffOutlined />}
        ></Button>
      </div>
    </div>
  );
}
