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
const vacanRoute = require('./routes/vacan');
const newsRoute = require('./routes/news');
const commentsRoute = require('./routes/comments');


dotenv.config();


//connect to BD
mongoose.connect('mongodb+srv://Misha:08i07i@auth-ovogf.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, () => console.log('Connected to DB!'));

//Middleware
app.use(express.json());



//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/user', profRoute);
app.use('/api/vacan', vacanRoute);
app.use('/api/news', newsRoute);
app.use('/api/user/comments',commentsRoute);




app.listen(3000, () => console.log('Server up and running'));

