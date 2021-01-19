const gm = require('gm');
const Discord = require('discord.js');
const { User } = require("../../../models/User");
const { XP_ALIAS } = require("../../../config/config");

const execute = async (client, message, args) => {
    const mostMessagedUser = await User.findOne({ guildId: message.channel.guild.id })
        .sort('-messaged')
        .exec()
        .then((user) => {
            return user;
        })
        .catch((err) => {
            console.error(err);
        })

    const mostMentionedUser = await User.findOne({ guildId: message.channel.guild.id })
        .sort('-mentioned')
        .exec()
        .then((user) => {
            return user;
        })
        .catch((err) => {
            console.error(err);
        })

    const mostXPedUser = await User.findOne({ guildId: message.channel.guild.id })
        .sort('-xp')
        .exec()
        .then((user) => {
            
            return user;
        })
        .catch((err) => {
            console.error(err);
        })

    /* 
     * 이미지 생성 및 첨부
     */
    const text_eng = 
        `The Most Contributed!\n` +
        (mostXPedUser ? `${mostXPedUser.username} (${mostXPedUser.xp}points)\n` : "N/A\n") +
        `\n` +
        `The Most Messaged!\n` +
        (mostMessagedUser ? `${mostMessagedUser.username} (${mostMessagedUser.messaged}times)\n` : "N/A\n") +
        `\n` +
        `The Most Mentioned!\n` +
        (mostMentionedUser ? `${mostMentionedUser.username} (${mostMentionedUser.mentioned}times)` : "N/A");
    const text_kor =
        `${XP_ALIAS} 1위!\n` +
        (mostXPedUser ? `${mostXPedUser.username} (${mostXPedUser.xp}포인트)\n` : "N/A\n") +
        `\n` +
        `메세지 1위!\n` +
        (mostMessagedUser ? `${mostMessagedUser.username} (${mostMessagedUser.messaged}회)\n` : "N/A\n") +
        `\n` +
        `멘션 1위!\n` +
        (mostMentionedUser ? `${mostMentionedUser.username} (${mostMentionedUser.mentioned}회)` : "N/A");

    gm('./assets/images/award.png')
        .font('./assets/fonts/Noto_Sans_KR/NotoSansKR-Medium.otf', 33)
        .drawText(
            0,
            70,
            text_kor
            , 'Center')
        .encoding('Unicode')
        .toBuffer('JPG', (err, buffer) => {
            if (err) console.error(err);
            const attachment = new Discord.MessageAttachment(buffer, 'text-image.jpg');
            message.reply(
                `${message.channel.guild.name} 어워드`
                , attachment)
        })
}

module.exports = {
    name: 'award',
    alias: ['어워드'],
    description: '서버 어워드',
    use: '!stat',
    auth: null,
    execute
}