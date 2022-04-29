const express = require('express')
const app = express()
require('dotenv').config()

// const PORT = process.require.PORT || 5000
const PORT = 5000

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})