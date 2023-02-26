const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router
    .route('/:_id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:_id/reactions').post(createReaction)

router.route('/:_id/reactions/:reactionId').delete(removeReaction);

module.exports = router;