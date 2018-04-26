import KoaRouter from 'koa-router'
import homeworkController from '../controllers/homework'

const router = new KoaRouter();

router.prefix('/api');

router.post('/addHomework', homeworkController.addHomework)
  .get('/homeworkList', homeworkController.getHomeworkList)
  .get('/homeworkNameList', homeworkController.getHomeworkNameList)
  .get('/homeworkName', homeworkController.getHomeworkName)

export default router
