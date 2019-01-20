require('dotenv').config();
const express = require('express');
const session = require('./modules/session');
const bodyParser = require('body-parser');

const app = express();
app.set('trust proxy', true);

app.use(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authorization = require('./routes/authorization');
const booking = require('./routes/booking');
const application = require('./routes/application');

app.use(authorization);
app.use(booking);
app.use(application);

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log('Started on port', process.env.PORT);
});