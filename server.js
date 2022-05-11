const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')
const cartRoutes = require('./routes/cart.routes')
const orderRoutes = require('./routes/order.routes')

require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

mongoose.connect(MONGO_URL, { useNewUrlParser : true }, () => {console.log('BD conn')})

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use('/uploads', express.static('./uploads/products'))

app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)

// const PORT = process.require.PORT || 5000


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})