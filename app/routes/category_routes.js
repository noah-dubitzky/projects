module.exports = app => {
  const categories = require("../controllers/category_controller.js");

  // Retrieve a single Customer with customerId
  app.get("/categories/:storeId", categories.findOne);
  
  app.get("/categories/:category/:storeId", categories.getItems);

};