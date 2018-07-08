const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRoutes = require('./api/router/admins');
const itemRoutes = require('./api/router/items');
const employeeRoutes = require('./api/router/employees');
const zoneRoutes = require('./api/router/zones')
//mongoose.connect('mongodb+srv://woodberry-project:woodberry-project@woodeberry-project-nesxf.mongodb.net/test?retryWrites=true')

mongoose.connect('mongodb://woodberry-project:woodberry-project@woodeberry-project-shard-00-00-nesxf.mongodb.net:27017,woodeberry-project-shard-00-01-nesxf.mongodb.net:27017,woodeberry-project-shard-00-02-nesxf.mongodb.net:27017/test?replicaSet=woodeberry-project-shard-0&ssl=true&authSource=admin')
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({
    extended: false}))
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods','PUT, PATCH, POST, DELETE, GET');
    return res.status(200).json({});
}
next();
})

app.use('/admin', adminRoutes);
app.use('/employee', employeeRoutes);
app.use('/item', itemRoutes);
app.use('/zone', zoneRoutes);
app.use((req, res,next) => {
    const error = new Error('Not Found');
error.status = 404;
next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
res.json({
    error: {
        message: error.message
    }
})
});


module.exports = app;