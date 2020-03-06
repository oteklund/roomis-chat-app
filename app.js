const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const http = require('http');
const sa = require('./services/socketApi');
require('dotenv').config();
const path = require("path")

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

//public view
app.use(express.static(path.join(__dirname, "public")))

//routes
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('connection to database established'));

app.use(passport.initialize());
require('./passport')(passport);


const usersRoute = require('./routes/usersRoute');
const authRoute = require('./routes/authRoute');
const roomsRoute = require('./routes/roomsRoute');
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/rooms', roomsRoute);

const server = http.createServer(app);
sa.io.attach(server);
console.log('socket api attached to server');
server.listen(process.env.PORT || 4000, () => {
  console.log('server up and running');
});

module.exports = app;
