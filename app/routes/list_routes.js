module.exports = app => {
  const lists = require("../controllers/list_controller.js");

  // Create a new store
  app.post("/addList", lists.create);
  
  // Create a new store
  app.get("/findList/:storeId/:userId", lists.findList);

  // Delete a Customer with customerId
  app.delete("/delete/:id", lists.delete);
};