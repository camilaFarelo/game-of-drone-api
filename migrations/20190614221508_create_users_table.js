
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.string('total_win');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
