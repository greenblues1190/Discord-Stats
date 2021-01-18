const execute = async (client, message, args) => {
    message.reply("봇 도움말은 여기에 표시됩니다.");
}

module.exports = {
    name: 'help',
    alias: ['h', 'use', '도움', '명령어'],
    description: '봇 도움말',
    use: '!help',
    auth: ['Needle (니들)'],
    execute
}