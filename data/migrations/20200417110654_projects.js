exports.up = function (knex) {
  return knex.schema
    .createTable('projects', (tbl) => {
      tbl.integer('id').primary();
      tbl.string('project_name', 255).notNullable();
      tbl.string('description', 255);
      tbl.boolean('completed').notNullable().defaultTo(false);
    })
    .createTable('tasks', (tbl) => {
      tbl.integer('id').primary();
      tbl.string('description').notNullable();
      tbl.string('notes', 255);
      tbl.boolean('completed').notNullable().defaultTo(false);
      tbl
        .integer('project_id')
        .notNullable()
        .references('id')
        .inTable('projects');
    })
    .createTable('resources', (tbl) => {
      tbl.integer('id').primary();
      tbl.string('name').notNullable();
      tbl.string('description');
      tbl
        .integer('project_id')
        .notNullable()
        .references('id')
        .inTable('projects');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('references')
    .dropTableIfExists('task')
    .dropTableIfExists('projects');
};
