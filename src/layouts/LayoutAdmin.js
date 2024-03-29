import React, { useState } from "react";
import { Layout } from "antd";
import { Redirect, Route, Switch } from "react-router-dom";
import MenuTop from "../components/admin/MenuTop";
import MenuSider from "../components/admin/MenuSider";
import AdminSignIn from "../pages/Sign-In/SignIn";
/* import { getAccessToken, getRefreshToken } from "../api/auth"; */
import useAuth from "../hooks/useAuth";

import "./layoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;
  const [menuCollapsed, setMenucollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;

  const { user, isLoading } = useAuth();

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin "
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenucollapsed={setMenucollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            <LoadRoutes routes={routes} />
          </Content>
        </Layout>
      </Layout>
    );
  }
  return null;
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
