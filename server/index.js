require(`dotenv`).config();

const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const path = require("path");

const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const logsHandler = require("./middleware/logsMiddleware");

const PORT = process.env.port || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

const morgan = require("morgan");
const fs = require("fs");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// Используем morgan для логирования запросов и ответов
app.use(morgan("combined", { stream: accessLogStream }));

app.use(logsHandler);

app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
