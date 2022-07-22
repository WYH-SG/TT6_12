import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from 'react-bootstrap/Table';

// Import the exchange rate dataset
import exchange_data from '../data/exchangeRate.json'
import LoginPage from './LoginPage';
import Button from './Button';

function Dashboard() {

  const [displayUsername, setDisplayUsername] = useState("");

  // For exchange currency
  let base_currency = [];
  let exchange_currency = [];
  let exchange_rate = [];

  // useEffect() will run everytime we refresh the page
  // Call server index.js get() function for login page
  useEffect(() => {

    // Check if User is authenticated when acessing dashboard
    axios.get("http://localhost:3001/isUserAuth", {
      // Match ths headers of  "x-access-token" against index.js function verifyJWT
      // This is to check if the token is matched and return a message of user is authenticated
      headers: {
          "x-access-token": localStorage.getItem("token"),
      }
    }).then((response) => {
      console.log("userAuthenticated: ", response);
      setDisplayUsername(response.data.message);      
    });

  }, []);

  // Creating table data for live exchange rate
  // get table column
  console.log(exchange_data);
  // Get the table columns
  const column = Object.keys(exchange_data[0]);
  // console.log(column);

  // get table heading data
 const ThData =()=>{    
    return column.map((data)=>{
      return <th key={data}>{data}</th>
    })
  }

  // get table row data
  const tdData =() =>{
    return exchange_data.map((data)=>{
      return(
        <tr>
            {
            column.map((v)=>{
              return <td>{data[v]}</td>
            })
            }
        </tr>
      )
    })
  }
  
  return (
    <div>
        <h1>Dashboard</h1>
        <h1>{displayUsername}</h1>
        
        <div className='exchange-table'>
          <table className="table">
            <thead>
            <tr>{ThData()}</tr>
            </thead>
            <tbody>
            {tdData()}
            </tbody>
          </table>

        </div>

        <button onClick={Button} className = 'btn'>Logout</button>
        <button onClick={Button} className = 'btn'>Create</button>
        <button onClick={Button} className = 'btn'>Remove</button>

    </div>  
  )


}

export default Dashboard