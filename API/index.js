const express = require('express');
const app = express();

const mongoose = require('mongoose');

const userRoutes = require('./src/routes/src.routes.user');

const port = 3000;

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

app.use(express.json());
app.use('/handi/user', userRoutes);

app.listen(port, () => { console.log(`App listening to the port --> ${port}`) });