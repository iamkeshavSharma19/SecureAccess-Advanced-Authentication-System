import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

const PORT = process.env.PORT || 19;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

connectDB()
  .then(() => {
    console.log("Database Connection established Successfully");
    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log(`App is successfully listening on the port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database cannot be established");
  });
