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
      const data = await homeworkService.getHomeworkList(courseId);
      console.log('data', data)
      ctx.body = {
        code: 0,
        homeworkList: data.homeworkList,
        uploadDataList: data.uploadDataList
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
  },

  async getHomeworkName(ctx) {
    try {
      const { homeworkId } = ctx.query;
      console.log('courseId', homeworkId);
      const homeworkData = await homeworkService.getHomeworkName(homeworkId);
      ctx.body = {
        code: 0,
        homeworkData: homeworkData
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  }
}
