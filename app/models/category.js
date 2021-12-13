const sql = require("./db.js");

// constructor
const Category = function(category) {
  this.id = category.id
};

Category.findById = (storeId, result) => {
  sql.query(`SELECT distinct category from items where storeId = ${storeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found data: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Category;





