const express = require('express');
const portfolioRouter = express.Router();


portfolioRouter.get('/projects', (req, res) => {res.sendFile(__dirname + '/portfolio/index.html');});
// portfolioRouter.get('/projects/drone')
// portfolioRouter.get('/projects/transmitter')
// portfolioRouter.get('/projects/current')
// portfolioRouter.get('/about/me')
// portfolioRouter.get('/contact')
// portfolioRouter.get('/home')

module.exports = portfolioRouter