module.exports = app => {
  const stores = require("../controllers/store_controller.js");

  // Create a new store
  app.post("/stores", stores.create);

  // Retrieve all stores
  app.get("/stores", stores.findAll);
  
   // Retrieve all stores
  app.get("/aisle/:storeId", stores.findAisleNum);
  
   // Retrieve all stores
  app.get("/secs/:storeId", stores.findSecNum);

  // Retrieve a single store with store Id
  app.get("/stores/:storeId", stores.findOne);
  
  // Retrieve a single store with store Id
  app.get("/cats/:storeId", stores.findCats);

  // get a list
  app.get("/list/:storeId/:userId", stores.findList);
  
  // Update a store with customerId
  app.put("/stores/:customerId", stores.update);

  // Delete a store with store Id
  app.delete("/stores/:storeId", stores.delete);

  // Create a new store
  app.delete("/stores", stores.deleteAll);
};