const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const cors = require('cors');


app.use(cors());
app.options('*', cors());



//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const profRoute = require('./routes/profile');
const feedbackRoute = require('./routes/feedbacks');


dotenv.config();


//connect to BD
mongoose.connect('mongodb+srv://Misha:08i07i@auth-ovogf.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, () => console.log('Connected to DB!'));

//Middleware
app.use(express.json());



//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/user', profRoute);
app.use('/api/user', feedbackRoute);


app.listen(3000, () => console.log('Server up and running'));

