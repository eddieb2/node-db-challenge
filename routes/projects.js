var express = require('express');
var router = express.Router();

const Projects = require('../model/projects-model');

// GET PROJECTS
router.get('/', (req, res) => {
  Projects.getProjects()
    .then((projects) => {
      res.status(200).json({ message: projects });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Projects.getProjectById(id)
    .then((project) => {
      res.status(200).json({ message: project });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// POST PROJECTS
router.post('/', (req, res) => {
  const name = req.body.project_name;

  Projects.createProject(req.body)
    .then((project) => {
      if (name === '' || name === undefined) {
        res.status(400).json({ error: 'Please enter a project name' });
      } else {
        res.status(201).json({ message: req.body });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Needs a project name property' });
    });
});

router.get('/:id/tasks', (req, res) => {
  const { id } = req.params;
  Projects.getTasks(id)
    .then((tasks) => {
      res.status(200).json({ message: tasks });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/:id/tasks', (req, res) => {
  const { id } = req.params;
  Projects.getProjectById(id)
    .then((project) => {
      if (project.length > 0) {
        Projects.createTask(req.body)
          .then((task) => {
            res.status(201).json({ message: req.body });
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      } else {
        res
          .status(404)
          .json({ mesage: 'Can not find project with that id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id/resources', (req, res) => {
  const { id } = req.params;
  Projects.getResources(id)
    .then((resources) => {
      res.status(200).json({ message: resources });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/:id/resources', (req, res) => {
  const { id } = req.params;
  const name = req.body.name;

  Projects.getProjectById(id)
    .then((project) => {
      if (project.length > 0) {
        Projects.createResource(req.body)
          .then((task) => {
            if (name === '' || name === undefined) {
              res
                .status(400)
                .json({ error: 'Please enter a resource name.' });
            } else {
              res.status(201).json({ message: req.body });
            }
          })
          .catch((err) => {
            res
              .status(500)
              .json({ error: 'Needs resource name property' });
          });
      } else {
        res
          .status(404)
          .json({ mesage: 'Can not find project with that id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id/all', (req, res) => {
  const { id } = req.params;

  Projects.getProjectById(id).then((project) => {
    Projects.getTasks(id).then((tasks) => {
      Projects.getResources(id).then((resources) => {
        project[0].tasks = tasks;
        project[0].resources = resources;
        res.status(200).json({ project });
        // OR THIS //
        // res
        //   .status(200)
        //   .json({ message: { ...project[0], tasks, resources } });
      });
    });
  });
});

module.exports = router;
