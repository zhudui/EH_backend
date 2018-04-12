import homeworkService from '../services/homework'

export default {
  async addHomework(ctx) {
    try {
      const { body } = ctx.request;
      const homework = await homeworkService.addHomework(body);
      ctx.body = {
        code: 0,
        homework: homework
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async getHomeworkList(ctx) {
    try {
      const { courseId } = ctx.query;
      const homeworkList = await homeworkService.getHomeworkList(courseId);
      ctx.body = {
        code: 0,
        homeworkList: homeworkList
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async getHomeworkNameList(ctx) {
    try {
      const { courseId } = ctx.query;
      const homeworkNameList = await homeworkService.getHomeworkNameList(courseId);
      ctx.body = {
        code: 0,
        homeworkNameList: homeworkNameList
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  }
}
