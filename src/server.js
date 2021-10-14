const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('../config/config.json')
const session = require('express-session')
const passport = require('passport')
const jwt = require('express-jwt')
const blacklist = require('express-jwt-blacklist')
const winston = require('winston')
const { format } = winston
const { combine, label, json } = format

winston.loggers.add('development', {
  format: combine(
    label({ label: 'category one' }),
    json()
  ),
  transports: [
    new winston.transports.Console({ level: 'debud' }),
    new winston.transports.File({ filename: 'logger.log' })
  ]
});

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./passport')

require('../router/routes')(app)

app.listen(process.env.PORT || config.port,
    console.log(`Listening on http://localhost:${config.port}`)    
);