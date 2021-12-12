const sql = require("./db.js");

// constructor
const List = function(list) {
  this.storeId = list.storeId;
  this.userId = list.userId;
  this.itemId = list.itemId;
  this.entryDate = list.entryDate;
};

//return the list of items 
List.createList = (newList, result) => {
  sql.query("INSERT INTO list SET ?", newList, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created list: ", { id: res.insertId, ...newList });
    result(null, { id: res.insertId, ...newList });
  });
};

//`SELECT list.id, list.itemId, list.entryDate, items.name, items.price, shelving.aisle_id, shelving.section_id from list, items, shelving where list.storeId = ${storeId} and list.userId = ${userId} and items.id = list.itemId and shelving.item_id = items.id`
//return the list of items 
List.getListAsc = ( storeId, userId, result) => {
  sql.query(`SELECT list.id, list.itemId, list.entryDate, items.name, items.price, shelving.aisle_id, shelving.section_id from list, items, shelving where list.storeId = ${storeId} and list.userId = ${userId} and items.id = list.itemId and shelving.item_id = items.id ORDER BY shelving.aisle_id, shelving.section_id`, (err, res) => {
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

List.getListDec = ( storeId, userId, result) => {
  sql.query(`SELECT list.id, list.itemId, list.entryDate, items.name, items.price, shelving.aisle_id, shelving.section_id from list, items, shelving where list.storeId = ${storeId} and list.userId = ${userId} and items.id = list.itemId and shelving.item_id = items.id`, (err, res) => {
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

//return the list of items 
List.deleteItem = ( storeId, userId, itemId, result) => {
  sql.query(`Delete from 'list' where list.storeId = ${storeId} and list.userId = ${userId} and item_id = ${itemId}`, (err, res) => {
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

List.remove = (id, result) => {
  sql.query("DELETE FROM list WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};


module.exports = List;