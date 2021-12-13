const Category = require("../models/category.js");

exports.findOne = (req, res) => {
  Category.findById(req.params.storeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found categories with id ${req.params.storeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.storeId
        });
      }
    } else res.send(data);
  });
};

exports.getItems = (req, res) => {
  Category.findItems(req.params.category, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found items with id ${req.params.storeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.storeId
        });
      }
    } else res.send(data);
  });
};