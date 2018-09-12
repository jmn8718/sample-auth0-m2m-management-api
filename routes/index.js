const express = require('express');
const router = express.Router();
const auth0 = require('../lib/auth0');

router.get('/', async function(req, res, next) {
  return res.json({
    name: process.env.AUTH0_NAME,
    port: process.env.PORT
  });
});

router.get('/users', async function(req, res, next) {
  const { query } = req;
  let data = await auth0.authorizedRequestToAuth0('/api/v2/users', 'GET', {
    qs: query
  });
  return res.json(data);
});

router.get('/logs', async function(req, res, next) {
  const { query } = req;
  let data = await auth0.authorizedRequestToAuth0('/api/v2/logs', 'GET', {
    qs: query
  });
  return res.json(data);
});

module.exports = router;
