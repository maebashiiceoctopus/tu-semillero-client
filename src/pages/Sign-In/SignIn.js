import React from "react";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";
import RegisterForm from "../../components/admin/RegisterForm";
import LoginForm from "../../components/admin/LoginForm/LoginForm";

import "./SignIn.scss";

import Logo from "../../assets/img/png/svisi-logo.png";

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
              <LoginForm/>
            </TabPane>
            <TabPane tab={<span>Registrarse</span>} key="2">
            <RegisterForm/>
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
