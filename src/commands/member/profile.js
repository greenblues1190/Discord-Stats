const gm = require('gm');
const Discord = require('discord.js');
const { User } = require("../../../models/User");
const { levelEnum, XP_ALIAS } = require("../../../config/config");
const { timestampConvert } = require("../../util");
const { getUserRole } = require("../../user");

const profileForm = (profile) => {
    
    /* 
     * profile {
     *  username,
     *  xp,
     *  messaged,
     *  mentioned,
     *  role,
     *  roleColor,
     *  joinedTimestamp = timestampConvert(joinedTimestamp),
     *  description
     * }
     */

    let level;
    if (profile.xp > levelEnum.HIGH.xp) {
        level = levelEnum.HIGH.name;
    } else if (profile.xp > levelEnum.MID.xp) {
        level = levelEnum.MID.name;
    } else if (profile.xp > levelEnum.LOW.xp) {
        level = levelEnum.LOW.name;
    } else {
        level = "N/A"
    }

    let roletext = "";
    profile.role.forEach(role => {
        roletext += `"${role}"`;
        roletext += " ";
    })

    let form = `\n` + 
               `┌─${profile.username}의 프로필\n` +
               `│   가입 날짜: ${timestampConvert(profile.joinedTimestamp)}\n` +
               `│   ${XP_ALIAS}: ${profile.xp} (${level})\n` +
               `│   메시지 횟수: ${profile.messaged}회\n` +
               `│   멘션받은 횟수: ${profile.mentioned}회\n` +
               `│   역할: ${roletext ? roletext : "없음"}\n` +
               `│   설명: ${profile.description ? profile.description : "없음"}\n` +
               `└──`;
    
    return form;
}

const execute = async (client, message, args) => {
    const user = await User.findOne({ id: message.author.id, guildId: message.channel.guild.id })
        .exec()
        .then((user) => {
            if (!user) {
                message.reply("유저 정보가 없습니다.");
                return;
            }
            
            let userRole = getUserRole(message);
            const profile = profileForm({
                username: user.username,
                xp: user.xp,
                messaged: user.messaged,
                mentioned: user.mentioned,
                role: userRole,
                joinedTimestamp: message.member.joinedTimestamp,
                description: message.member.description
            });
            message.reply(profile);
            return user;
        })
        .catch((err) => {
            console.error(err);
        })
}

module.exports = {
    name: 'profile',
    alias: ['프로필'],
    description: '유저 프로필',
    use: '!profile',
    auth: null,
    execute
}