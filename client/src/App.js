import './styles/App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, {useState, useEffect} from "react";
// For React v6 syntax
// https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom

// Import the pages to be routed
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })

  const DetectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })
  }

  useEffect(()=>{
    window.addEventListener('resize', DetectSize)
    return()=>{
      window.removeEventListener('resize', DetectSize)
    }
  },[windowDimension])
  
  return (

    <div className="App" style={{backgroundColor: "#363636",
                                 height: windowDimension.winHeight,
                                 width: windowDimension.winWidth,}}>
      {/* Using React Router to route to pages path */}
      <h1 style ={{backgroundColor: "white", 
                   textAlign: "left",
                   padding: "10px 10px",
                   }}>DBS app login</h1>
      <Router>
        {/* Create a link to route user to another page */}
        <Link to ="/"> Login Page </Link>
        <Link to ="register"> Register </Link>
        <Link to ="dashboard"> Dashboard </Link>
        
        <Routes>
          {/* "exact" is only have 1 render and no multiple renders */}
          <Route exact path="/" element={<LoginPage/>} /> 
          <Route exact path="/register" element={<RegisterPage/>} /> 
          <Route exact path="/dashboard" element={<Dashboard/>} /> 
        </Routes>
      </Router>
    </div>
  );

} // end of function App()

export default App;
