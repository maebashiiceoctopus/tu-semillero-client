import React from "react";

import { Route, Switch } from "react-router-dom";
import "./layoutBasic.scss";
import MenuHome from "../components/Home/MenuHome";
import FooterHome from "../components/footer"

export default function LayoutBasic(props) {
  const { routes } = props;

  return (
    <>
      <nav className="main-container">
        <MenuHome />
      </nav>

      <section className="main-container__content">
        <LoadRoutes routes={routes} />
      </section>

      <FooterHome/>
    </>
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
