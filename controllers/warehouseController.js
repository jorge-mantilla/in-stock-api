const knex = require("knex")(require("../knexfile"));

exports.index = (_req, res) => {
  knex("warehouses")
    // .select('id', 'city', 'country')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Warehouses ${err}`));
};

exports.singleWarehouse = (req, res) => {
    knex('warehouses')
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
            res.status(400).send(`Error retrieving warehouse ${req.params.id} ${err}`)
  );
    }; 
//post
exports.addWarehouse = (req, res) => {
    // Validate the request body for required data
    if (!req.body.warehouse_name || !req.body.address || !req.body.city ||
        !req.body.country || !req.body.contact_name || !req.body.contact_position ||
        !req.body.contact_phone || !req.body.contact_email) {
        return res.status(400).send('Please make sure to provide name, manager, address, phone and email fields in a request');
    }

    knex('warehouses')
        .insert(req.body)
        .then((data) => {
            // For POST requests we need to respond with 201 and the location of the newly created record
            const newWarehouseURL = `/warehouses/${data[0]}`;
            res.status(201).location(newWarehouseURL).send(newWarehouseURL);
        })
        .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
};

exports.deleteWarehouse = (req, res) => {
    knex('warehouses')
        .delete()
        .where({ id: req.params.id })
        .then(() => {
            // For DELETE response we can use 204 status code
            res.status(204).send(`Warehouse with id: ${req.params.id} has been deleted`);
        })
        .catch((err) =>
            res.status(400).send(`Error deleting Warehouse ${req.params.id} ${err}`)
        )
};
//GET Inventories for a Given Warehouse

exports.warehouseInventories = (req, res) => {
    knex('inventories')
        .where({ warehouse_id: req.params.id })
        .select('id', 'item_name', 'category', 'status', 'quantity')
        .then((data) => {
            //this is a guard clause
            if (data.length === 0) {
                res.status(404).send('Error');
                return
            }
            res.status(200).json(data);
        })
        .catch((err) =>
            res
                .status(404)
                .send(
                    `Error retrieving inventories for Warehouse ${req.params.id} ${err}`
                )
  )};

exports.updateWarehouse = (req, res) => {
    const { email, phone } = req.body;

    if (!email || !email.includes("@")) {
    return res.status(400).send(`Invalid email: ${email}`);
}

    if (!phone || !/^\d{10,}$/.test(phone)) {
    return res.status(400).send(`Invalid phone number: ${phone}`);
}

    knex("warehouse")
    .update(req.body)
    .where({ id: req.params.id })
    .then(() => {
        res
        .status(200)
        .send(`Warehouse with id: ${req.params.id} has been updated`);
    })
    .catch((err) => {
        res.status(400).send(`Error updating Warehouse ${req.params.id} ${err}`);
    });
};