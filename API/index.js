const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./src/routes/src.routes.user');
const authFilter = require('./src/filters/src.filter.auth');

const port = 8000;

try {
    mongoose.connect('mongodb://ds229790.mlab.com:29790/handi_db', {
        auth: {
            user: 'richard_admin@uritsolutions',
            password: 'jesus7734'
        }
    }, (error) => {

        if (error) {
            console.log(error);
            console.log('=======================>>>>>> DB CONNECTION FAILED  <<<<<==========================');
            process.exit(1);
        }

        console.log('DB Connection success.');
    });
} catch (error) {
    console.log(error);
    console.log('=======================>>>>>> DB CONNECTION FAILED  <<<<<==========================');
    process.exit(1);
}

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    allowedHeaders: ['Content-Type', 'x-auth-token']
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/hanCo/user', userRoutes);
app.use(authFilter);

app.listen(port, () => { console.log(`App listening to the port --> ${port}`) });