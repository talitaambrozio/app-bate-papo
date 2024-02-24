var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
require('dotenv').config();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

var dbUrl = process.env.DB_URL;
var apiKey = process.env.API_KEY;
var url = process.env.URL;

app.get('/', (req, res) => {
  res.render('index', { apiKey: apiKey });
});

var Message = mongoose.model('Message', {
  name: String,
  message: String,
  dateTime: { type: Date, default: Date.now },
  gifUrl: String

}); 


app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({});
    res.send(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 'messages': err.message });
  }

});


app.post('/messages', async (req, res) => {
  var message = new Message(req.body);
  try {
    message.dateTime = new Date();

    const newMessage = await message.save();
    io.emit('message', newMessage);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 'messages': err.message });
  }
})

io.on('connection', () => {
  console.log('a user is connected')
})

function connectDatabase() {
  mongoose.connect(dbUrl).then(() => console.log('MongoDB Atlas connected.'))
    .catch((error) => console.log(error));

}
connectDatabase();

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});