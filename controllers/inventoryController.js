const knex = require('knex')(require('../knexfile'));

exports.index = (_req, res) => {
    knex('inventories')
    .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
    .select(
      "inventories.id",
      "warehouses.warehouse_name",
      "inventories.item_name",
      "inventories.description",
      "inventories.category",
      "inventories.status",
      "inventories.quantity",
      "inventories.created_at",
      "inventories.updated_at"
    ) 
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).send(`Error retrieving Inventories ${err}`));
};

exports.singleInventory = (req, res) => {
    knex('inventories')
        .where({ id: req.params.id })
        .then((data) => {
            // If record is not found, respond with 404
            if (!data.length) {
                return res.status(404).send(`Record with id: ${req.params.id} is not found`);
            }

            // Knex returns an array of records, so we need to send response with a single object only
            res.status(200).json(data[0]);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving inventory ${req.params.id} ${err}`)
        );
};

exports.addInventory = (req, res) => {
    // Validate the request body for required data
    if (!req.body.id || !req.body.warehouse_name || !req.body.item_name || !req.body.description || !req.body.category || !req.body.status || !req.body.quantity) {
    //   return res.status(400).send('Please make sure to provide name, manager, address, phone and email fields in a request');
    }
    
  
    knex("inventories")
      .insert(req.body)
      .then((data) => {
        // For POST requests we need to respond with 201 and the location of the newly created record
        const newInventoryURL = `/inventories/${data[0]}`;
        res.status(201).location(newInventoryURL).send(newInventoryURL);
      })
      .catch((err) => res.status(400).send(`Error creating Inventory: ${err}`));
  };

 