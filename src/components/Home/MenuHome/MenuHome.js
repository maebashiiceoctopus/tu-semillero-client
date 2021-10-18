import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import './MenuHome.scss';

export default function MenuHome(){
    return(

        <Menu className="menu-home" mode="horizontal">
            <Menu.Item className="menu-home__logo">
                    LOGO
            </Menu.Item>
            <Menu.Item className="menu-home__link">
                <Link to={"/"}>Home</Link>
            </Menu.Item>
            <Menu.Item className="menu-home__link">
                <Link to={"/contact"}>Contacto</Link>
            </Menu.Item>
        </Menu>


    )
}

