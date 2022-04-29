const express = require('express')
const app = express()

const authUserController = require('./controllers/authUserController')
require('dotenv').config()

app.use('/api/auth', authUserController)

// const PORT = process.require.PORT || 5000
const PORT = 5000

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})