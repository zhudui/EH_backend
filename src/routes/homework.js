import KoaRouter from 'koa-router'
import homeworkController from '../controllers/homework'

const router = new KoaRouter();

router.prefix('/api');

router.post('/addHomework', homeworkController.addHomework)

export default router
