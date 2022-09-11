require("dotenv").config()
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router  = require('./routes/users.route')

mongoose.connect(
    process.env.MONGODB_URL)
    .then( () => console.log('монго бд подключен'))
    .catch( (err) => console.log('ошибка:', err))

const app = express();


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router) ;


app.listen(process.env.PORT || 4000, (err) => {
    if (err){
        console.log(err)
    } else {
        console.log('сервер запущен')
    }
})
