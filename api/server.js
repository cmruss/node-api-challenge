const express = require('express');
const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<p>you have successfully connected to the server<p>`)
});

const logger = (req, res, next) => {
    console.log(`${req.method} request to ${req.originalUrl} @ ${Date.now()}`);
    next();
};

server.use(logger);
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server;