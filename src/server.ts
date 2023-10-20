import { Server } from "http";
import config from "./config/config";
import mongoose from "mongoose";
import app from "./app";

//handle uncaughtException error
process.on("uncaughtException", (error) => {
  console.log("uncaughtException");
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log("app is connected with database");
    });
    console.log(config.database_url);
  } catch (error) {
    console.log(error);
  }

  //handle unhandledRejection error
  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log("unhandledRejection");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();

process.on("SIGTERM", () => {
  console.log("sigterm recieved");
  if (server) {
    server.close();
  }
});
