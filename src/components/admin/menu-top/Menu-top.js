import React from "react";
import "./menu-top.scss";
import { Button } from "antd";
import { MenuOutlined, PoweroffOutlined  } from "@ant-design/icons";

import SvisiLogo from "../../../assets/img/png/svisi-logo.png";

export default function MenuTop() {
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img src={SvisiLogo} alt="logo svisi" className="menu-top__left-logo" />
        <Button type="link" onClick={() => console.log("Me diste click")}>
        <MenuOutlined />
      </Button>
      </div>
      <div className="menu-top__right">
          <Button type="link">
          <PoweroffOutlined />
          </Button>
      </div>
    

    </div>
  );
}
