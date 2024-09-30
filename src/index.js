// require('dotenv').config()

import dotenv from 'dotenv'
import connectDB from '../db/index.js'
import { app } from './app.js'


dotenv.config({
    path: './env'
})

// As connectionDB is an async function, so it will return a promise; we will use .then() .catch() to handle the response 
connectDB() // mongoDB connected [server not started [not listen] yet]
.then(() => {
    // to start the server
    app.listen( process.env.PORT || 8000 , () => {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDB Connection Failed !!", err)
})
