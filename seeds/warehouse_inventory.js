const inventoryData = require('../seed_data/inventory');
const warehouseData = require('../seed_data/warehouse');
const knex = require('knex')(require('../knexfile'));

exports.seed = function (knex) {
  return knex('warehouses')
    .del()
    .then(function () {
      return knex('warehouses').insert(warehouseData);
    })
    .then(() => {
      return knex('inventory').del();
    })
    .then(() => {
      return knex('inventory').insert(inventoryData);
    });
};