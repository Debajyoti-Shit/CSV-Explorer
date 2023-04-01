const path = require("path");
 
module.exports.detailPage = async (req, res) => {
    let file = req.params.file;
    const csvFilePath = path.join(__dirname, `../uploads/${file}`);
    const csv = require('csvtojson')
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        return jsonObj;
    })
    const jsonArray= await csv().fromFile(csvFilePath);
    return res.render('details',{
        jsonData: jsonArray,
        file : file,
        sortOrder : 'sortAsc'
    });
}



module.exports.filter = async (req, res) => {
    let file = req.params.file;
    const csvFilePath = path.join(__dirname, `../uploads/${file}`);
    const csv = require('csvtojson')
    let sortOrder = req.body.filter;
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        return jsonObj;
    })
    const jsonArray= await csv().fromFile(csvFilePath);
    if (sortOrder === "sortAsc") {
        jsonArray.sort(function(a, b) {
        for (let key in a) {
          return a[key] - b[key];
        }
      });
    } else {
        jsonArray.sort(function(a, b) {
        for (let key in a) {
          return b[key] - a[key];
        }
      });
    }
    return res.render('details',{
        jsonData: jsonArray,
        file : file,
        sortOrder: sortOrder
    });
}