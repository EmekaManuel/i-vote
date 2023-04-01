require('dotenv').config( )
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// external functions
const { errorHandler, notFound } = require('./handlers')
// database
const database = require('./models')


//main application

const app = express()
const port = process.env.PORT


app.get('/', (req, res) => {
  res.json({hello:'Hello World!'})
})

app.use(notFound)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})