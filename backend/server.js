const app = require("./app");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const connectDatabse = require("./config/database");


// Handling Uncought Exception ---> when you declare irrelevant console.log(youtube);
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught Exception `);
    process.exit(1);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

// database
connectDatabse();

const cors = require("cors");
app.use(cors({
  origin: "https://frontend-full-stack-ecommerce-project-78ul.vercel.app", // Fixed 'origin' typo
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
}); 

 
//  Unhandled Promise Rejection --> when you forget something like  "mongodb" =  mongod"
process.on("unhandledRejection", (err)=>{
    console.log(`Error  ${err.message}`);
    console.log(`shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
})
