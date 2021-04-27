import React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import MenuTop from '../components/admin/menu-top'

import "./layoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>

      {/* Sidebar Menu */}
      <Layout className="layout-admin">
        <Header className="layout-admin__header">

          <MenuTop> </MenuTop>
        </Header>
        <Content className="layout-admin__content">
          <LoadRoutes routes={routes} />
        </Content>
        <Footer className="layout-admin__footer">Tusemillero</Footer>
      </Layout>
    </Layout>
  );
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
