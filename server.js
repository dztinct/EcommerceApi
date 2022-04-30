const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.routes.js')
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL, { useNewUrlParser : true }, () => {console.log('BD conn')})

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use('/api/user', userRoutes)

// const PORT = process.require.PORT || 5000
const PORT = 5000

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})