const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema( {
    name: {
        type: String,
        required: true
    },
    NumOfMessages: {
        type: Number
    },
    description: {
        type: String
    }
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
