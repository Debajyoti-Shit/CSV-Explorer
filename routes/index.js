const express = require('express');
const routes = express.Router();
const { landingPage } = require('../controllers/home_Controller');
const { uploadPage, uploadFile, remove } = require('../controllers/upload_Controller');
const { detailPage, filter } = require('../controllers/read_Controller');
const multer  = require('multer')
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
  

routes.get('/', landingPage);

routes.get('/upload', uploadPage);

routes.post('/upload', upload.single('file'), uploadFile);

routes.get('/detail/:file', detailPage);

routes.get('/delete/:file', remove);

routes.post('/filter/:file', filter)


module.exports = routes;