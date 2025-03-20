import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import userRoutes from "./routes/user.route.js"
import equipmentRoutes from "./routes/equipment.route.js"
import requestRoutes from "./routes/request.route.js"

import cookieParser from "cookie-parser"

dotenv.config();
const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/user" , userRoutes);
app.use("/api/equipment" , equipmentRoutes);
app.use("/api/req",requestRoutes)


app.listen(PORT , ()=>{
    console.log("Server is running at",PORT);
    connectDB();
})