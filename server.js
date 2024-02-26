var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
require('dotenv').config();
var ejs = require('ejs');
var fs = require('fs');


app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 


var dbUrl = process.env.DB_URL;
var apiKey = process.env.API_KEY;
var url = process.env.URL;
var bannedWordsFilePath = 'banned_words.txt';
var bannedWords = loadBannedWords(bannedWordsFilePath);

app.get('/', (req, res) => {
  res.render('index', { apiKey: apiKey, url: url });
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
  const message = new Message(req.body);
  try {
    message.dateTime = new Date();
  
    if(containsBadWords(message.message)){
      message.message = censorMessage(message.message);
    }
     const newMessage = await message.save();
    io.emit('message', newMessage);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 'messages': err.message });
  }
}); 


io.on('connection', () => {
  console.log('a user is connected');
});

function connectDatabase() {
  mongoose.connect(dbUrl).then(() => console.log('MongoDB Atlas connected.'))
    .catch((error) => console.log(error));
}

function containsBadWords(message) {
  const words = message.split(' ');
  for (let i = 0; i < words.length; i++) {
      if (bannedWords.includes(words[i])) {
          return true;
      }
  }
  return false;
}

function censorMessage(message){
  const words = message.split(' ');
  for(let i = 0; i < words.length; i++){
    if(bannedWords.includes(words[i])){
      words[i] = '*****';
    }
  }
  return words.join(' ');
}

function loadBannedWords(filePath) {
  try {
      const data = fs.readFileSync(filePath, 'utf8');
      const words = data.split('\n').map(word => word.trim());
      return words.filter(word => word !== ''); 
  } catch (err) {
      console.error('Error loading inappropriate words file:', err);
      return [];
  }
}

connectDatabase();

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
}); 