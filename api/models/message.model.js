const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('user.model');

const messageSchema = new Schema({
    text: {
        type: String,
        required: 'A text is required',
        unique: true
    },
    description: String,
    author: {
        type: String,
        ref: 'User',
        default: null
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    mention: User,
    read: boolean

})

userSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'ad.messages',
    justOne: false,
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
