const knex = require('knex')(require('../knexfile'));

exports.index = (_req, res) => {
    knex('warehouses')
    // .select('id', 'city', 'country')
    .then((data) => {
    res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Warehouses ${err}`));
};