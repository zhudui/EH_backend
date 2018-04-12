import reviewService from '../services/review'

export default {
  async getReviewList(ctx) {
    try {
      const { body } = ctx.request;
      const reviewList = await reviewService.getReviewList(body);
      ctx.body = {
        code: 0,
        reviewList: reviewList
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async addReview(ctx) {
    try {
      const { body } = ctx.request;
      await reviewService.addReview(body);
      ctx.body = {
        code: 0
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async getReview(ctx) {
    try {
      const { body } = ctx.request;
      const data = await reviewService.getReview(body);
      ctx.body = data;
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async getCourseReviewData(ctx) {
    try {
      const { courseId } = ctx.query;
      const reviewData = await reviewService.getCourseReviewData(courseId);
      ctx.body = {
        code: 0,
        reviewData: reviewData
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  }
}
