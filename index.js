import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/errormiddleware.js";
import dataroutes from "./routes/dataroutes.js";
const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express()
app.use(cors());
  app.use(express.json());
 
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
  app.use("/api/v1", dataroutes);
  if (process.env.NODE_ENV === "development"){
    app.get("/", (req, res) => {
      res.send("API is running ....");
    });
  }

  app.use(notFound);
 app.use(errorHandler);
app.listen(PORT, ()=> console.log(`App listening on port ${PORT}!`))