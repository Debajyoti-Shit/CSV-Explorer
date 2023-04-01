// Import required packages and modules
const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
// Middleware for handling file uploads
const multer = require("multer");
// Middleware for enabling Cross-Origin Resource Sharing (CORS)
const cors = require("cors");

// Enable CORS for all routes
app.use(cors());

// Set up the view engine and views directory
app.set("view engine", "ejs");
app.set("views", "./views");

// Parse urlencoded data and add it to req.body
app.use(express.urlencoded({ extended: true }));

// Serve static files like CSS from the 'asset' directory
app.use(express.static(path.join(__dirname, "asset")));

// Enable layouts middleware
app.use(expressLayouts);

// Extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Define the app's routes using the routes.js file
app.use("/", require("./routes"));

// Start the server and log a message to the console
app.listen(port, (error) => {
  if (error) {
    console.log("error in listning " + error);
  }
  console.log("Server is up and listening on port", port);
});
