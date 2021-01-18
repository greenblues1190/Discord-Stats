const execute = async (client, message, args) => {
    message.channel.send(args[0]);
}

module.exports = {
    name: 'echo',
    alias: ['e'],
    description: '에코 메세지',
    use: '!echo [text]',
    auth: ['Needle (니들)'],
    execute
}