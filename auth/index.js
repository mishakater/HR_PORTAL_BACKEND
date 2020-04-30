const cors = require('cors');
const express = require('express');
let app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');



//Import Routes
const authRoute = require('./routes/auth');

dotenv.config();


//connect to BD
mongoose.connect('mongodb+srv://Misha:08i07i@auth-ovogf.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, () => console.log('Connected to DB!'));

//Middleware
app.use(express.json());

app.use(cors());
app.options('*', cors());



//Route Middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server up and running'));

