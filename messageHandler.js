const { User } = require("./models/User");
const { COMMAND_PREFIX } = require('./config/config');

const listen = async (message) => {
    const userId = message.author.id;
    const userName = message.author.username;
    const serverId = message.channel.guild.id;
    const serverName = message.channel.guild.name;
    const content = message.content;
    const timestamp = new Date(message.createdTimestamp);
    const date = timestamp.getHours() + ":" + timestamp.getMinutes() + ", " + timestamp.toDateString();

    // console.log(`@${date}, (${serverName})${userName}: "${content}"`);
    
    /* 
     * author를 찾아 없으면 생성, 있으면 message time 1 증가
     */
    User.findOne({ id: userId, guildId: serverId }, (err, user) => {
        if (!user) {
            const newUser = new User({
                id: userId,
                username: userName,
                guildId: serverId,
                guildName: serverName,
                mentioned: 0,
                messaged: 1
            });
            newUser.save((err, doc) => {
                if (err) console.log(`Failed to save user ${userName}!`)
            });
        } else {
            User.findOneAndUpdate({ id: userId, guildId: serverId }, { messaged: user.messaged + 1 }, (err, doc) => {
                if (err) console.log(`Failed to update user message time ${userName}!`)
            });
        }
    })

    /* 
     * mention된 user가 있으면 해당 user를 찾아 없으면 생성, 있으면 mention time 1 증가
     */
    if (message.mentions.users.size) {
        message.mentions.users.map((mentionedUser, index) => {
            if (mentionedUser.bot) return;

            User.findOne({ id: mentionedUser.id, guildId: serverId }, (err, user) => {
                if (!user) {
                    const newUser = new User({
                        id: userId,
                        username: userName,
                        guildId: serverId,
                        guildName: serverName,
                        mentioned: 1,
                        messaged: 0
                    });
                    newUser.save((err, doc) => {
                        if (err) console.log(`Failed to save mentioned user ${userName}!`)
                    });
                } else {
                    User.findOneAndUpdate({ id: mentionedUser.id, guildId: serverId }, { mentioned: user.mentioned + 1 }, (err, doc) => {
                        if (err) console.log(`Failed to update user mentioned time ${userName}!`)
                    });
                }
            })
        })
    }

    if (!content.startsWith(COMMAND_PREFIX)) return;

    /* 
     * command 처리
     */
    const commandBody = content.slice(COMMAND_PREFIX.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    // console.log(`command:${command}`);

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }

    if (command === "help" || command === "h" || command === "use" || command === "도움") {
        message.reply("봇 도움말은 여기에 표시됩니다.");
    }

    if (command === "stat") {
        const mostMessegedUser = await User.findOne({ guildId: serverId })
            .sort('-messaged')
            .exec()
            .then((user) => {
                return user;
            })
            .catch((err) => {
                console.error(err);
            })

        const mostMentionedUser = await User.findOne({ guildId: serverId })
            .sort('-mentioned')
            .exec()
            .then((user) => {
                return user;
            })
            .catch((err) => {
                console.error(err);
            })

        message.reply(`가장 말이 많은 사람: ${mostMessegedUser.username}(${mostMessegedUser.messaged}회), 가장 많이 불린 사람: ${mostMentionedUser.username}(${mostMentionedUser.mentioned}회)`);
    }
}

module.exports = { listen };