import React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";

import "./layoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      <h2>Menu Sider admin</h2>
      <Layout>
        <Header>header</Header>
        <Content>
          <LoadRoutes routes={routes} />
        </Content>
        <Footer>Tusemillero</Footer>
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
