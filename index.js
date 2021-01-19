/**********************************************
 *                Discord Stats               *
 *                Jeongmin Woo                *
 *                 2021.01.18                 *
 **********************************************/



const { MONGO_URI, BOT_TOKEN } = require('./config/key');
const { COMMAND_PREFIX, BOT_CHANNEL } = require('./config/config');
const { saveUser } = require('./src/saveUser');
const { count } = require('./src/count');
const { timestampConvert } = require('./src/util');
const { getUserRole } = require('./src/user');
const { User } = require('./models/User');

/* 
 * MongoDB 연결
 */
const mongoose = require("mongoose");
const connect = mongoose.connect(MONGO_URI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log("==> MongoDB Connected..."))
  .catch(err => console.error(err));

/* 
 * Discord 연결
 */
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
  console.log("==> Client is ready...");
});

/* 
 * command 세팅
 */
client.commands = new Discord.Collection() // commands를 discord.collection을 사용하였습니다.
client.alias = new Discord.Collection()// aliases를 discord.collection을 사용하였습니다.

const fs = require('fs');
console.log("==> Loading commands...");
fs.readdirSync("./src/commands/").forEach(dir => { // fs 모듈을 이용하여 ./Commands/ 폴더 안에 내용을 불러와 forEach를 합니다 이후에 선언되는 것은 dir로 합시다.
  if (dir != '.DS_Store') {
    const Filter = fs.readdirSync(`./src/commands/${dir}`).filter(f => f.endsWith(".js")); // Fillter를 선언하여 Commands/여러 폴더들을 안에 .js로 끝나는 것들로 필터링 합시다.
    Filter.forEach(file => {  // 안에 .js 파일들을 forEach하여 이후에 선언되는 것은 file로 합시다
      const command = require(`./src/commands/${dir}/${file}`); // cmd를 선언하여 ./Commands/${dir}/${file}가 필요하다고 합시다
      client.commands.set(command.name, command) // 우리가 콜랙션으로 지정한 것들을 지정해줍시다 (안에 괄호는 그 안에 있는 config에 name을 지정하고 명령어에 이름을 저장합니다.)
      command.alias.forEach(alias => {
        client.alias.set(alias, command.name)
      })
      console.log(` /src/commands/${dir}/${file}`);
    })
  }
})
console.log("==> Commands loaded...")










/********************************************
 *              command handler             *
 ********************************************/

/* 
 * 커맨드 실행 권한이 있으면 true 아니면 false
 */
function isAuth(command, message) {
  let flag = false;
  const userRole = getUserRole(message);
  // console.log(command.auth);
  if (command.auth == null) {
    return true;
  }
  command.auth.some(auth => {
    userRole.some(role => {
      if (auth === role.name) {
        flag = true;
        return true;
      }
    })
  })

  return flag;
}

/* 
 * 명령어 실행 함수
 */
function runCommand(command, message, args) {
  if (client.commands.get(command) || client.alias.get(command)) {
    const cmd = client.commands.get(command) || client.commands.get(client.alias.get(command))
    if (cmd && isAuth(cmd, message)) cmd.execute(client, message, args);
    else message.reply(`잘못된 커맨드 혹은 권한이 없습니다. (${cmd.name}의 권한: ${cmd.auth})`);
    return;
  }
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
 * message 수신 시 처리하는 부분
 */
client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  console.log(`${message.channel.guild.name}(${message.channel.guild.id})>>${message.channel.parentID}>>${message.channel.name}(${message.channel.id})`);
  console.log(`@${timestampConvert(message.createdTimestamp)}, [${message.channel.guild.name}] > [${message.channel.name}] ${message.author.username}: "${message.content}"`);

  /*  
   * 유저 정보가 없으면 저장
   */
  await User.findOne({ id: message.author.id, guildId: message.channel.guild.id }, (err, user) => {
    if (!user) {
      const newUser = new User({
        id: message.author.id,
        username: message.author.username,
        guildId: message.channel.guild.id,
        guildName: message.channel.guild.name,
        mentioned: 0,
        messaged: 0,
        xp: 0,
        level: 0
      });
      newUser.save((err, doc) => {
        if (err) console.log(`Failed to save user ${message.author.username}!`)
        console.log(`new user ${message.author.username} saved`);
      });
    }
  })

  /*
   * 명령어 prefix로 시작하지 않으면 count() 후 리턴
   */
  if (!message.content.startsWith(COMMAND_PREFIX)) {
    count(message);
    return;
  }



  /* 
   * bot channel일 경우 command 처리
   */
  if (!isBotChannel) return;
  
  const commandBody = message.content.slice(COMMAND_PREFIX.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  runCommand(command, message, args);
});

/* 
 * discord에 bot 로그인
 */
client.login(BOT_TOKEN);