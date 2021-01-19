const mongoose = require('mongoose');
const serverSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: 1
    },
    name: {
        type: String
    }
});

const Server = mongoose.model('Server', serverSchema);

module.exports = { Server };