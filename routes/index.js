const express = require('express');
const routes = express.Router();
const { landingPage } = require('../controllers/home_Controller');
const { uploadPage, uploadFile, remove } = require('../controllers/upload_Controller');
const { detailPage, filter } = require('../controllers/read_Controller');
const multer = require('multer')


//Setting up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

//Defining routes and their corresponding controller functions
routes.get('/', landingPage);

routes.get('/upload', uploadPage);

routes.post('/upload', upload.single('file'), uploadFile);

routes.get('/detail/:file', detailPage);

routes.get('/delete/:file', remove);

routes.post('/filter/:file', filter)

//Finally exporting routes
module.exports = routes;