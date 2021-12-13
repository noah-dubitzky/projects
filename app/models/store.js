const sql = require("./db.js");

// constructor
const Store = function(store) {
  this.name = store.name;
  this.address = store.address;
  this.town = store.town;
  this.state = store.state;
  this.zip = store.zip;
  this.manager = store.manager;
  this.phone = store.phone;
};

// constructor
const List = function(list) {
  this.storeId = list.storeId;
  this.userId = list.userId;
  this.itemId = list.itemId;
  this.date = list.date;
};

Store.create = (newStore, result) => {
  sql.query("INSERT INTO stores SET ?", newStore, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created store: ", { id: res.insertId, ...newStore });
    result(null, { id: res.insertId, ...newStore });
  });
};

Store.findById = (storeId, result) => {
  sql.query(`select * from stores where stores.id=${storeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found data: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Store.getAll = result => {
  sql.query("SELECT * FROM stores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Stores: ", res);
    result(null, res);
  });
};

Store.updateById = (id, store, result) => {
  sql.query(
    "UPDATE stores SET email = ?, name = ?, active = ? WHERE id = ?",
    [store.name, store.address, store.town, store.state, store.zip, store.manager, store.phone],
    (err, res) => {
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

      console.log("updated store: ", { id: id, ...store });
      result(null, { id: id, ...customer });
    }
  );
};

Store.remove = (id, result) => {
  sql.query("DELETE FROM stores WHERE id = ?", id, (err, res) => {
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

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Store.removeAll = result => {
  sql.query("DELETE FROM stores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

Store.findAisles = (storeId, result) => {
  sql.query(`select distinct shelving.aisle_id from items,shelving where items.id = shelving.item_id and items.storeId = ${storeId}`, (err, res) => {
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

Store.findSecs = (storeId, result) => {
  sql.query(`select distinct shelving.section_id from items,shelving where items.id = shelving.item_id and items.storeId = ${storeId}`, (err, res) => {
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

Store.getCats = ( storeId, result) => {
  sql.query(`SELECT distinct shelving.aisle_id, shelving.section_id, items.category FROM shelving, items where shelving.item_id = items.id and items.storeId=${storeId}`, (err, res) => {
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
Store.getList = ( storeId, userId, result) => {
  sql.query(`SELECT * from list where storeId = ${storeId} and userId = ${userId}`, (err, res) => {
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




module.exports = Store;




