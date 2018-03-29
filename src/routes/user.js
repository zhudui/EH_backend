import KoaRouter from 'koa-router'
import userController from '../controllers/user'

const router = new KoaRouter();

router.prefix('/api/user');

router.post('/login', userController.login);

export default router
