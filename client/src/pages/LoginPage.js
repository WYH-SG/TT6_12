// using react extenion type "rfce" to auto create the config to export
import React, { useEffect, useState } from 'react';
import axios from "axios";
// import '../styles/LoginPage.css'
// reference for redirect: https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    var [messageDisplay, setMessageDisplay] = useState("");

    var [loginStatus, setLoginStatus] = useState(false);

    // Need to set pages to have credentials true to prevent server error
    axios.defaults.withCredentials = true;

    // Function for onSubmit, when button is clicked
    // Post API can be seen at server/index.js
    const login = () => {
        axios.post(
            "http://localhost:3001/login", 
            {username: username, password: password} )
            .then((response) => {
                console.log(response.data)
                                
                if (response.data.auth == false) {
                    setLoginStatus(false);
                    setMessageDisplay(response.data.message);
                } else {
                    console.log("Login sucessful");
                    setLoginStatus(true);

                    // Store in localstorage for JWT token
                    // localStorage.setItem("token", "Bearer " + response.data.token);
                    localStorage.setItem("token", response.data.token);

                    var temp = "welcome " + response.data.result[0].username + "!";
                    setMessageDisplay(temp);

                    // redirect to another page on successful login
                    // redirect(); 
                }
        });
    }

    // Function to redirect to dashboard page
    let navigate = useNavigate(); 
    const redirect = () => {
        navigate('/dashboard');
    }

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
            setMessageDisplay(response.data);
        });
    };

    // useEffect() will run everytime we refresh the page
    // Call server index.js get() function for login page
    useEffect(() => {

        axios.get("http://localhost:3001/login").then((response) => {

            console.log("session", response);

            // If user is logged in and refresh the page, still considered logged in from cookie saved.
            if (response.data.loggedIn == true) {
                var logged = "Welcome " + response.data.user[0].username + "!";
                setMessageDisplay(logged);
            } else {
                var notLogged = "Please Log in";
                setMessageDisplay(notLogged);
            }
        });
    }, []);

    return (
        <div className='createLoginPage'>

            <h1 className="headerText">Login</h1>

            <div className='form-container'>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                
                <div className="form-group">
                    <label>Password: </label>
                    <input
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => {
                        setPassword(e.target.value); }}
                    />
                </div>

                <button onClick={login}>Login</button>
            </div>

            {loginStatus && <button onClick={userAuthenticated}>Check Authentication</button> }
            <h1>{messageDisplay}</h1>

        </div>
    )
  
}

export default LoginPage