
const express = require('express')
const { errorHandler, notFound } = require('./handlers')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json({hello:'Hello World!'})
})

app.use(notFound)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})