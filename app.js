// Import core module
const express = require('express');
const session = require('express-session');
const path = require('path');

// Import local module
const route = require('./routes');

// Define app as express
const app = express();
// Define Port
const PORT = 8080;

// Set view engine
app.set('view engine', 'ejs');

// set session information
app.use(session({
    secret: 'itsasecret',
    cookie: { maxAge : 60000 },
    resave: false,
    saveUninitialized: false
}));


// Define Mimdleware
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', route);

app.listen(PORT, 'localhost', () => {
    console.log(`Server sudah berjalan, silahkan buka http://localhost:${PORT}`);
});