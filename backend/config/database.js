const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL)
    .then((data) => {
      console.log(`Connected to MongoDB successfully: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error(`Error connecting to MongoDB: ${error.message}`);
      process.exit(1); // Exit process with failure
    });
};

module.exports = connectDatabase;
