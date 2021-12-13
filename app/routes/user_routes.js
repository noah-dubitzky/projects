module.exports = app => {
  const users = require("../controllers/user_controller.js");

  // Create a new Customer
  app.post("/users", users.create);

  // Retrieve all Customers
  app.get("/users", users.findAll);

  // Retrieve a single Customer with customerId
  app.get("/users/:userId", users.findOne);

  // Retrieve a single Customer with customerId
  app.get("/users/:userEM/:userPW", users.findUser);

  // Update a Customer with customerId
  app.put("/users/:userId", users.update);

  // Delete a Customer with customerId
  app.delete("/users/:userId", users.delete);

  // Create a new Customer
  app.delete("/users", users.deleteAll);
};