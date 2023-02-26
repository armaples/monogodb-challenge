const { User, Thought } = require('../models');

module.exports = {
    // getUsers
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // getSingleUser
    getSingleUser(req, res) {
        User.findOne({ _id: req.params._id })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `No user with that ID was found`})
                    : res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    // createUser
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // updateUser
    updateUser(req, res) {
        User.findOneAndUpdate( 
            { _id: req.params._id },
            { $set: req.body },
            { runValidators: true, new: true })
        .then((user) =>
            !user
                ? res.status(404).json({ message: `No user with that ID was found.`})
                : res.json(user))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    // deleteUser
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params._id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `No user with that ID was found.`})
                    : Thought.deleteMany({ _id: { $in: user.thoughts }})
                    )
                    .then(() => res.json({ message: `User and associated thoughts deleted.`}))
                    .catch((err) => res.status(500).json(err))
    },
    // addFriend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params._id },
            { $addToSet: { friends: req.body }},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: `No user found with this id!`})
                : res.json(user))
                .catch((err) => res.status(500).json(err))
    },
    // removeFriend
    removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params._id },
          { $pull: { friends: { _id: req.params._id } } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
}