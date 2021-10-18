import React from "react";
import { Layout, Row, Col } from "antd";
import { Route, Switch } from "react-router-dom";
import "./layoutBasic.scss";
import MenuHome from "../components/Home/MenuHome";

export default function LayoutBasic(props) {
  const { routes } = props;
  const { Footer } = Layout;
  return (
    <Row>
      <Col md={4} />

      <Col md={16}>
      <MenuHome/>
    <LoadRoutes  routes={routes}/>
        <Footer></Footer>
      </Col>

      <Col md={4}></Col>
    </Row>
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
