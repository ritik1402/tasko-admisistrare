import {Router} from 'express';
import {addTask,viewTask,addtaskType,editTask,taskType} from '../controller/taskController.js'
import auth from '../middleware/auth.js'

const routes = Router();

routes.post('/addTask',auth, addTask);
routes.get('/viewTask',auth, viewTask);
routes.post('/addtaskType',auth, addtaskType);
routes.put('/editTask/:id',auth, editTask);
routes.get('/taskType',auth, taskType);

export default routes;