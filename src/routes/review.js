import KoaRouter from 'koa-router'
import reviewController from '../controllers/review'

const router = new KoaRouter();

router.prefix('/api');

router.post('/getReviewList', reviewController.getReviewList)
  .post('/addReview', reviewController.addReview)
  .post('/getReview', reviewController.getReview)
  .get('/courseReviewData', reviewController.getCourseReviewData)

export default router
