const { User } = require("../../../models/User");

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

    message.reply(
        `메세지 횟수 1위 ${mostMessagedUser.username}(${mostMessagedUser.messaged}회)\n` +
        `멘션받은 횟수 1위 ${mostMentionedUser.username}(${mostMentionedUser.mentioned}회)\n` +
        `기여도 1위 ${mostXPedUser.username}(${mostXPedUser.xp})`
    );
}

module.exports = {
    name: 'stat',
    alias: ['통계'],
    description: '서버 통계',
    use: '!stat',
    auth: ['Needle (니들)'],
    execute
}