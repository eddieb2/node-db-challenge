const express = require('express');
const server = express();

// Import Routes
const projectsRouter = require('../routes/projects');

// Use
server.use(express.json());

// Use Routes
server.use('/api/projects', projectsRouter);

// Test
server.get('/', (req, res) => {
  res.send(`<h1>SERVER IS WORKING</h1>`);
});

module.exports = server;
