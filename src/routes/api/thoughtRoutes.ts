import { Router } from 'express';
const router = Router();
import { createThoughts, getThoughts, getSingleUser } from '../../controllers/userController.js';

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtId').get(getThoughtbyId).put(updateThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export default router;
