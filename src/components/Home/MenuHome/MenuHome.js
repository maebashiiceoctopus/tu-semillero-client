import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import SvisiLogo from "../../../assets/img/png/svisi-logo.png";
import SocialMedia from "../SocialLinks/SocialMedia";

import "./MenuHome.scss";

export default function MenuHome() {
  return (
    <Menu className="menu-home" mode="horizontal">
      <Menu.Item className="menu-home__logo">
        <Link to={"/"}>
          <img src={SvisiLogo} alt="Svisi Semilleros" />
        </Link>
      </Menu.Item>
      <Menu.Item className="menu-home__link">
        <Link to={"/"}>Home</Link>
      </Menu.Item>
      <Menu.Item className="menu-home__link">
        <Link to={"/contact"}>Contacto</Link>
      </Menu.Item>

      <div className="menu-home__social">
            <SocialMedia></SocialMedia>

      </div>
    </Menu>
  );
}
