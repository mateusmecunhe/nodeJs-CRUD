const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const postsRoute = require('./routes/posts')
require('dotenv/config');

app.use(bodyParser.json());
//middlewares
app.use('/posts', postsRoute);
app.use(cors());

//routes
app.get('/', (req, res) => {
    res.send('we are home')
});

//connect to DB


mongoose.connect(process.env.DB_CONNECTION, 
{ useNewUrlParser: true },
() => console.log('connected to database!')
);

//listening
app.listen(3000);
