import {Router} from 'express'
import {createUser,login,getUsers} from '../controller/userController.js'
import auth from '../middleware/auth.js'

const router = Router();

router.post("/createuser",createUser);
router.post("/login",login);
router.get("/getusers",auth,getUsers);

export default router;