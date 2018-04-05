import KoaRouter from 'koa-router'
import classController from '../controllers/class'

const router = new KoaRouter();

router.prefix('/api');

router.post('/addClass', classController.addClass)
  .get('/classList', classController.getClassList)

export default router