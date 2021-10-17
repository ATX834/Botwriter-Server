import { mongoose } from "@typegoose/typegoose";
import express from "express";
import cors from "cors";
import UserRouter from "./routes/User";
import config, { app } from "./config/config";

mongoose.connect(config.mongo_url).then(() => console.log("Connect to db"));

app.use(cors);
app.use(express.json());
app.use("api/user/", UserRouter);

app.listen(config.port, () =>
  console.log(`Server is running on ${config.port}`)
);