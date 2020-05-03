const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const env = require('dotenv');
const bcrypt = require('bcryptjs');


const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
let app = express();
app.use(cors());
app.options('*', cors());

router.post('/register', async (req, res) => {


    //lets validate a data before we make a user
    const {error} = registerValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user is already in database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send(`Адрес ${req.body.email} уже зарегестрирован!`);

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    //lets validate a data before we make a user
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if ( !user) return res.status(400).send('Эл. почта или пароль неверные!');

    //PASSWORD is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if ( !validPass) return res.status(400).send('Эл. почта или пароль неверные!');

    // Create and assign a token
    const token = jwt.sign({
        email: user.email,
        name: user.name,
        userId: user._id
    }, 'secretkey', {expiresIn: '1h'});
    res.header('auth-token', token).send(token);
});


module.exports = router;