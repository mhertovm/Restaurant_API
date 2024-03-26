const express = require('express');
const cors = require('cors');
const app = express();
const usersRoute = require('./api/routes/usersRoute');
const productsRoute = require('./api/routes/productsRoute');
const publicRoute = require('./api/routes/publicRoute');
const adminsRoute = require('./api/routes/adminsRoute');
const {authenticateTokenAdmin} = require('./api/middlewares/authenticateTokenAdmin');
const {authenticateTokenUser} = require('./api/middlewares/authenticateTokenUser');
app.use(cors());
app.use(express.json());
app.use('/public', express.static('./api/public'));
app.use('/users', authenticateTokenUser, usersRoute);
app.use('/admins', authenticateTokenAdmin, adminsRoute);
app.use('/products', productsRoute);
app.use('/public', publicRoute);
module.exports = app;