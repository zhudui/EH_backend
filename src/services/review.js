import reviewModel from '../models/review'
import homeworkModel from '../models/homework'

export default {
  async getReviewList(homework) {
    try {
      return await reviewModel.findAll({
        where: {
          homeworkId: homework.homeworkId
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async addReview(review) {
    console.log('review', review);
    try {
      const foundReview = await reviewModel.findOne({
        where: {
          homeworkId: review.homeworkId,
          revieweeId: review.revieweeId
        }
      });
      if (foundReview) {
        await reviewModel.update(review, {
          where: {
            homeworkId: review.homeworkId,
            revieweeId: review.revieweeId
          }
        });
      } else {
        await reviewModel.create(review);
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  async getReview(data) {
    try {
      console.log('data', data);
      const foundReview = await reviewModel.findOne({
        attributes: ['reviewerRole', 'comment', 'score'],
        where: {
          homeworkId: data.homeworkId,
          revieweeId: data.revieweeId
        }
      });
      console.log('foundReview', foundReview);
      if (foundReview) {
        return {
          code: 0,
          review: foundReview
        }
      } else {
        return {
          code: 1,
          msg: '暂无评分'
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  async getCourseReviewData(courseId) {
    try {
      const homeworkList = await homeworkModel.findAll({
        attributes: ['id', 'name'],
        where: {
          courseId: courseId
        }
      });
      console.log('homeworkList', homeworkList);
      return await reviewModel.findAll({
        attributes: ['homeworkId', 'revieweeId', 'score'],
        where: {
          homeworkId: {
            $in: homeworkList.map(homework => homework.id)
          }
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
