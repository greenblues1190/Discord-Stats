const { MONGO_URI, BOT_TOKEN } = require('./config/key');
const { COMMAND_PREFIX, BOT_CHANNEL } = require('./config/config');
const { count } = require('./src/count');
const { timestampConvert } = require('./src/util');
const { getUserRole } = require('./src/user');

/* 
 * MongoDB 연결
 */
const mongoose = require("mongoose");
const connect = mongoose.connect(MONGO_URI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.error(err));

/* 
 * Discord 연결
 */
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
  console.log("Client is ready...");
});

/* 
 * command 세팅
 */
client.commands = new Discord.Collection() // commands를 discord.collection을 사용하였습니다.
client.alias = new Discord.Collection()// aliases를 discord.collection을 사용하였습니다.

const fs = require('fs');
fs.readdirSync("./src/commands/").forEach(dir => { // fs 모듈을 이용하여 ./Commands/ 폴더 안에 내용을 불러와 forEach를 합니다 이후에 선언되는 것은 dir로 합시다.
  const Filter = fs.readdirSync(`./src/commands/${dir}`).filter(f => f.endsWith(".js")); // Fillter를 선언하여 Commands/여러 폴더들을 안에 .js로 끝나는 것들로 필터링 합시다.
  Filter.forEach(file => {  // 안에 .js 파일들을 forEach하여 이후에 선언되는 것은 file로 합시다
    const command = require(`./src/commands/${dir}/${file}`); // cmd를 선언하여 ./Commands/${dir}/${file}가 필요하다고 합시다
    client.commands.set(command.name, command) // 우리가 콜랙션으로 지정한 것들을 지정해줍시다 (안에 괄호는 그 안에 있는 config에 name을 지정하고 명령어에 이름을 저장합니다.)
    command.alias.forEach(alias => {
      client.alias.set(alias, command.name)
    })
  })
})
console.log("Commands loaded...")

/* 
 * 커맨드 실행 권한이 있으면 true 아니면 false
 */
function isAuth(command, message) {
  let flag = false;
  const userRole = getUserRole(message);
  command.auth.some(auth => {
    if (auth === 'member') flag = true;
    userRole.some(role => {
      if (auth === role.name) flag = true;
    })
  })

  return flag;
}

/* 
 * bot이 메시지를 보낼 수 있는 채널이면 true 아니면 false
 */
function isBotChannel(message) {
  BOT_CHANNEL.some(channel => {
    if (message.channel.id != channel.id) return true;
  })
  return false;
}

/* 
 * 명령어 실행 함수
 */
function runCommand(command, message, args) {
  if (client.commands.get(command) || client.alias.get(command)) {
    const cmd = client.commands.get(command) || client.commands.get(client.alias.get(command))
    if (cmd && isAuth(cmd, message)) cmd.execute(client, message, args);
    else message.reply("잘못된 커맨드 혹은 권한이 없습니다.");
    return;
  }
}

/* 
 * message 수신 시 처리하는 부분
 */
client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  
  // console.log(`${message.channel.guild.name}(${message.channel.guild.id})>>${message.channel.parentID}>>${message.channel.name}(${message.channel.id})`);
  console.log(`@${timestampConvert(message.createdTimestamp)}, [${message.channel.guild.name}] > [${message.channel.name}] ${message.author.username}: "${message.content}"`);

  count(message);

  if (!message.content.startsWith(COMMAND_PREFIX)) return;

  if (!isBotChannel) return;
  /* 
   * command 처리
   */
  const commandBody = message.content.slice(COMMAND_PREFIX.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  runCommand(command, message, args);
});

/* 
 * discord에 bot 로그인
 */
client.login(BOT_TOKEN);
console.log("Client logged in...")