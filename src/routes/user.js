import KoaRouter from 'koa-router'
import userController from '../controllers/user'

const router = new KoaRouter();

router.prefix('/api/user');

router.post('/login', userController.login)
  .post('/userInfo', userController.getUserInfo)
  .post('/logout', userController.logOut)

export default router
