import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import userRoutes from "./routes/user.route.js"
import equipmentRoutes from "./routes/equipment.route.js"
import requestRoutes from "./routes/request.route.js"
import infraRoutes from "./routes/infrastructure.routing.js"
import bookingRoutes from "./routes/booking.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"


dotenv.config();
const app = express();
const PORT = process.env.PORT
app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true,                 
    methods: ["GET", "POST", "PUT", "DELETE"],   
    allowedHeaders: ["Content-Type", "Authorization"]  
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api/user" , userRoutes);
app.use("/api/equipment" , equipmentRoutes);
app.use("/api/req",requestRoutes)
app.use("/api/infra" ,infraRoutes )
app.use("/api/booking" , bookingRoutes)


app.listen(PORT , ()=>{
    console.log("Server is running at",PORT);
    connectDB();
})