require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');


app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());


const User = require('./Collections/UserSchema');
const Auth = require('./Routes/Auth');

mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongo');
});


app.get('/', async (req, res) => {
    const users = await User.find();
    return res.status(200).send(users);
});

app.use('/auth', Auth);



app.listen('8000', () => {
    console.log('Server started on port 8000');
})