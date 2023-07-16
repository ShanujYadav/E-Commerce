import express from 'express';
import router from './router/savingUser.js'
import productRouter from './router/Product.js'
import payRouter from './router/payments.js'
import mongoose from 'mongoose';
import cors from 'cors';
import cartRouter from './router/Cart.js';
const app = express()

app.use(cors())

app.use(express.json())

const MONGOURI='mongodb+srv://shanujyadav:9528492010@cluster0.jusvkv8.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(MONGOURI, { useNewUrlParser: true })
mongoose.connection.on('connected', () => {
    console.log('db Connected')
})
mongoose.connection.on('disconnected', () => {
    console.log('db not Connected')
})
mongoose.connection.on('error', () => {
    console.log(error.message())
})

app.use(router)
app.use(productRouter)
app.use(cartRouter)
app.use(payRouter)
const port=5000
app.listen(port,()=>console.log(`runnning at ${port}`))