import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Desabilitar essas duas
router.get('/', userController.index);
router.get('/:id', userController.show);

router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);
export default router;

/*
index -> lista todos os usuarios
store/create -> cria usuario
delete -> apaga usuario
show -> mostra
update -> atualiza
*/
