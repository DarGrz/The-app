import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import router from "./routes/auth.js";
dotenv.config();

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("port running");
  res.send("hello world");
});
app.use("/", router);

app.listen(process.env.PORT);
