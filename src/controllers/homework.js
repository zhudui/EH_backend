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
  }
}
