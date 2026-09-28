import express from "express"
import "dotenv/config"
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'

const PORT = parseInt(process.env.PORT!)

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin: process.env.FRONTEND_URL!}))
app.use(clerkMiddleware())

//routes
app.get('/', (req, res)=>{
    return res.json({
        msg : "hello"
    })
})

//connect db


//app live
app.listen(PORT, ()=>console.log(`live on localhost:${PORT}`))