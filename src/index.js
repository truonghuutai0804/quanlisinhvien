const express = require('express')
const path = require('path')
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8443

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Route init
const route = require('./routes')
route(app)


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})