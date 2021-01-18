const levelEnum = Object.freeze({
	LOW: {
		name: "low",
		xp: 0
	},
	MID: {
		name: "mid",
		xp: 10
	},
	HIGH: {
		name: "high",
		xp: 30
	}
});

module.exports = {
	COMMAND_PREFIX: "!",
	levelEnum,
	XP_ALIAS: "기여도",
	BOT_CHANNEL: [
		{
			id: 800768869005525034,
			name: "secret_dubu_level",
			server: "clab"
		}
	],
	XP_CHANNEL: [
		{
			id: 579373774919696404,
			name: "track_feedback",
			xp: 1,
			server: "clab"
		},
		{
			id: 584801679082258445,
			name: "your_mixset",
			xp: 2,
			server: "clab"
		},
		{
			id: 512638463888326667,
			name: "yours",
			xp: 2,
			server: "clab"
		}
	]
};
