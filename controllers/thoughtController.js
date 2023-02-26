const { Thought, User, Reaction } = require('../models');

module.exports = {
    // getThoughts 
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // getSingleThought by _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params._id })
            .then((thought) => 
                !thought 
                ? res.status(404).json({ message: `No thought with that id.` })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // createThought and send _id to user's thoughts array field
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                ? res.status(404).json({
                    message: `No user with that ID was found.`
                })
                : res.json(`Thought posted!`))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // updateThought by _id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params._id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: `No thought with this ID was found.` })
            : res.json(thought))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // deleteThought by _id
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params._id })
        .then((thought) => 
            !thought
            ? res.status(404).json({ message: `No thought with this ID was found.` })
            : User.findOneAndUpdate(
                { thoughts: req.params._id },
                { $pull: { applications: req.params._id } },
                { new: true }
            ))
        .then((user) =>
        !user
            ? res.status(404).json({
                message: `No user found with this ID.`,
            })
            :res.json({ message: `Thought successfully deleted!` }))
            .catch((err) => res.status(500).json(err))
    },
    // createReaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params._id },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: `No thought with this ID was found`})
            : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // deleteReaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params._id },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: `No thought found with this ID.` })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    }
};