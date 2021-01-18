const { MONGO_URI, BOT_TOKEN } = require('./config/key');
const messageHandler = require('./messageHandler');

/* 
 * MongoDB 연결
 */
const mongoose = require("mongoose");
const connect = mongoose.connect(MONGO_URI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

/* 
 * Discord 연결
 */
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Client is ready...');
});

/* 
 * message 수신 시 처리하는 부분
 */
client.on("message", async (message) => {
  if (message.author.bot) return;
  messageHandler.listen(message);
});

/* 
 * discord에 bot 로그인
 */
client.login(BOT_TOKEN);