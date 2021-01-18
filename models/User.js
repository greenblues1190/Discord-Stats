const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {
        type: Number
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
        type: Number
    },
    messaged: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema);

module.exports = { User };