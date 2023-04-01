const path = require("path");

// Controller function for rendering the details page
module.exports.detailPage = async (req, res) => {
  // Get the name of the file to be displayed from the request parameters
  let file = req.params.file;

  // Construct the full path to the CSV file using the file name and the uploads directory
  const csvFilePath = path.join(__dirname, `../uploads/${file}`);

  // Import the 'csvtojson' package to convert the CSV file to a JSON object
  const csv = require("csvtojson");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      return jsonObj;
    });
  // The resulting JSON object is stored in the 'jsonArray' variable
  const jsonArray = await csv().fromFile(csvFilePath);
  return res.render("details", {
    jsonData: jsonArray,
    file: file,
    sortOrder: "sortAsc",
  });
};

// Controller function for filtering and sorting the data on the details page
module.exports.filter = async (req, res) => {
  let file = req.params.file;

  // Construct the full path to the CSV file using the file name and the uploads directory
  const csvFilePath = path.join(__dirname, `../uploads/${file}`);
  const csv = require("csvtojson");
  let sortOrder = req.body.filter;
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      return jsonObj;
    });
  // The resulting JSON object is stored in the 'jsonArray' variable
  const jsonArray = await csv().fromFile(csvFilePath);

  // Sort the JSON data based on the selected sort order
  if (sortOrder === "sortAsc") {
    jsonArray.sort(function (a, b) {
      for (let key in a) {
        return a[key] - b[key];
      }
    });
  } else {
    jsonArray.sort(function (a, b) {
      for (let key in a) {
        return b[key] - a[key];
      }
    });
  }
  return res.render("details", {
    jsonData: jsonArray,
    file: file,
    sortOrder: sortOrder,
  });
};
