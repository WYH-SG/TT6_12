import './styles/App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// For React v6 syntax
// https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom

// Import the pages to be routed
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';
import { getTest } from "./functions/test";

function App() {
  const [data, setData] = useState("Hello World");

  useEffect (() => {
    getTest()
    .then((res) => {
      setData(res.message);
      console.log(res)
    })
    .catch(err => console.log(err)); 
  })
  return (

    <div className="App">
      <h1>{data}</h1>

      {/* Using React Router to route to pages path */}
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
