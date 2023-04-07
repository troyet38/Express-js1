const express = require('express')
const app = express()
const port = 3006
const morgan = require('morgan')
const serveFavicon = require('serve-favicon')
const coworkingsRouter = require('./routes/coworkingsRoute')
const sequelize = require('./db/sequelize')


sequelize.initDb();

app
  .use(morgan('dev'))
  .use(serveFavicon(__dirname + '/favicon.ico'))
  .use(express.json())

app.use ('/api/coworkings',coworkingsRouter) 



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})