const { User } = require("../models/User");
const { XP_CHANNEL } = require("../config/config");

const count = (message) => {
    /* 
     * author를 찾아 없으면 생성, 있으면 message time 1 증가
     * work 게시판에 올리면 xp 1 증가
     */

    User.findOne({ id: message.author.id, guildId: message.channel.guild.id }, (err, user) => {
        let channelXP = 0;
        XP_CHANNEL.forEach(channel => {
            if (message.channel.id == channel.id) {
                channelXP = channel.xp;
            }
        })

        if (!user) {
            console.log("no user to update messaged!");
        } else {
            updateVariables = {
                messaged: user.messaged + 1,
                xp: user.xp + channelXP
            }
            User.findOneAndUpdate({ id: message.author.id, guildId: message.channel.guild.id }, updateVariables, (err, doc) => {
                if (err) console.error(`Failed to update user message time ${message.author.username}!`)
            });
        }
    })

    /* 
     * mention된 user가 있으면 해당 user를 찾아 없으면 생성, 있으면 mention time 1 증가
     */
    if (message.mentions.users.size) {
        message.mentions.users.map((mentionedUser, index) => {
            if (mentionedUser.bot) return;

            User.findOne({ id: mentionedUser.id, guildId: message.channel.guild.id }, (err, user) => {
                if (!user) {
                    console.log("no user to update mentioned!");
                } else {
                    User.findOneAndUpdate({ id: mentionedUser.id, guildId: message.channel.guild.id }, { mentioned: user.mentioned + 1 }, (err, doc) => {
                        if (err) console.error(`Failed to update user mentioned time ${message.author.username}!`)
                    });
                }
            })
        })
    }
}

module.exports = { count };