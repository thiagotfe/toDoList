import { Router } from 'express';
import toDoListController from '../controllers/ToDoListController';

const router = new Router();

router.get('/', toDoListController.index);
router.post('/', toDoListController.store);
router.put('/:id', toDoListController.update);
router.get('/:id', toDoListController.show);
router.delete('/:id', toDoListController.delete);
export default router;
