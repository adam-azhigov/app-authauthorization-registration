require("dotenv").config()
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router  = require('./routes/users.route')

mongoose.connect(
    'mongodb+srv://adam:04am09ad@cluster0.3hll9.mongodb.net/Future?retryWrites=true&w=majority')
    .then( () => console.log('монго бд подключен'))
    .catch( (err) => console.log('ошибка:', err))

const app = express();


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router) ;


app.listen(4000, (err) => {
    if (err){
        console.log(err)
    } else {
        console.log('сервер запущен')
    }
})
