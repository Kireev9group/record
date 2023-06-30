const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "access.log"),
  { flags: "a" }
);

module.exports = function (req, res, next) {
  res.on("finish", () => {
    const statusCode = res.statusCode;
    const logMessage = `${req.method} ${req.originalUrl} ${statusCode} ${res.statusMessage};\n`;
    accessLogStream.write(logMessage);
  });
  next();
};
