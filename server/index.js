const express = require('express'); // an instance of the framework
const mysql = require('mysql2');
const cors = require('cors'); // import cors from library cors


const bcrypt = require('bcrypt'); // for encrypting password
const saltRounds = 10;

const bodyParser = require('body-parser'); // parse all the reg.body
const cookieParser = require('cookie-parser'); // parse all the cookies
const session = require('express-session'); // create our session & maintain them

// JSON Web Token for authentication
const jwt = require('jsonwebtoken');


const app = express(); // initialize the app
app.use(express.json());

// whitelist your localhost to prevent cors block policy
// credentials: true [IMPORTANT]
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
})); 

app.use(cookieParser());
// For bodyParser:
// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Cookie expires in 24 hours
app.use(session({
    key: "userId",
    secret: "password",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000
    }
}));

// Create a connection to mySQL database
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "P@ssword1",
    database: "react_tut_loginpage"
});

/***
 * Call API to pass into mySQL database
 * ./route -> define the route for API calling
*/
// From register page, when user click register button
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Hash the password
    // Then use the hash password and pass into DB
    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err);
        }

        db.query(
            "INSERT INTO users (username, password) VALUES (?,?)", 
            [username, hash],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
            });
        
    });

});

// Check if User is authenticated using JWT token
// Check if the correct web token is passed
const verifyJWT = (req, res, next) => {
    // Grab the token
    const token = req.headers["x-access-token"];

    if(!token) { // if there's no token
        res.send("No Token found");
    } else { // if there is a token, verify it
        // Pass the token and the token secret defined in post('/login')
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({auth: false, message: "Authentication failed"});
            } else {
                // Save the decoded ID into req.userId variable
                // Allow for futher authentication in the future
                req.userId = decoded.id;
                next();
            }
        });
    }
};

// Call the verifyJWT function as middleman
app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send("User is Authenticated");
});

// For Login Page, get session
app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({
            loggedIn: true,
            user: req.session.user
        });
    } else {
        res.send({ loggedIn: false });
    }
})

// From Login Page, when user try to login
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Get the username only, then compare to the hash password
    db.query(
    "SELECT * FROM users WHERE username = ?;", username,
    (err, result) => {
        if (err) {
            res.send({err: err});
        } 

        if (result.length > 0) {
            // Make a comparison of the user input password with database password
            // If matching hash, allow login
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) { // if correct

                    // Get the Id of user from database
                    const id = result[0].id;

                    // Create a token with jwt, secret should not be "jwtSecret if publishing online"
                    // should be passing in .env file that contain sensitive information
                    // Token expires in 5 minutes
                    const token = jwt.sign({id}, "jwtSecret", {
                        expiresIn: 300,
                    });

                    // Create a session when user login is successful
                    req.session.user = result;
                    console.log("session: ", req.session.user);

                    // Send a json object with information to frontend
                    res.json({auth: true, token: token, result: result});
                    
                } else {
                    res.json({auth: false, message: "Wrong Username/Password"});
                }
            });
        } else {
            res.json({auth: false, message: "User doesn't exist"});
        }
    });
});


// Run the server on localhost port 3001
app.listen(3001, () => {
    console.log("server is running on port 3001");
});