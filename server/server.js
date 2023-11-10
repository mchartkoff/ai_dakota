const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {getText1} = require('./controller/controller.js')

app.get('/api/getText/:1', getText1) 