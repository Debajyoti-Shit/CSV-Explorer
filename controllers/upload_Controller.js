const fs = require("fs");
const path = require("path");

// set the directory path where the uploaded files will be saved
const directoryPath = path.join(__dirname, "../uploads");

// render the upload page
module.exports.uploadPage = (req, res) => {
  // read all files from the uploads directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.error("Unable to scan directory: " + err);
    }
    // render the upload page with the list of files in the directory
    return res.render("upload", {
      file: files,
    });
  });
};

// handle file upload
module.exports.uploadFile = (req, res) => {
  // read all files from the uploads directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.error("Unable to scan directory: " + err);
    }
    // render the upload page with the list of files in the directory
    return res.render("upload", {
      file: files,
    });
  });
};

// delete a file from the uploads directory
module.exports.remove = (req, res) => {
  let file = req.params.file;
  const filePath = path.join(__dirname, "../uploads", file);
  fs.unlink(filePath, (err) => {
    if (err) {
      return console.log("Unable to delete file: " + err);
    }
    // redirect back to the page after file deletion
    return res.redirect("back");
  });
};
