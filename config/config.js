const MY_SERVER = {
	id: 800462530803662859,
	name: "Jeongmin Woo님의 서버"
}

const HIDDEN_LIME = {
	id: 795172360210743337,
	name: "H!dden_L!me's Production House"
}
const CLAB = {
	id: 512263366975160330,
	name: "clab"
}

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
			name: "secret-dubu-level",
			server: CLAB
		},
		{
			id: 800814579427835974,
			name: "bot-playground",
			server: HIDDEN_LIME
		},
		{
			id: 800668079213903923,
			name: "bot",
			server: MY_SERVER
		}
	],
	XP_CHANNEL: [
		{
			id: 579373774919696404,
			name: "track-feedback",
			xp: 1,
			server: CLAB
		},
		{
			id: 584801679082258445,
			name: "your-mixset",
			xp: 2,
			server: CLAB
		},
		{
			id: 512638463888326667,
			name: "yours",
			xp: 2,
			server: CLAB
		},
		{
			id: 795172560282583041,
			name: "music-productions",
			xp: 1,
			server: HIDDEN_LIME
		},
		{
			id: 795189804533809172,
			name: "art-productions",
			xp: 1,
			server: HIDDEN_LIME
		},
		{
			id: 795172448441073664,
			name: "your-samples",
			xp: 1,
			server: HIDDEN_LIME
		},
		{
			id: 795178457565888522,
			name: "samples",
			xp: 1,
			server: HIDDEN_LIME
		},
		{
			id: 795178693898403893,
			name: "vst",
			xp: 1,
			server: HIDDEN_LIME
		}
	]
};
