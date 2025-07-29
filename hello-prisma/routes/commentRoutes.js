import {Router} from 'express';
import {addComment,getComments,} from "../controller/commentController.js"
import auth from '../middleware/auth.js';

const router = Router();

router.post('/addcomment/:id',auth, addComment);
router.get('/getcomment/:id',auth, getComments);
// router.put('/edittask/:id',auth, editTask);

export default router;