import {Router} from 'express'
import {createUser,login} from '../controller/userController.js'

const router = Router();

router.post("/createuser",createUser);
router.post("/login",login);

export default router;