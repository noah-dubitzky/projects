const Items = require("../models/items.js");

exports.findOne = (req, res) => {
  Items.findById(req.params.storeId, req.params.category, (err, data) => {
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
