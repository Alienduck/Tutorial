import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import db from "./db/db.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // TODO: Change in prod
    credentials: true
}))

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

db();

app.use('/user', userRoute);