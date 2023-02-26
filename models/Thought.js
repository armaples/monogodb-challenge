const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280
        },
        createdAt: {
            type: Date,
            //current timestamp and formats
        },
        username: {
            type: String,
            required: true,
            //need to ref user model
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;