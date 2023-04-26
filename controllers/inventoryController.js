const knex = require('knex')(require('../knexfile'));

exports.index = (_req, res) => {
    knex('inventories')
        .select('id', 'item_name', 'description')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).send(`Error retrieving Inventories ${err}`));
};