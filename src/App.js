import React  from 'react';
import "./App.scss";
import Admin from './pages/Admin-page/Admin';
import Contact from './pages/Admin-page/Contact';
import SignIn from './pages/Admin-page/SignIn';
import Home from './pages/Home';

function App() {
 return(
   <div>
     <h1>TuSemillero APP</h1>
     <Admin/>
     <SignIn/>
     <Home/>
     <Contact/>
   </div>
 )
}



export default App;
