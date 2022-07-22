// using react extenion type "rfce" to auto create the config to export
import React, { useState } from 'react';
import axios from "axios";
// import '../styles/RegisterPage.css'

function RegisterPage() {

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    var [registerStatus, setRegisterStatus] = useState("");

    // Need to set pages to have credentials true to prevent server error
    axios.defaults.withCredentials = true;

    // Function for onSubmit, when button is clicked
    // Post API can be seen at server/index.js
    const register = () => {

        // Check if it's empty or null
        // Reference: https://stackoverflow.com/questions/32625513/checking-if-multiple-variables-is-not-null-undefined-or-empty-in-an-efficient-w
        if(usernameReg && passwordReg) {
            console.log("not null")

            axios.post(
                "http://localhost:3001/register", 
                {username: usernameReg, password: passwordReg} )
                .then((response) => {
                    console.log("Registration sucess", response.data);
            });

            var sucess = "Register successful!";
            setRegisterStatus(sucess);

        } else {
            var failure = "Username & Password is not valid";
            setRegisterStatus(failure);
        }
    }

    return (        
        <div className='createRegisterPage'>
            <h1 className="headerText">Register</h1>

            <div className='form-container'>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        onChange={(e) => {
                            setUsernameReg(e.target.value);
                        }}
                    />
                </div>
                
                <div className="form-group">
                    <label>Password: </label>
                    <input
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => {
                        setPasswordReg(e.target.value); }}
                    />
                </div>

                <button onClick={register}>Register</button>
            </div>
            <h1>{registerStatus}</h1>

        </div>
    )

    // <label>Email: </label>
    // <ErrorMessage name='email' component="span" />
    // <Field autocomplete="off" id='inputField' name="email" placeholder="Enter Email..." />

}

export default RegisterPage