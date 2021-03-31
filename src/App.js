import logo from './logo.svg';
import './App.scss';
import { DatePicker, Space } from 'antd';


function App() {
  const test = (date)=>{
    console.log(date)
  }
  return (
    <div className="App">
      <h1> Web TuSemillero</h1>

      <DatePicker  onChange={test}/>

    </div>
  );
}

export default App;
