const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: 1
    },
    username: {
        type: String
    },
    guildId: {
        type: Number
    },
    guildName: {
        type: String
    },
    mentioned: {
        type: Number,
        default: 0
    },
    messaged: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0 
    }
})

const User = mongoose.model('User', userSchema);

module.exports = { User };