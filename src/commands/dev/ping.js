const execute = async (client, message, args) => {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
}

module.exports = {
    name: 'ping',
    alias: ['vld', 'botping'],
    description: 'Ping!',
    use: '!ping',
    auth: ['Needle (니들)'],
    execute
}