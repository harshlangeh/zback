import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

// .use used for middleware and configuration 
app.use(cors({
    origin : process.env.CROS_ORIGIN , // url 
    credentials : true
}))


// some configurations required

// to accept JSON
app.use(express.json({limit: "16kb"})) // jason is allowed, only up to 16kb


// to accept data from URL of browser
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// to accept asserts like pdf, image, etc 
app.use(express.static("public")) // and save to public folder


// to perform CRUD operations on cookies in the browser
app.use(cookieParser())





export { app }