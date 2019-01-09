require('dotenv').config();
const express = require('express');
const Redis = require('ioredis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');

const app = express();
app.set('trust proxy', true);

const redis = new Redis(6379, process.env.REDIS_URL);

app.use(session({

  store: new RedisStore({ 
    host: process.env.REDIS_URL, port: 6379, 
    client: redis
  }),
  
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 48 // 2 days
  },
  
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false

}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authorization = require('./routes/authorization');
app.use(authorization);

app.get('/', function(req, res){
  res.json(req.isAuthenticated());
});

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log('Started on port 1.', "80");
});