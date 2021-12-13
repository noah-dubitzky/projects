module.exports = app => {
  const items = require("../controllers/items_controller.js");

  // Retrieve a single Customer with customerId
  app.get("/items/:storeId/:category", items.findOne);

};