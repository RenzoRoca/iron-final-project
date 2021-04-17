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
        type: Schema.Types.ObjectId,
        ref: User,
        default: null
    },
    open: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: function() {
            return `https://i.pravatar.cc/150?u=${this.id}`
        }
    },
    applied: {
        type: [{
            type: String,
            ref: 'User',
            unique: true
        }]
    },
    results: {
        type: [{
            type: String,
            ref: 'Result'
        }]
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
