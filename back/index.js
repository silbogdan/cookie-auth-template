require('dotenv').config();

const express = require('express');
const sessions = require('express-session');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(sessions);


app.use(cors({
    origin : "http://localhost:3000",
    credentials: true,
  }))
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

const mongoDBStore = new MongoDBStore({
    uri: process.env.DB_CONN,
    collection: 'sessions',
    expires: process.env.COOKIE_AGE
});

app.use(sessions({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: Number(process.env.COOKIE_AGE) },
    resave: true,
    rolling: true,
    store: mongoDBStore
}));


app.get('/', async (req, res) => {
    const users = await User.find();
    return res.status(200).send(users);
});

app.use('/auth', Auth);



app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
})