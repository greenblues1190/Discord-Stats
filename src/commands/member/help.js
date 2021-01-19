const execute = async (client, message, args) => {
    message.reply(
        `\n` +
        `:mag_right: 사용법\n` +
        `\n` +
        `   "!명령어 인자1 인자2 ..."\n` +
        `\n` +
        `:bulb: 지원 명령어\n` +
        `\n` +
        `   일반 명령어\n` +
        `      ├ !help (!도움말 !명령어 !h !use) 도움말을 출력합니다.\n` +
        `      ├ !profile (!프로필) 자신의 프로필을 확인합니다.\n` +
        `      └ !award (!어워드) 기여도, 메시지, 멘션 1위를 확인합니다.\n` +
        `\n` +
        `   모드 지원 명령어 (Mods 혹은 mod 역할 필요)\n` +
        `      └ !reset (!리셋) 서버의 모든 데이터가 삭제됩니다.\n` +
        `\n` +
        `:notepad_spiral: 마지막 업데이트\n` +
        `\n` +
        `   2021.01.19`
    );
}

module.exports = {
    name: 'help',
    alias: ['h', 'use', '도움말', '명령어'],
    description: '봇 도움말',
    use: '!help',
    auth: null,
    execute
}