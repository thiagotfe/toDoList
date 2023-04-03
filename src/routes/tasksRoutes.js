import { Router } from 'express';
import tasksController from '../controllers/TasksController';

const router = new Router();

router.get('/', tasksController.index);
router.post('/', tasksController.store);
// router.put('/:id', tasksController.update);
// router.get('/:id', tasksController.show);
// router.delete('/:id', tasksController.delete);
export default router;
