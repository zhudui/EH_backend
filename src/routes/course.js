import KoaRouter from 'koa-router'
import courseController from '../controllers/course'

const router = new KoaRouter();

router.prefix('/api');

router.post('/addCourse', courseController.addCourse)
  .get('/courseList', courseController.getCourseList)
  .get('/courseName', courseController.getCourseName)

export default router
