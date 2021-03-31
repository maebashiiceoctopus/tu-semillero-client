import logo from "./logo.svg";
import "./App.scss";
import { DatePicker, Space } from "antd";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  const test = (date) => {
    console.log(date);
  };
  return (
    <Router>
      <div className="App">
        <h1> Rutas</h1>

        <Link to= '/'>Home</Link>
        <br/>
        <Link to= '/Contact'>Contact</Link>
        <br/>
        <Link to= '/Users'>Users</Link>


        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Contact" exact component={Contact} />
          <Route exact path="/User" component={User} />
          <Route component={Error404} />

        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2> estamos en el home</h2>;
}

function Contact() {
  return <h2> estamos en el Contact</h2>;
}

function User() {
  return <h2> estamos en el User</h2>;
}

function Error404() {
  return <h2> Error 404!!!!</h2>;
}

export default App;
