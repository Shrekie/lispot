const express = require('express');
const Redis = require('ioredis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');

const app = express();
app.set('trust proxy', true);

const redis = new Redis(6379);

app.use(session({

  store: new RedisStore({ 
    host: 'localhost', port: 6379, 
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

const router = express.Router();

router.get('/', (req, res) => {
  res.json( {index: "iamjsonlol"} );
});

app.use(router);

app.listen('80', '0.0.0.0', () => {
  console.log('Started on port 1.', "80");
});