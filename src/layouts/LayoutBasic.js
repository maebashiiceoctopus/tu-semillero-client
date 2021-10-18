import React from "react";
import { Layout, Row, Col } from "antd";
import { Route, Switch } from "react-router-dom";
import "./layoutBasic.scss";
import MenuHome from "../components/Home/MenuHome";

export default function LayoutBasic(props) {
  const { routes } = props;
  const { Footer } = Layout;
  return (
    <main className="main-container">
         <MenuHome/>
      <section className="main-container__content">
     
        <LoadRoutes  routes={routes}/>

      </section>
      
        <Footer>  </Footer>
    
    </main>
    
 

      
    
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
