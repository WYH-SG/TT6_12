import React, { useState, UseEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  const [displayUsername, setDisplayUsername] = useState("");

  // Test function on a button to check if user is authenticated
  const userAuthenticated = () => {
    axios.get("http://localhost:3001/isUserAuth", {
        // Match ths headers of  "x-access-token" against index.js function verifyJWT
        // This is to check if the token is matched and return a message of user is authenticated
        headers: {
            "x-access-token": localStorage.getItem("token"),
        }
    }).then((response) => {
        console.log("userAuthenticated: ", response);
        setDisplayUsername(response.data);
    });
  };

  return (
    <div>
        <h1>dashboard</h1>
    </div>
  )

}

export default Dashboard