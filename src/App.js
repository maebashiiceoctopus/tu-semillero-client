import logo from './logo.svg';
import './App.scss';
import { DatePicker, Space } from 'antd';
import {BrowserRouter as Router, Route, link} from 'react-router-dom';


function App() {

  const test = (date)=>{
    console.log(date)
  }
  return (
    <Router>
    <div className="App">
      <h1> Rutas</h1>


    </div>
    </Router>
  );
}

function Home(){
  return <h2> estamos en el home</h2>
}

function Contact(){
  return <h2> estamos en el Contact</h2>
}

function User(){
  return <h2> estamos en el User</h2>
}




export default App;
