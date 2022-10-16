import express from 'express';

import { getposts, getpost, createpost, updatepost, likepost, deletepost } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getposts);
router.post('/',auth,  createpost);
router.patch('/:id', auth, updatepost);
router.delete('/:id', auth, deletepost);
router.patch('/:id/likepost', auth, likepost);

export default router;