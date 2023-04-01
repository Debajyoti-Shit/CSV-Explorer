const fs = require("fs");
const path = require("path");
const directoryPath = path.join(__dirname, "../uploads");

module.exports.uploadPage = (req, res)=>{
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.error("Unable to scan directory: " + err);
        }   
        return res.render('upload', {
            file: files,
        })
    });
}

module.exports.uploadFile = (req, res)=>{
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.error("Unable to scan directory: " + err);
        }
        return res.render('upload', {
            file: files,
        })  
    });
}

module.exports.remove = (req, res) => {
    let file = req.params.file;
    const filePath = path.join(__dirname, "../uploads", file);
    fs.unlink(filePath, (err) => {
        if (err) {
            return console.log("Unable to delete file: " + err);
        }
        return res.redirect('back');
    });
}