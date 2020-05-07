const express  = require('express');
const app = express();
const mongoose = require('mongoose');
//IMPORT ROUTES
const profRoute = require('./routes/profile');

//Connect to DB
mongoose.connect('mongodb+srv://Misha:08i07i@auth-ovogf.gcp.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true }, () => console.log('connected to bd!!'));

//Middleware
app.use(express.json());


//route middleware
app.use('/api/user', profRoute);

app.listen(3000, () => console.log('Server2 is up and running'));