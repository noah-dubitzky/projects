const List = require("../models/list.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const list = new List({
    storeId: req.body.storeId,
	userId: req.body.userId,
	itemId: req.body.itemId,
	entryDate: req.body.entryDate,
  });

  // Save Customer in the database
  List.createList(list, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the store."
      });
    else res.send(data);
  });
};

exports.findList = (req, res) => {
  List.getListAsc(req.params.storeId, req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Store with id ${req.params.storeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  List.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};




