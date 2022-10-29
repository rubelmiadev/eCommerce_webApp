const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/dataBase");

//Handling  Uncought  Exception Messages
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting sown the server due to uncought Exception`);

  process.exit(1);
});

//config

dotenv.config({ path: "backend/config/config.env" });

//Database import
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise rejection when

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shuting down the server due to Unhandled Promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
