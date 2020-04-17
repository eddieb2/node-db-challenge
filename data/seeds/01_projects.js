exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          project_name: 'portfolio',
          description: 'build website',
          completed: false,
        },
        {
          project_name: 'mini-project',
          description: 'build calc',
          completed: false,
        },
      ]);
    });
};

// return knex('projects).truncate()
// .then(- =>  return { knex('projects').insert({seeddata}))
