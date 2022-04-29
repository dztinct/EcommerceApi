const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoute = require('./routes/users.routes')
const productRoute = require('./routes/product.routes')
const cartRoute = require('./routes/cart.routes')
const orderRoute = require('./routes/order.routes')
const categoryRoute = require('./routes/category.routes')

require('dotenv').config()

app.use(express.urlencoded({extended : true}))
app.use(express.json())

const mongo_url = process.env.MONGO_URL
mongoose.connect(mongo_url, {useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => {
        console.log('Database connected')
    }).catch((err) => {
        console.log(err)
    })



app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/categories', categoryRoute)



const PORT = process.config.PORT || 5000

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})