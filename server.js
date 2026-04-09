
import express from "express";
import mongoose from "mongoose";
import requestLogger from "./middleware/requestLogger.js";
import { sanitizeMiddleware } from "./middleware/sanitizeMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

sanitizeMiddleware(app);
app.use(requestLogger);

mongoose.connect("mongodb://127.0.0.1:27017/middlewareDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/api/users",userRoutes);

app.get("/",(req,res)=>{
    res.send("Middleware Project Running");
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});
