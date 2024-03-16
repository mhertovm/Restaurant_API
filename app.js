const express = require('express');
const cors = require('cors');
const app = express();
const usersRoute = require('./api/routes/usersRoute');
const productsRoute = require('./api/routes/productsRoute');
const publicRoute = require('./api/routes/publicRoute');
app.use(cors());
app.use(express.json());
app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/public', publicRoute);
module.exports = app;