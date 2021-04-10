const mongoose = require('mongoose');
const totp = require("totp-generator");
const Schema = mongoose.Schema
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userName: {
        type: String,
        required: 'An user name is required',
        unique: true
    },
    email: {
        unique: true,
        type: String,
        required: 'A valid email is required',
        match: [EMAIL_PATTERN, 'the email is invalid']
    },
    totpSecret: {
        type: String,
        required: true,
        default: () =>
            (Math.random().toString(36).substr(2) +
            Math.random().toString(36).substr(2) +
            Math.random().toString(36).substr(2)).slice(0, 16)
    },
    password: {
        type: String,
        required: 'A valid password is required'
        //match: [PASSWORD_PATTERN, 'the password is invalid']
    },
    rol: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    type: {
        type: String,
        enum : ['creator','company'],
        default: 'creator',
        required: 'A valid user type is required (creator company)'
    },
    category: {
        type: String,
        required: 'A valid user category is required (creator company)'
    },
    followers: Number,
    profileImage: {
        type: String,
        default: function() {
            return `https://i.pravatar.cc/150?u=${this.id}`
        }
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.totpSecret;
            return ret
        }
    },
    toObject: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.totpSecret;
            return ret
        }
    }
})

userSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'user.messages',
    justOne: false,
});

userSchema.virtual('ads', {
    ref: 'Ad',
    localField: '_id',
    foreignField: 'user.ads',
    justOne: false,
});

userSchema.virtual('blacklist', {
    ref: 'User',
    localField: '_id',
    foreignField: 'user.blacklist',
    justOne: false,
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        next();
        });
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

userSchema.methods.getTOTPQR = function () {
  return `otpauth://totp/Iron%20Events:${this.email}?secret=${this.totpSecret}&issuer=Iron%20Events`
};

userSchema.methods.checkTOTP = function (code) {
  return totp(this.totpSecret)
};

const User = mongoose.model('User', userSchema);
module.exports = User;
