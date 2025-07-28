import {Router} from 'express';
import {addTask} from '../controller/taskController.js'
import auth from '../middleware/auth.js'

const routes = Router();

routes.post('/addTask',auth, addTask);

export default routes;