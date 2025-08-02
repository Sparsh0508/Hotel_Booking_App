import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDb from "./configs/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from "./controllers/clerkWebHooks.js"

connectDb()


const app = express()
app.use(cors()) //Enable cors origin

//MiddleWare
app.use(express.json())
app.use(clerkMiddleware())

// Apilisten to clerk webHook

app.use("/api/clerk",clerkWebHooks)

app.get('/',(req,res) => res.send("API Is Working hello "))

const port = process.env.PORT || 3000;

app.listen(port,() => console.log(`Server is running on port ${port}`));
