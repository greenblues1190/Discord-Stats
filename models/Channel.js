const mongoose = require('mongoose');
const channelSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: 1
    },
    name: {
        type: String
    },
    parentId: {
        type: Number
    }
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = { Channel };