const db = require('../data/db-config');

module.exports = {
  getProjects,
  createProject,
  getProjectById,
  getTasks,
  createTask,
  getResources,
  createResource,
};

// working
function getProjects() {
  return db('projects');
}

// working
function getProjectById(id) {
  return db('projects').where({ id });
}

// working
function createProject(project) {
  return db('projects').insert(project);
}

function getTasks(id) {
  return db('tasks')
    .select(
      'tasks.id',
      'tasks.description as task_description',
      'tasks.notes as task_notes',
      'tasks.completed',
      'projects.project_name',
      'projects.description as project_description'
    )
    .join('projects', 'tasks.project_id', '=', 'projects.id')
    .where({ project_id: id });
}

// working
function createTask(task) {
  return db('tasks').insert(task);
}

// working
function getResources(id) {
  return db('resources').where({ project_id: id });
}

// working
function createResource(resource) {
  return db('resources').insert(resource);
}
