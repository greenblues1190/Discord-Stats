const { User } = require("../../../models/User");

const execute = async (client, message, args) => {
    User.deleteMany({ guildId: message.channel.guild.id }, (err ,docs) => {
        if(err) {
            console.error(err);
            return;
        };
        console.log(`==> All data of ${message.channel.guild.name} is deleted!`);
        message.reply(`${message.channel.guild.name}의 모든 데이터가 삭제되었습니다.`)
    })
}

module.exports = {
    name: 'reset',
    alias: ['리셋'],
    description: '서버 통계 리셋',
    use: '!reset',
    auth: ['Mods', 'mod'],
    execute
}