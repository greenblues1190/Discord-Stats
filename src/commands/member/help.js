const { CHANNEL_OPTION_PREFIX, BOT_OPTION, XP_OPTION } = require("../../../config/config");

const modManual =
    `모드 지원 명령어 (Mods 혹은 mod 역할 필요)\n` +
    `└ !reset (!리셋) 서버의 모든 데이터가 삭제됩니다.\n` +
    `\n` +
    `:gear: 채널 옵션 설정\n` +
    `\n` +
    `채널 이름을 마우스 오른쪽 클릭하고 채널 편집에 들어가서 채널 주제에 옵션을 작성하세요.\n` +
    `옵션은 스페이스바 혹은 줄바꿈으로 구분됩니다.\n` +
    `*예시) "봇 채널입니다! ${CHANNEL_OPTION_PREFIX}${BOT_OPTION} ${CHANNEL_OPTION_PREFIX}${XP_OPTION}=2"*\n` +
    `옵션 목록: ${CHANNEL_OPTION_PREFIX}${BOT_OPTION} --${XP_OPTION}=[획득기여도]\n` +
    `├ --bot : 이 옵션이 있는 채널에서만 봇이 응답합니다.\n` +
    `└ *(추가예정) --xp=[획득기여도] : 이 옵션이 있는 채널에서 메세지를 보내면 [획득기여도]만큼의 기여도를 획득합니다. (1 이상의 정수만 입력 가능)*\n` +
    `\n`

const execute = async (client, message, args) => {
    message.reply(
        `\n` +
        `:mag_right: 사용법\n` +
        `\n` +
        `"!명령어 인자1 인자2 ..."\n` +
        `\n` +
        `:bulb: 지원 명령어\n` +
        `\n` +
        `일반 명령어\n` +
        `├ !help (!도움말 !명령어 !h !use) 일반 도움말을 출력합니다.\n` +
        `├ !help mod (!도움말 mod !명령어 mod !h mod !use mod) 모드 지원 도움말을 출력합니다.\n` +
        `├ !profile (!프로필) 자신의 프로필을 확인합니다.\n` +
        `└ !award (!어워드) 기여도, 메시지, 멘션 1위를 확인합니다.\n` +
        `\n` +
        (args[0] === 'mod' ? modManual : "") +
        `:notepad_spiral: 마지막 업데이트\n` +
        `\n` +
        `2021.01.20 채널 옵션 기능 추가\n`
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