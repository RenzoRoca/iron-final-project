const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('./user.model');

const messageSchema = new Schema({
    text: {
        type: String,
        required: 'A text is required',
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    mention: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret
        }
    }
})

messageSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'ad.messages',
    justOne: false,
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
