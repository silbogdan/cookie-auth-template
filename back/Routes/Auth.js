const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 12;

const User = require('../Collections/UserSchema');

// Login
router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = await User.findOne({username: username});
    if (foundUser) {
        if (bcrypt.compare(password, foundUser.password)) {
            const userSession = { id: foundUser._id, name: foundUser.username, email: foundUser.email };
            req.session.user = userSession;
            return res.status(200).send('Logged in');
        }
        return res.status(400).send('Wrong password');
    }

    return res.status(404).send('No user with that username');
});

// Register
router.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const email = req.body.email;

    const isFound = await User.findOne({ $or: [ {username: username}, {email: email} ] });
    if (!isFound) {
        const createdUser = new User({
            username: username,
            email: email,
            password: password
        });

        if (createdUser) {
            return res.status(201).send(await createdUser.save());
        }
    }

    return res.status(400).send();
})

// Logout
router.post('/logout', (req, res, next) => {
    req.session.destroy();
    res.status(200).send();
});

// Check login status
router.post('/isLogged', (req, res, next) => {
    if (req.session.user)
        return res.status(200).send();
    
    return res.status(400).send();
})

module.exports = router;