import React from "react";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";

import "./SignIn.scss";

import Logo from "../../assets/img/png/svisi-logo.png";
import { SpaceContext } from "antd/lib/space";

export default function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;
  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img src={Logo} alt="Svisi, semilleros areandina" />
        </h1>
        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span>Entrar</span>} key="1">
              componente login form
            </TabPane>
            <TabPane tab={<span>Registrarse</span>} key="2">
              componente register form
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
