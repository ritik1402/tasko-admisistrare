import {Router} from 'express';
import {addTask,viewTask} from '../controller/taskController.js'
import auth from '../middleware/auth.js'

const routes = Router();

routes.post('/addTask',auth, addTask);
routes.get('/viewTask',auth, viewTask);

export default routes;