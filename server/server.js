// Bring in requirements
const express = require('express');
const bodyParser = require('body-parser');
// Gives path of current
const path = require('path');
const PORT = 3000;

const app = express();

// Parsing JSON req body from client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// sign-up user
app.post('/signup', (req, res) => {
  res.locals.request = req.body
  res.status(200).send('route to user page')
})

// login user
app.get('/login', (req, res) => {
  res.status(200).json('send user info as an object');
})
// MVP
// create walk route
  // req.body location of user and number of miles user wants to walk
  // fetch walk destination, an address from yelp api
  // res.body walk destination address, route, and distance

// Walk is Complete
  // req.body update user in db

// For serving client index.html
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
})


// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))