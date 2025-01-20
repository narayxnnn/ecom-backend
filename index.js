import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRouter from "./routes/productRoutes.js";
import router from "./routes/index.js";
dotenv.config();

const app = express();

app.use(cors());
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log("db connection successful");
});

app.use(express.json());
app.use("/api/v1", router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  const massage = `server running on port ${PORT}`;
  console.log(massage);
});
