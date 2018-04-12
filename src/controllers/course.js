import courseService from '../services/course'

export default {
  async addCourse(ctx) {
    try {
      const { body } = ctx.request;
      const userId = ctx.state.jwtData.data.id;
      const data = await courseService.addCourse(body, userId);
      ctx.body = {
        code: 0,
        courseData: data
      };
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async getCourseList(ctx) {
    try {
      const userId = ctx.state.jwtData.data.id;
      const courseList = await courseService.getCourseList(userId);
      ctx.body = {
        code: 0,
        courseList: courseList
      };
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  },

  async getCourseName(ctx) {
    try {
      const { courseId } = ctx.query;
      const courseData = await courseService.getCourseName(courseId);
      ctx.body = {
        code: 0,
        courseData: courseData
      }
    } catch (err) {
      ctx.status = 500;
      ctx.throw(new Error(err));
    }
  }
}
