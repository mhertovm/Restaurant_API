require('dotenv').config();
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const db = require('./models/index');
db.sequelize.authenticate()
    .then(()=> console.log('Connection has been established successfully.'))
    .catch((error)=> console.error('Unable to connect to the database:', error.message));
server.listen(port, ()=>{
    console.log(`app listening on port: ${port}`)
});