import express, { Express } from "express";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import config from "config";
// import dotenv from "dotenv";

import cors, { CorsOptions } from "cors";
import { errorHandler, notFoundMiddleware } from "middleware";
import { registerRoutesV1 } from "api";

// dotenv.config();
const corsOptions: CorsOptions = {
     credentials: true,
     origin: ["http://localhost:8081/", "http://localhost:8081", "http://localhost:3000/", "http://localhost:3000"],

     optionsSuccessStatus: 200,
};

class App {
     express: Express;

     constructor() {
          this.express = express();
          this.middleware();
          this.connectDb();
          this.routes();
          this.useErrorHandler();
          this.useNotFoundMiddleware();
     }

     // Configure Express middleware.
     private middleware(): void {
          this.express.use(bodyParser.json());
          this.express.use(bodyParser.urlencoded({ extended: true }));
          this.express.use(cookieParser());
          this.express.use(cors(corsOptions));
          this.express.use(morgan("dev"));
     }

     private useErrorHandler() {
          this.express.use(errorHandler);
     }

     private useNotFoundMiddleware() {
          this.express.use(notFoundMiddleware);
     }

     private routes(): void {
          registerRoutesV1(this.express);
     }

     private async connectDb() {
          await mongoose
               .connect(process.env.DB_PATH || config.get("DB_PATH"), {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    dbName: "website",
               })
               .then((res) => {
                    console.log("connected to database");
               });
          mongoose.connection.on("error", (err) => {
               console.log(`DB connection error: ${err.message}`);
          });
     }
}

const app = new App();
const server = app.express;

export default server;
