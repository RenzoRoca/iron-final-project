const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('./user.model');

const adSchema = new Schema({
    title: {
        type: String,
        required: 'A title is required',
        unique: true
    },
    description: String,
    author: {
        type: String,
        ref: User,
        default: null
    },
    open: {
        type: Boolean,
        default: true
    },
    applied: {
        type: Array,
        default: []
    }
});

adSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'ad.messages',
    justOne: false,
});

const Ad = mongoose.model('Ad', adSchema);
module.exports = Ad;
