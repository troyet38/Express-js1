const express = require('express')
const app = express()
const port = 3006
const morgan = require('morgan')
const serveFavicon = require('serve-favicon')
const sequelize = require('./db/sequelize')
const coworkingsRouter = require('./routes/coworkingsRoute')
const UserRouter = require('./routes/userRoute')


sequelize.initDb();

app
  .use(morgan('dev'))
  .use(serveFavicon(__dirname + '/favicon.ico'))
  .use(express.json())

app.use ('/api/coworkings',coworkingsRouter) 
app.use ('/api/users',UserRouter) 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})