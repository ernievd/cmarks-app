const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var env = require('dotenv').config();
const passport = require('./routes/linkedin.router').passport;
const sessionConfig = require('./modules/session-middleware');

// Route includes
const linkedinRouter = require('./routes/linkedin.router').app;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration
app.use(sessionConfig);

app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/linked', linkedinRouter);

// Serve static files
app.use(express.static('server/public'));

const port = process.env.PORT;

/** Listen * */
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
