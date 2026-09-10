import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
//?Logger => Logger gives us a detailed information about which and when request came to your server what was it's end point and what was the request method.We will basically install the morgan logger.

const app = express();

app.use(express.json());
app.use(morgan("dev"));
