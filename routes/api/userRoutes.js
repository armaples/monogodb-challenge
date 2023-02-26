const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router
    .route('/:_id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:_id/friends').post(addFriend);

router.route('/:_id/friends/:_id').delete(removeFriend);

module.exports = router;