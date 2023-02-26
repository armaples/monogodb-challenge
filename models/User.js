const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            requierd: true,
            max_length: 30
        },
        email: {
            type: String,
            unique: true,
            required: true,
            //needs to match a valid email address
        },
        thoughts: [thoughtSchema],
        friends: [userSchema]
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

const User = model('user', userSchema);

module.exports = User;