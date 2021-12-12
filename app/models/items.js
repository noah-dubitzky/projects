const sql = require("./db.js");

// constructor
const Items = function(category) {
  this.id = category.id
};

Items.findById = (storeId, category, result) => {
  sql.query(`select id, name, price, aisle_id, section_id, shelf_id from items, shelving where category = "${category}" AND storeId = ${storeId} AND shelving.item_id = items.id;`, (err, res) => {
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

module.exports = Items;


//select name, price from items where category = "${category}" AND storeId = ${storeId};