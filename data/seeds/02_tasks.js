exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          description: 'complete home page',
          notes: '50% complete',
          completed: false,
          project_id: 1,
        },
        {
          description: 'complete nav page',
          notes: 'completed yesterday',
          completed: true,
          project_id: 1,
        },
        {
          description: 'start wirefram',
          notes: 'did not start',
          completed: false,
          project_id: 2,
        },
      ]);
    });
};
