exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('resources')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        { name: 'computer', description: 'use computer', project_id: 1 },
        {
          name: 'stack overflow',
          description: 'look up questions',
          project_id: 1,
        },
        { name: 'computer', description: 'use computer', project_id: 2 },
      ]);
    });
};
