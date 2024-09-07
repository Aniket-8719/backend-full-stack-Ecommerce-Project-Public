const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");


// // Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json({ limit: '50mb' })); 
app.use(cookieParser());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  safeFileNames: true, // ensures safe file names
  preserveExtension: true, // keeps file extension
}));

// Routes import
const apiKeyMiddleware = require('./middleware/apiKeyMiddleware');
const product = require("./routes/productRoute"); 
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use(`/api/v1`,apiKeyMiddleware, product);
app.use("/api/v1",apiKeyMiddleware, user);
app.use("/api/v1",apiKeyMiddleware, order);
app.use("/api/v1",apiKeyMiddleware, payment); 




//  use Middleware
app.use(errorMiddleware);
 

module.exports = app;