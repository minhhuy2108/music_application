const express = require('express')
const app = express()
const route = require('./routes/index')
require('dotenv').config()

const cors = require('cors')
app.use(cors({ origin: true }))
app.use(express.json())

const db = require('./config/db/index')
db.connect()


route(app)

app.listen(4000, () => console.log('Listening to port 4000'))