const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('./user.model');
const Ad = require('./ad.model');

const resultSchema = new Schema({
    ad: {
        type: Schema.Types.ObjectId,
        ref: Ad,
        default: null
    },
    contentCreator: {
        type: Schema.Types.ObjectId,
        ref: User,
        default: null
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: User,
        default: null
    },
    earnings: Number,
    dateEvent: {
        type: Date,
        default: Date.now
    }
})

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
