import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db.mjs";
import taskRoutes from "./routes/tasks.mjs";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/tasks",taskRoutes);
app.use("/api/auth",authRoutes);


app.get("/", (req,res)=>{
    res.send("Backend is running!");
});

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});