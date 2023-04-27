const knex = require('knex')(require('../knexfile'));

exports.index = (_req, res) => {
    knex('inventories')
        .select('id', 'item_name', 'description')
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

//To delete an existing inventory using DELETE
exports.deleteInventory = (req, res) => {
    knex('inventories')
      .delete()
      .where({ id: req.params.id })
      .then(() => {
        // For DELETE response we can use 204 status code
        res.status(204).send(`Inventory with id: ${req.params.id} has been deleted`);
      })
      .catch((err) =>
        res.status(400).send(`Error deleting Inventory ${req.params.id} ${err}`)
      );
  };