
const Store = require("../models/store.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const store = new Store({
    name: req.body.name,
	address: req.body.address,
	town: req.body.town,
	state: req.body.state,
	zip: req.body.zip,
	manager: req.body.manager,
	phone: req.body.phone
  });

  // Save Customer in the database
  Store.create(store, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the store."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Store.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving store."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Store.findById(req.params.storeId, (err, data) => {
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

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Store.updateById( req.params.storeId, new Store(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Store with id ${req.params.storeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Store with id " + req.params.storeId
          });
        }
      } else res.send(data);
    }
  );
};


exports.delete = (req, res) => {
  Store.remove(req.params.storeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Store with id ${req.params.storeId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Store with id " + req.params.storeId
        });
      }
    } else res.send({ message: `Store was deleted successfully!` });
  });
};


exports.deleteAll = (req, res) => {
  Store.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stores."
      });
    else res.send({ message: `All Stores were deleted successfully!` });
  });
};

exports.findAisleNum = (req, res) => {
  Store.findAisles(req.params.storeId, (err, data) => {
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

exports.findSecNum = (req, res) => {
  Store.findSecs(req.params.storeId, (err, data) => {
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

exports.findCats = (req, res) => {
  Store.getCats(req.params.storeId, (err, data) => {
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

exports.findList = (req, res) => {
  Store.getList(req.params.storeId, req.params.userId, (err, data) => {
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

exports.addItem = (req, res) => {
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
	date: req.body.date,
  });

  // Save Customer in the database
  Store.addList(list, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the store."
      });
    else res.send(data);
  });
};




